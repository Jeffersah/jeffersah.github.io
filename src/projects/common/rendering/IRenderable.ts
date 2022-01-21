import Rect from "../position/Rectangle";
import Sprite from "./Sprite";

export default interface IRenderable {
    tick(): boolean;
    draw(ctx: CanvasRenderingContext2D, position: Rect, rotation: number): void;
}

export interface ISimpleRenderable extends IRenderable {
    getSprite(): Sprite;
}