import { ResizeCanvas } from '../common/CanvasHelpers';
import { mat4 } from 'gl-matrix';
import DistanceEstimateBuilder from './debuilder/DistanceEstimateBuilder';
import { BoundingBoxDE, SphereDE, BoxDE, MengerSpongeDE } from './debuilder/DistanceEstimatePrimitives';
import KeyboardManager from '../common/input/KeyboardManager';
import Quaternion from '../common/3d/Quaternion';
import Vector from '../common/3d/Vector';

// TODO: Use asset loader to load these?

const distanceFunc: DistanceEstimateBuilder =
    new DistanceEstimateBuilder(new MengerSpongeDE(3, new Vector(1.01, 1, 1), 100, 10))
        .symAxis(1, 0.2, 0)
        .symAxis(-1, .2, 0)
        .rXt(0.1)
        .rYt(0.01);

const dglsl = distanceFunc.emitGlsl();

console.log('DISTF: ');
console.log(dglsl);

const vertexShaderSource = `
attribute vec4 aVertexPosition;
void main() {
  gl_Position = aVertexPosition;
}
`;

const fragmentShaderSource = `
precision mediump float;
#define PI 3.1415926538

uniform vec2 WindowSize;
uniform vec3 cam_pos;
uniform vec4 cam_orient;
uniform float t;

const int MaximumRaySteps = 50;
const float MinimumDistance = 0.001;
const float MaxFogDist = 100.0;

const float nscale = 0.001;
const vec3 xdir = vec3(1.0, 0.0, 0.0);
const vec3 ydir = vec3(0.0, 1.0, 0.0);
const vec3 zdir = vec3(0.0, 0.0, 1.0);
const vec3 lightdir = normalize(vec3(1.0, 0.0, -1.0));

const float scale = 3.0;
const vec3 C = vec3(1, 1, 1);
const int MI = 100;
const float bailout = 10.0;

vec4 qInverse(vec4 q) {
    float denom = dot(q, q);
    return q / denom;
}

vec4 qMult(vec4 a, vec4 b) {
    vec4 res = vec4(0.0, 0.0, 0.0, 0.0);
    res.x = a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y;
    res.y = a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x;
    res.z = a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w;
    res.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;
    return res;
}

vec4 qTransform(vec4 f, vec4 pt) {
    return qMult(f, qMult(pt, qInverse(f)));
}

// float dist(vec3 p) {
//     float r = dot(p, p);
//     int numi = 0;
//     for(int i = 0; i < MI; i++){
//         numi = i;
//         if(r >= bailout) break;

//         // Rotate 1
        
//         p = abs(p);
//         if(p.x - p.y < 0.0){ float x1=p.y; p.y=p.x; p.x=x1;}
//         if(p.x - p.z < 0.0){ float x1=p.z; p.z=p.x; p.x=x1;}
//         if(p.y - p.z < 0.0){ float y1=p.z; p.z=p.y; p.y=y1;}
 
//         // Rotate 2

//         p.xy = scale * p.xy - C.xy * (scale-1.0);
//         p.z=scale*p.z;
//         if(p.z>0.5*C.z*(scale-1.0)) p.z-=C.z*(scale-1.0);
       
//         r = dot(p, p);
//     }
//     return (length(p)-2.0)*pow(scale,-float(numi));
// }
${dglsl}

vec3 trace(vec3 from, vec3 direction) {
	float totalDistance = 0.0;
    int nsteps;
    bool hit = false;
	for (int steps = 0; steps < MaximumRaySteps; steps++) {
        nsteps = steps;
		vec3 p = from + totalDistance * direction;
		float distance = dist(p);
		totalDistance += distance;
        if (distance < MinimumDistance) 
        {
            hit = true;
            break;
        }
    }
	return vec3(totalDistance, 1.0-float(nsteps)/float(MaximumRaySteps), hit ? 1.0 : 0.0);
}

float derel(float f) {
    return f + 1.0 / 2.0;
}

void main() {

    float losx = (gl_FragCoord.x / WindowSize.x) * 2.0 - 1.0;
    float losy = (gl_FragCoord.y / WindowSize.y) * 2.0 - 1.0;
    vec3 losFwd = normalize(vec3(losx, losy, 1));
    vec3 dir = qTransform(cam_orient, vec4(losFwd.x, losFwd.y, losFwd.z, 0)).xyz;

    vec3 colis = trace(cam_pos, dir);

    if(colis.z == 0.0)
    {
        gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
    }
    else
    {
        vec3 pos = cam_pos + colis.x * dir;
        vec3 n = normalize(vec3(
            dist(pos+xdir*nscale)-dist(pos-xdir*nscale),
            dist(pos+ydir*nscale)-dist(pos-ydir*nscale),
            dist(pos+zdir*nscale)-dist(pos-zdir*nscale)
        ));
                        
        float fog = 1.0 - min(1.0, colis.x / MaxFogDist);
        float cplx = colis.y;

        float brightness = max(dot(n, lightdir), 0.1) * fog * cplx;
        gl_FragColor = vec4(brightness, brightness, brightness, 1.0);
    }
}
`;

const camMove = 0.1;
const cam = {x: 0, y: 0, z: -2};
let keys: KeyboardManager;
let repaintCount = 0;
let camRotation: Quaternion = new Quaternion(1, 0, 0, 0);

const moveKeys: [string, {x: number, y: number, z: number}][] = [
    ['w', {x: 0, y: 0, z: 1}],
    ['a', {x: -1, y: 0, z: 0}],
    ['s', {x: 0, y: 0, z: -1}],
    ['d', {x: 1, y: 0, z: 0}],
    ['q', {x: 0, y: 1, z: 0}],
    ['z', {x: 0, y: -1, z: 0}],
];

const camTurnRate = Math.PI / 60;
const lookKeys: [string, Vector][] = [
    ['ArrowUp', new Vector(1, 0, 0)],
    ['ArrowDown', new Vector(-1, 0, 0)],
    ['ArrowLeft', new Vector(0, 1, 0)],
    ['ArrowRight', new Vector(0, -1, 0)],
];

export default function main() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ResizeCanvas(canvas, 800, 600);
    const gl = canvas.getContext('webgl');

    // Only continue if WebGL is available and working
    if (gl === null) {
        alert('Unable to initialize WebGL. Your browser may not support it.');
        return;
    }

    // Clear black
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    const shaderProgram = initShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    // Here's where we call the routine that builds all the
    // objects we'll be drawing.
    const buffers = initBuffers(gl);

    // Draw the scene
    drawScene(gl, shaderProgram, buffers, canvas);

    keys = new KeyboardManager(document.body, false);
    renderLoop(gl, shaderProgram, buffers, canvas);
}

function renderLoop(gl: WebGLRenderingContext, program: WebGLProgram, buffers: { position: WebGLBuffer }, canvas: HTMLCanvasElement) {
    keys.update();
    let doRepaint = false;

    for (const [key, dir] of moveKeys) {
        if (keys.isKeyDown(key)) {
            cam.x += dir.x * camMove;
            cam.y += dir.y * camMove;
            cam.z += dir.z * camMove;
            doRepaint = true;
        }
    }

    for (const [key, axis] of lookKeys) {
        if (keys.isKeyDown(key)) {
            camRotation = Quaternion.multiply(Quaternion.axisRotation(axis, camTurnRate), camRotation);
        }
    }

    drawScene(gl, program, buffers, canvas);
    requestAnimationFrame(() => renderLoop(gl, program, buffers, canvas));
}


function drawScene(gl: WebGLRenderingContext, program: WebGLProgram, buffers: { position: WebGLBuffer }, canvas: HTMLCanvasElement) {
    gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
    gl.clearDepth(1.0);                 // Clear everything
    gl.enable(gl.DEPTH_TEST);           // Enable depth testing
    gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

    // Clear the canvas before we start drawing on it.

    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    // Tell WebGL how to pull out the positions from the position
    // buffer into the vertexPosition attribute.
    {
      const numComponents = 2;  // pull out 2 values per iteration
      const type = gl.FLOAT;    // the data in the buffer is 32bit floats
      const normalize = false;  // don't normalize
      const stride = 0;         // how many bytes to get from one set of values to the next
                                // 0 = use type and numComponents above
      const offset = 0;         // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
      gl.vertexAttribPointer(
            gl.getAttribLocation(program, 'aVertexPosition'),
            numComponents,
            type,
            normalize,
            stride,
            offset);
      gl.enableVertexAttribArray(
        gl.getAttribLocation(program, 'aVertexPosition'));
    }

    // Tell WebGL to use our program when drawing

    gl.useProgram(program);
    gl.uniform2fv(gl.getUniformLocation(program, 'WindowSize'), [canvas.width, canvas.height]);
    gl.uniform3fv(gl.getUniformLocation(program, 'cam_pos'), [cam.x, cam.y, cam.z]);
    gl.uniform4fv(gl.getUniformLocation(program, 'cam_orient'), [camRotation.i, camRotation.j, camRotation.k, camRotation.real]);
    gl.uniform1f(gl.getUniformLocation(program, 't'), repaintCount);
    repaintCount = (repaintCount + 1);
    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }

function initBuffers(gl: WebGLRenderingContext) {
    // Create a buffer for the square's positions.
    const positionBuffer = gl.createBuffer();

    // Select the positionBuffer as the one to apply buffer
    // operations to from here out.
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

    // Now create an array of positions for the square.
    const positions = [
        -1.0,  1.0,
        1.0,  1.0,
       -1.0, -1.0,
        1.0, -1.0,
    ];

    // Now pass the list of positions into WebGL to build the
    // shape. We do this by creating a Float32Array from the
    // JavaScript array, then use it to fill the current buffer.
    gl.bufferData(gl.ARRAY_BUFFER,
                  new Float32Array(positions),
                  gl.STATIC_DRAW);

    return {
      position: positionBuffer,
    };
  }

function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

    // Create the shader program

    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    // If creating the shader program failed, alert

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
      alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
      return undefined;
    }

    return shaderProgram;
  }

  //
  // creates a shader of the given type, uploads the source and
  // compiles it.
  //
function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);

    // Send the source to the shader object

    gl.shaderSource(shader, source);

    // Compile the shader program

    gl.compileShader(shader);

    // See if it compiled successfully

    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return undefined;
    }

    return shader;
}
