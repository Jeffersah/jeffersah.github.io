import * as GLSL from "../common/3d/GlslHelpers";
import { IColorFunction } from "../glsl-fracaudio/ColorFunctions/IColorFunction";
import { IFractal } from "./Fractals/IFractal";

export default class SliceRenderer {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    buffer: WebGLBuffer;
    
    sliceWindow: {x: number, y: number, z: number, w: number};

    uniforms: {
        u_window_pos: WebGLUniformLocation;
        u_window_size: WebGLUniformLocation;

        u_x_axis: WebGLUniformLocation;
        u_y_axis: WebGLUniformLocation;
        u_z_slice: WebGLUniformLocation;
    };

    constructor(public canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("webgl2");
        this.sliceWindow = { x: -1, y: -1, z: 0, w: 2 };
    }

    init(fractal: IFractal, color: IColorFunction) {
        const gl = this.gl;
        const fragmentCode = FRAG_SHADER
            .replace("[[[FRACTAL_CODE]]]", fractal.ShaderCode)
            .replace("[[[COLOR_CODE]]]", color.shaderFunction)
            .replace("[[[MAX_DIST]]]", fractal.MaxAmplitude.toFixed(2));

        this.program = GLSL.initShaderProgram(gl, GLSL.defaultWebGl2VertexShader, fragmentCode);
        this.buffer = GLSL.fragmentShaderOnlyInitBuffer(gl);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        const pos = gl.getAttribLocation(this.program, "aVertexPosition");
        gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pos);
        gl.useProgram(this.program);

        this.uniforms = {
            u_window_pos: gl.getUniformLocation(this.program, "u_window_pos"),
            u_window_size: gl.getUniformLocation(this.program, "u_window_size"),
            u_x_axis: gl.getUniformLocation(this.program, "u_x_axis"),
            u_y_axis: gl.getUniformLocation(this.program, "u_y_axis"),
            u_z_slice: gl.getUniformLocation(this.program, "u_z_slice"),
        };
    }

    scroll(dx: number, dy: number, dz: number) {
        this.sliceWindow.x += dx * this.sliceWindow.w;
        this.sliceWindow.y += dy * this.sliceWindow.w * this.canvas.clientHeight / this.canvas.clientWidth;
        this.sliceWindow.z += dz * this.sliceWindow.w * this.canvas.clientHeight / this.canvas.clientWidth;
    }
    
    zoom(percent: number, anchorX: number, anchorY: number) {
        let newWidth = this.sliceWindow.w * (percent);
        let newHeight = this.sliceWindow.w * (this.canvas.clientHeight / this.canvas.clientWidth) * (percent);
        let dx = (this.sliceWindow.w - newWidth);
        let dy = ((this.sliceWindow.w * this.canvas.clientHeight / this.canvas.clientWidth) - newHeight);
        this.sliceWindow = {x: this.sliceWindow.x + dx * anchorX, y: this.sliceWindow.y + dy * anchorY, z: this.sliceWindow.z, w: newWidth};
    }

    destroy(){
        const gl = this.gl;
        gl.deleteProgram(this.program);
        gl.deleteBuffer(this.buffer);
    }

    render() {
        let canvasSize = [this.canvas.clientWidth, this.canvas.clientHeight];
        this.gl.viewport(0, 0, canvasSize[0], canvasSize[1]);
        this.canvas.width = canvasSize[0];
        this.canvas.height = canvasSize[1];

        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.gl.uniform2f(this.uniforms.u_window_pos, this.sliceWindow.x, this.sliceWindow.y);
        this.gl.uniform2f(this.uniforms.u_window_size, this.sliceWindow.w, this.sliceWindow.w * canvasSize[1] / canvasSize[0]);

        this.gl.uniform3f(this.uniforms.u_x_axis, 1, 0, 0);
        this.gl.uniform3f(this.uniforms.u_y_axis, 0, 1, 0);
        this.gl.uniform3f(this.uniforms.u_z_slice, 0, 0, this.sliceWindow.z);

        this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, 4);
    }
}

const FRAG_SHADER = `#version 300 es

precision highp float;
uniform vec2 u_window_pos;
uniform vec2 u_window_size;

uniform vec3 u_x_axis;
uniform vec3 u_y_axis;
uniform vec3 u_z_slice;

out vec4 outColor;

const float MAX_ABSSQ = [[[MAX_DIST]]];

in vec3 vPos;

const int MAX_ITER = 256;

vec4 c_mult(vec4 a, vec4 b) {
    return vec4(
        a.x*b.x - a.y*b.y - a.z*b.z - a.w*b.w,
        a.x*b.y + a.y*b.x - a.z*b.w + a.w*b.z,
        a.x*b.z + a.y*b.w + a.z*b.x - a.w*b.y,
        a.x*b.w - a.y*b.z + a.z*b.y + a.w*b.x
    );
}
vec4 c_conj(vec4 a) {
    return vec4(a.x, -a.y, -a.z, -a.w);
}

float cplx_abssq(vec4 v) {
    return dot(v, v);
}

vec4 step_fractal(vec4 z, vec4 c) {
[[[FRACTAL_CODE]]]
}

float calcIterations(vec4 coords) {
    vec4 roll = vec4(0,0,0,0);
    for(int iter = 0; iter < MAX_ITER; iter++) {
        roll = step_fractal(roll, coords);
        if (cplx_abssq(roll) >= MAX_ABSSQ) {
            return float(iter)/float(MAX_ITER);
        }
    }
    return 1.0;
}

[[[COLOR_CODE]]]

void main() {
    vec2 adjPos = vPos.xy;
    adjPos += 1.0;
    adjPos /= 2.0;
    // adjpos is now 0, 1
    // Convert that to world-space
    adjPos = u_window_pos + adjPos * u_window_size;

    vec3 c3 = adjPos.x * u_x_axis + adjPos.y * u_y_axis + u_z_slice;

    vec4 c = vec4(
        c3.x,
        -c3.y,
        c3.z,
        0.0
    );

    float mb_perc = calcIterations(c);
    outColor = vec4(floatToColor(mb_perc), 1.0);
}
`;