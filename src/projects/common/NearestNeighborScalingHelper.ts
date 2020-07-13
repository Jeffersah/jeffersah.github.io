import { ResizeCanvas } from './CanvasHelpers';

export default class NearestNeighborScalingHelper {

    public scaleFactor: number;
    constructor(public canvas: HTMLCanvasElement, public context: CanvasRenderingContext2D, public baseWidth: number, public baseHeight: number, public onResize: (() => void)|undefined) {
        this.Rescale();
        window.addEventListener('resize', () => this.Rescale());
    }

    public Rescale() {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;
        const maxXScale = currentWidth / this.baseWidth;
        const maxYScale = currentHeight / this.baseHeight;

        this.scaleFactor = Math.max(Math.floor(Math.min(maxXScale, maxYScale)), 1);
        ResizeCanvas(this.canvas, this.scaleFactor * this.baseWidth, this.baseHeight * this.scaleFactor);

        this.context.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, 0, 0);

        if (this.onResize !== undefined) {
            this.onResize();
        }
    }
}