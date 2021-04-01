export function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
    const shader = gl.createShader(type);
    // Send the source to the shader object
    gl.shaderSource(shader, source);
    // Compile the shader program
    gl.compileShader(shader);
    // See if it compiled successfully
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      alert(`An error occurred compiling the ${(type === gl.VERTEX_SHADER ? 'vertex' : type === gl.FRAGMENT_SHADER ? 'fragment' : '')} shaders: ` + gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return undefined;
    }

    return shader;
}


export function initShaderProgram(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string) {
    const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

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

export function fragmentShaderOnlyDraw(gl: WebGLRenderingContext, shader: WebGLProgram, positionBuffer: WebGLBuffer, bindUniforms: (gl: WebGLRenderingContext) => void) {
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
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.vertexAttribPointer(
            gl.getAttribLocation(shader, 'aVertexPosition'),
            numComponents,
            type,
            normalize,
            stride,
            offset);
      gl.enableVertexAttribArray(
        gl.getAttribLocation(shader, 'aVertexPosition'));
    }

    // Tell WebGL to use our program when drawing

    gl.useProgram(shader);
    bindUniforms(gl);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
}

export function fragmentShaderOnlyInitBuffer(gl: WebGLRenderingContext, left?: number, top?: number, right?: number, bottom?: number) {
     // Create a buffer for the square's positions.
     const positionBuffer = gl.createBuffer();

     // Select the positionBuffer as the one to apply buffer
     // operations to from here out.
     gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

     const l = left ?? -1.0;
     const r = right ?? 1.0;
     const t = top ?? -1.0;
     const b = bottom ?? 1.0;
 
     // Now create an array of positions for the square.
     const positions = [
         b, r,
         t, r,
         b, l,
         t, l,
     ];
 
     // Now pass the list of positions into WebGL to build the
     // shape. We do this by creating a Float32Array from the
     // JavaScript array, then use it to fill the current buffer.
     gl.bufferData(gl.ARRAY_BUFFER,
                   new Float32Array(positions),
                   gl.STATIC_DRAW);
 
     return positionBuffer;
}

export const defaultVertexShader = `attribute vec4 aVertexPosition;
varying vec3 vPos;
void main() {
  vPos = vec3(aVertexPosition.xy, 0.0);
  gl_Position = aVertexPosition;
}`;