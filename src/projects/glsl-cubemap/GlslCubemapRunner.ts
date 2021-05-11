import Rand from "../../utils/rand";
import { Complex, Range, Range2d } from "../common";
import Camera from "../common/3d/Camera";
import * as GLSL from "../common/3d/GlslHelpers";
import Point3 from "../common/3d/Point3";
import Quaternion from "../common/3d/Quaternion";
import Vector from "../common/3d/Vector";
import { ResizeCanvas } from "../common/CanvasHelpers";
import { FRAGMENT_SHADER, VERTEX_SHADER } from "./ShaderCode";

(window as any).Q = Quaternion;

const tris = [
    -.8, -.8, 1,
    .8, -.8, 1,
    -.8, .8, 1,
    
    -.7, .7, 0,
    -.7, -.7, 0,
    .7, .7, 1,
]

const unit_cube_tristrip = [
    -1, 1, 1,     // Front-top-left
    1, 1, 1,      // Front-top-right
    -1, -1, 1,    // Front-bottom-left
    1, -1, 1,     // Front-bottom-right
    1, -1, -1,    // Back-bottom-right
    1, 1, 1,      // Front-top-right
    1, 1, -1,     // Back-top-right
    -1, 1, 1,     // Front-top-left
    -1, 1, -1,    // Back-top-left
    -1, -1, 1,    // Front-bottom-left
    -1, -1, -1,   // Back-bottom-left
    1, -1, -1,    // Back-bottom-right
    -1, 1, -1,    // Back-top-left
    1, 1, -1      // Back-top-right
];

const unit_cube_tristrip_2 = [
    -1, 1, -1,     // Front-top-left
    1, 1, -1,      // Front-top-right
    -1, -1, -1,    // Front-bottom-left
    1, -1, -1,     // Front-bottom-right
    1, -1, 1,    // Back-bottom-right
    1, 1, -1,      // Front-top-right
    1, 1, 1,     // Back-top-right
    -1, 1, -1,     // Front-top-left
    -1, 1, 1,    // Back-top-left
    -1, -1, -1,    // Front-bottom-left
    -1, -1, 1,   // Back-bottom-left
    1, -1, 1,    // Back-bottom-right
    -1, 1, 1,    // Back-top-left
    1, 1, 1      // Back-top-right
];

const unit_cube_out_tristrip = [
    -1, -1, -1,
    -1, 1, -1,
    1, -1, -1,
    1, 1, -1,
    1, 1, 1,
    -1, 1, -1,
    -1, 1, 1,
    -1, -1, 1,
    1, 1, 1,
    1, -1, 1,
    1, -1, -1,
    -1, -1, 1,
    -1, -1, -1,
    -1, 1, -1,
];

export default class GlslCubemapRunner {

    ctx: WebGLRenderingContext;
    program: WebGLProgram;
    posBuffer: WebGLBuffer;
    bufferCount: number;
    camera: Camera;

    renderPoints: { pt: Point3, sc: number } [];


    constructor(private canvas: HTMLCanvasElement) {
        ResizeCanvas(canvas, 1024, 800);
        this.ctx = canvas.getContext('webgl2');
        this.program = GLSL.initShaderProgram(this.ctx, VERTEX_SHADER, FRAGMENT_SHADER);
        this.ctx.enable(this.ctx.CULL_FACE);

        const pbuffer = unit_cube_tristrip;

        this.posBuffer = GLSL.initGLBuffer(this.ctx, pbuffer);
        this.bufferCount = pbuffer.length;

        this.camera = new Camera(new Point3(0, 0, -3));

        this.renderPoints = [];
        for(let i = 0; i < 1000; i++)
        {
            this.renderPoints.push(
                {
                    pt: new Point3(Rand.Float(-2, 2), Rand.Float(-2, 2), Rand.Float(-4, 4)),
                    sc: Rand.Float(0.01, 0.3)
                });
        }

        this.tickloop(0);
    }

    tickloop(tickNumber: number) {
        this.tick(tickNumber);
        const percent = (tickNumber / (60 * 15)) % 1;
        this.camera.position.x = 2 * Math.sin(percent * Math.PI * 2);
        this.camera.position.z = -2 * Math.cos(percent * Math.PI * 2);
        this.camera.facing = Quaternion.axisRotation(new Vector(0, 1, 0), percent * Math.PI * 2);
        requestAnimationFrame(()=>this.tickloop(tickNumber+1));
    }

    tick(tickNumber: number) {


        let cameraRowMajor = this.camera.getViewMatrix().rowMajor();
        const maxTickNumber = 60*5;

        GLSL.shaderDrawMultiple(this.ctx, this.program, this.posBuffer, 3, 'tristrip', this.renderPoints.length, (i) => ({ bufferOffset: 0, bufferCount: this.bufferCount / 3}), (gl, i) => {
            let pt = this.renderPoints[i];
            const realScale = Math.pow(Math.abs(Math.sin(Math.PI * 2 * (((tickNumber + i)/maxTickNumber) % 1))), 3);
            gl.uniformMatrix4fv(gl.getUniformLocation(this.program, 'move'), false, [
                pt.sc*realScale, 0, 0, 0,
                0, pt.sc*realScale, 0, 0,
                0, 0, pt.sc*realScale, 0,
                -pt.pt.x, - pt.pt.y, -pt.pt.z, 1
            ]);
            gl.uniformMatrix4fv(gl.getUniformLocation(this.program, 'project'), false, cameraRowMajor);
        });
    }

    cleanup() {
    }
}