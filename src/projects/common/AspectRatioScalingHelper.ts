import { ResizeCanvas } from './CanvasHelpers';

export default class AspectRatioScalingHelper {

    public scaleFactor: number;
    constructor(public canvas: HTMLCanvasElement, public context: CanvasRenderingContext2D, public baseWidth: number, public baseHeight: number, private scaleByWindowSize: boolean, public onResize: (() => void)|undefined) {
        this.Rescale();
        if (this.scaleByWindowSize) {
            window.addEventListener('resize', () => this.Rescale());
        }
        else {
            canvas.parentElement.addEventListener('resize', () => this.Rescale());
        }
    }

    public Rescale() {
        let currentWidth: number;
        let currentHeight: number;
        if (this.scaleByWindowSize) {
            currentWidth = window.innerWidth;
            currentHeight = window.innerHeight;
        }
        else {
            currentWidth = this.canvas.parentElement.clientWidth;
            currentHeight = this.canvas.parentElement.clientHeight;
        }
        const maxXScale = currentWidth / this.baseWidth;
        const maxYScale = currentHeight / this.baseHeight;

        this.scaleFactor = Math.max(Math.min(maxXScale, maxYScale), 1);
        ResizeCanvas(this.canvas, Math.floor(this.scaleFactor * this.baseWidth), Math.floor(this.baseHeight * this.scaleFactor));

        this.context.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, 0, 0);

        if (this.onResize !== undefined) {
            this.onResize();
        }
    }
}