import { Interpolated, InterpolationTimer } from "../interpolation/Interpolated";
import Point from "../position/Point";
import Rectangle from "../position/Rectangle";
import IRenderable from "./IRenderable";
import IRenderableSource from "./IRenderableSource";

export class DeltaRenderable implements IRenderable {
    constructor(private source: IRenderable, public delta: Rectangle) {
    }

    tick(): boolean {
        return this.source.tick();
    }

    draw(ctx: CanvasRenderingContext2D, position: Rectangle, rotation: number): void {
        this.source.draw(ctx, new Rectangle(position.x + this.delta.x * position.w, position.y + this.delta.y * position.h, position.w * this.delta.w, position.h * this.delta.h), rotation);
    }
}