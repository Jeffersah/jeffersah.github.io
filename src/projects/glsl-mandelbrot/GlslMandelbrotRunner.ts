import { Complex, Range, Range2d } from "../common";
import * as GLSL from "../common/3d/GlslHelpers";
import { ResizeCanvas } from "../common/CanvasHelpers";
import Point from "../common/position/Point";
import GlslFrameRenderer from "./GlslFrameRenderer";
import GlslJuliaFrameRenderer from "./GlslJuliaFrameRenderer";
import { JULIA_SHADER, MANDELBROT_SHADER } from "./ShaderCode";

const SCROLL_DIV = 3;
const SCROLL_POW = 1.1;

export default class GlslMandelbrotWrapperComponent {
    private mandelbrot: GlslFrameRenderer;
    private julia: GlslJuliaFrameRenderer;

    constructor(private canvas: HTMLCanvasElement, private juliaCanvas: HTMLCanvasElement) {
        this.mandelbrot = new GlslFrameRenderer(canvas, MANDELBROT_SHADER, (jpt) => {
            this.julia.setJuliaPoint(new Complex(jpt.x, jpt.y));
        });
        this.julia = new GlslJuliaFrameRenderer(juliaCanvas, JULIA_SHADER);

        this.mandelbrot.run();
        this.julia.run();
    }

    cleanup() {
        this.mandelbrot.cleanup();
        this.julia.cleanup();
    }
}