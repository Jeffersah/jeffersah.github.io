export default interface IScreen {
    update(changeScreen: (s: IScreen) => void): void;
    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void;
}