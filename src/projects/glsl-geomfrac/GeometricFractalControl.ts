import { IColorFunction } from "../glsl-fracaudio/ColorFunctions/IColorFunction";
import { IFractal } from "./Fractals/IFractal";
import SampleRenderer from "./SampleRenderer";
import SliceRenderer from "./SliceRenderer";
import SamplerWorker from './workers/Sampler.worker.ts';

export default class GeometricFractalControl {
    sliceRenderer: SliceRenderer;
    sampleRenderer: SampleRenderer;

    constructor(public canvas2d: HTMLCanvasElement, public canvas3d: HTMLCanvasElement) {
        this.sliceRenderer = new SliceRenderer(canvas2d);
        this.sampleRenderer = new SampleRenderer(canvas3d);
    }

    start(fractal: IFractal, color: IColorFunction) {
        this.sliceRenderer.init(fractal, color);
        this.sliceRenderer.render();
        this.sampleRenderer.init(fractal);
    }

    scroll(dx: number, dy: number, dz: number) {
        this.sliceRenderer.scroll(dx, dy, dz);
        this.sliceRenderer.render();
    }
    
    zoom(percent: number, anchorX: number, anchorY: number) {
        this.sliceRenderer.zoom(percent, anchorX, anchorY);
        this.sliceRenderer.render();
    }

    destroy() {
        this.sliceRenderer.destroy();
        this.sampleRenderer.destroy();
    }
}