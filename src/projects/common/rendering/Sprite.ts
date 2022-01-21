import Rect from "../position/Rectangle";
import { RotTransformCanvas } from "../CanvasHelpers";
import Point from "../position/Point";
import IRenderable, { ISimpleRenderable } from "./IRenderable";
import IRenderableSource from "./IRenderableSource";

export default class Sprite implements IRenderable, ISimpleRenderable, IRenderableSource {

    constructor(public source: CanvasImageSource, public sourceBounds: Rect, public origin: Point) {

    }

    getSprite(): Sprite {
        return this;
    }

    getPixelSize(): Point {
        return new Point(this.sourceBounds.w, this.sourceBounds.h);
    }

    getRenderable(): IRenderable {
        return this;
    }

    public width() {
        return this.sourceBounds.w;
    }
    public height() {
        return this.sourceBounds.h;
    }

    tick(): boolean {
        return false;
    }

    draw(ctx: CanvasRenderingContext2D, destination: Rect, rotation: number): void {
        const oldTransform = ctx.getTransform();
        RotTransformCanvas(ctx, destination.x, destination.y, this.origin.x, this.origin.y, rotation);
        ctx.drawImage(this.source, 
            this.sourceBounds.x, 
            this.sourceBounds.y, 
            this.sourceBounds.w, 
            this.sourceBounds.h, 
            0, 
            0, 
            destination.w, 
            destination.h);
        ctx.setTransform(oldTransform);
    }
}