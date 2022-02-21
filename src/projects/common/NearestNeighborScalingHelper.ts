import { ResizeCanvas } from './CanvasHelpers';
import Point from './position/Point';

export default class NearestNeighborScalingHelper {

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

    public Detatch() {
        if (this.scaleByWindowSize) {
            window.removeEventListener('resize', () => this.Rescale());
        }
        else {
            this.canvas.parentElement.removeEventListener('resize', () => this.Rescale());
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

        this.scaleFactor = Math.max(Math.floor(Math.min(maxXScale, maxYScale)), 1);
        ResizeCanvas(this.canvas, this.scaleFactor * this.baseWidth, this.baseHeight * this.scaleFactor);

        this.context.setTransform(this.scaleFactor, 0, 0, this.scaleFactor, 0, 0);

        if (this.onResize !== undefined) {
            this.onResize();
        }
    }

    public ScreenToPixel(point: Point) :Point {
        return new Point(point.x / this.scaleFactor, point.y / this.scaleFactor);
    }

    public TryRescale() {
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

        if(this.canvas.width === currentWidth && this.canvas.height === currentHeight) { return }
        this.Rescale();
    }
}