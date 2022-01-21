import { Interpolated, InterpolationTimer } from "../interpolation/Interpolated";
import Point from "../position/Point";
import Rectangle from "../position/Rectangle";
import IRenderable from "./IRenderable";
import IRenderableSource from "./IRenderableSource";

export class InterpolatedRenderable implements IRenderableSource {
    constructor(public inner: IRenderableSource, public duration: number, public deltaPosition?: Interpolated<Point>, public deltaScale?: Interpolated<Point>, public deltaRotation?: Interpolated<number>){

    }

    getPixelSize(): Point {
        return this.inner.getPixelSize();
    }

    getRenderable(): IRenderable {
        return new InterpolatedRenderableInstance(this);
    }
}

export class InterpolatedRenderableInstance implements IRenderable {

    private timer: InterpolationTimer;
    private inner: IRenderable;

    constructor(private source: InterpolatedRenderable) {
        this.timer = new InterpolationTimer(source.duration);
        this.inner = source.inner.getRenderable();
    }

    tick(): boolean {
        const tt = this.timer.tick();
        const it = this.inner.tick();
        return tt && it;
    }

    draw(ctx: CanvasRenderingContext2D, position: Rectangle, rotation: number): void {
        if(this.source.deltaPosition !== undefined) {
            position.shiftBy(this.timer.sample(this.source.deltaPosition));
        }
        if(this.source.deltaScale !== undefined) {
            const scale = this.timer.sample(this.source.deltaScale);
            position.w *= scale.x;
            position.h *= scale.y;
        }
        if(this.source.deltaRotation !== undefined) {
            rotation += this.timer.sample(this.source.deltaRotation);
        }
        this.inner.draw(ctx, position, rotation);
    }
}