import { Interpolated, InterpolationTimer } from "../interpolation/Interpolated";
import Point from "../position/Point";
import Rectangle from "../position/Rectangle";
import IRenderable from "./IRenderable";
import IRenderableSource from "./IRenderableSource";

export class OffsetRenderable implements IRenderable {

    constructor(private source: IRenderable, public offset: Point) {
    }

    tick(): boolean {
        return this.source.tick();
    }

    draw(ctx: CanvasRenderingContext2D, position: Rectangle, rotation: number): void {
        this.source.draw(ctx, position.shift(this.offset.x, this.offset.y), rotation);
    }
}