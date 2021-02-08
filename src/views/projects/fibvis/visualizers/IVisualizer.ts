export default interface IVisualizer {
    paintFrame(ctx: CanvasRenderingContext2D, width: number, height: number, animationProgress: number): void;
    paintTotal(ctx: CanvasRenderingContext2D, width: number, height: number): void;
}