export interface IGraphic {
    width: number;
    height: number;
    paint(ctx: CanvasRenderingContext2D, tx: number, ty: number, tw: number, th: number): void;
}