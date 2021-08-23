import * as GLSL from "../common/3d/GlslHelpers";
import { IColorFunction } from "../glsl-fracaudio/ColorFunctions/IColorFunction";
import { IFractal } from "./Fractals/IFractal";
import SamplerWorker from './workers/Sampler.worker.ts';
import { ISamplerRequest, ISamplerResponse } from "./workers/SamplerReq";

export default class SampleRenderer {
    gl: WebGL2RenderingContext;
    program: WebGLProgram;
    buffer: WebGLBuffer;

    operationInProgress: Worker | undefined;
    bufferDataLength: number;

    renderLoopHandle: number;

    uniforms: {
        [key: string]: WebGLUniformLocation;
    };

    constructor(public canvas: HTMLCanvasElement) {
        this.gl = canvas.getContext("webgl2", { premultipliedAlpha: false });
        this.bufferDataLength = 0;
    }

    init(fractal: IFractal) {
        const gl = this.gl;

        this.program = GLSL.initShaderProgram(gl, VERT_SHADER, FRAG_SHADER);
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        const pos = gl.getAttribLocation(this.program, "a_position");
        gl.vertexAttribPointer(pos, 4, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(pos);
        gl.useProgram(this.program);

        this.uniforms = {
            u_transform_1: gl.getUniformLocation(this.program, "u_transform_1"),
            u_transform_2: gl.getUniformLocation(this.program, "u_transform_2"),
            u_time: gl.getUniformLocation(this.program, "u_time"),
        };

        if(this.operationInProgress !== undefined) this.operationInProgress.terminate();
        this.operationInProgress = new SamplerWorker();
        this.operationInProgress.addEventListener('message', e => {
            const res = e.data as ISamplerResponse;
            gl.bufferData(gl.ARRAY_BUFFER, res.data, gl.STATIC_DRAW);
            this.bufferDataLength = res.data.length / 4;
            if(res.resolution === 50)
                this.renderLoop();
            if(res.resolution < 250)
                this.bufferAtResolution(this.operationInProgress, fractal, res.resolution + 50);
        });

        this.bufferAtResolution(this.operationInProgress, fractal, 50);
    }

    bufferAtResolution(worker: SamplerWorker, fractal: IFractal, resolution: number){
        let req: ISamplerRequest = {
            from: [-1, -1, -1],
            to: [1, 1, 1],
            resolution,
            fractalName: fractal.Name,
            sampleFloor: 0.15,
        };
        worker.postMessage(req);
    }


    destroy(){
        const gl = this.gl;
        gl.deleteProgram(this.program);
        gl.deleteBuffer(this.buffer);
        if(this.operationInProgress !== undefined) this.operationInProgress.terminate();
        if(this.renderLoopHandle !== undefined) cancelAnimationFrame(this.renderLoopHandle);
    }


    renderLoop( time?: number){
        time = time ?? 0;
        this.render(time);
        this.renderLoopHandle = requestAnimationFrame(()=>this.renderLoop(time + 1));
    }

    render(t: number) {
        if(this.bufferDataLength) {
            const gl = this.gl;
            let canvasSize = [this.canvas.clientWidth, this.canvas.clientHeight];
            gl.viewport(0, 0, canvasSize[0], canvasSize[1]);
            this.canvas.width = canvasSize[0];
            this.canvas.height = canvasSize[1];

            gl.uniform1f(this.uniforms.u_time, t / 60);
            const c = Math.cos(Math.PI * t / 360);
            const s = Math.sin(Math.PI * t / 360);
            const c2 = Math.cos(Math.PI * t / 3600);
            const s2 = Math.sin(Math.PI * t / 3600);
            gl.uniformMatrix4fv(this.uniforms.u_transform_1, false, [
                c, 0, s, 0,
                0, 1, 0, 0,
                -s, 0, c, 0,
                0, 0, 0, 1,
            ]);
            gl.uniformMatrix4fv(this.uniforms.u_transform_2, false, [
                1, 0, 0, 0,
                0, c2, -s2, 0,
                0, s2, c2, 0,
                0, 0, 0, 1,
            ]);

            gl.clearColor(0.0, 0.0, 0.0, 1.0);
            gl.clearDepth(1.0);
            gl.disable(gl.DEPTH_TEST);
            // gl.depthFunc(gl.LEQUAL);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            gl.drawArrays(gl.POINTS, 0, this.bufferDataLength);
        }
    }
}

const FRAG_SHADER = `#version 300 es

precision highp float;

out vec4 outColor;

in float v_sample;

void main() {
    outColor = vec4(v_sample, v_sample, v_sample, 1.0);
}
`;

const VERT_SHADER = `#version 300 es

uniform mat4 u_transform_1;
uniform mat4 u_transform_2;
uniform float u_time;

in vec4 a_position;
out float v_sample;

void main() {
    v_sample = a_position.w;
    vec4 pos = a_position * u_transform_1 * u_transform_2;
    gl_Position = vec4(pos.xyz, 1.0);
    gl_PointSize = (v_sample*v_sample) * 2.0;
}
`;