import Rect from "../../common/position/Rectangle";
import IRenderable from "../../common/rendering/IRenderable";
import IAnimation from "./IAnimation";

export default class RenderableAnimation implements IAnimation {
    private rotation: number;
    constructor(private renderable: IRenderable, private bounds: Rect, rotation?: number, private fixedDuraiton?: number) {
        this.rotation = rotation ?? 0;
    }

    tick(): boolean {
        if(this.fixedDuraiton !== undefined) {
            this.fixedDuraiton--;
            if(this.fixedDuraiton === -1) return true;
            this.renderable.tick();
            return false;
        }
        return this.renderable.tick();
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.renderable.draw(ctx, this.bounds, this.rotation);
    }
}