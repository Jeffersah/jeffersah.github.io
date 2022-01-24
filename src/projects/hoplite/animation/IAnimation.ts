export default interface IAnimation {
    tick(): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
}