import { Complex, Range, Range2d } from "../common";
import * as GLSL from "../common/3d/GlslHelpers";
import { ResizeCanvas } from "../common/CanvasHelpers";
import Point from "../common/position/Point";
import { IColorFunction } from "./ColorFunctions/IColorFunction";
import FractalAudioPlayer from "./FractalAudioPlayer";
import { IFractal } from "./Fractals/IFractal";
import GlslFrameRenderer from "./GlslFrameRenderer";
import { CreateShaderCode } from "./ShaderCode";

export default class RendererWrapperComponent {
    private mandelbrot: GlslFrameRenderer;

    constructor(private canvas: HTMLCanvasElement, fractal: IFractal, private colorFunction: IColorFunction, private audioPlayer: FractalAudioPlayer) {

        this.mandelbrot = new GlslFrameRenderer(canvas, fractal, colorFunction, { x: -2, y: -2, w: 4, h:4 }, (jpt) => {
            this.playSound(jpt, fractal);
        });
        this.mandelbrot.run();
    }

    cleanup() {
        this.mandelbrot.cleanup();
    }

    playSound(pt: Point, fractal: IFractal)
    {
        this.audioPlayer.Play(new Complex(pt.x, pt.y), fractal);
    }
}