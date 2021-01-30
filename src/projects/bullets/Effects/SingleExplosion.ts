import { Color } from "../../common/Color";
import { Interpolated, InterpolationTimer } from "../../common/interpolation/Interpolated";
import Point from "../../common/position/Point";
import { IEffect } from "../IEffect";

export class SingleExplosion implements IEffect {

    private timing: InterpolationTimer;

    constructor(
        public position: Point,
        public outerRadius: Interpolated<number>,
        public innerRadius: Interpolated<number>,
        public fillColor: Interpolated<Color>,
        totalTime: number)
    {
        this.timing = new InterpolationTimer(totalTime);
    }

    tick(): boolean {
        return this.timing.tick();
    }
    draw(ctx: CanvasRenderingContext2D): void {
        const outer = this.timing.sample(this.outerRadius);
        const inner = this.timing.sample(this.innerRadius);
        const fill = this.timing.sample(this.fillColor);
        ctx.beginPath();
        ctx.arc(this.position.x, this.position.y, outer, 0, Math.PI * 2, false);
        if(inner >= 0) {
            ctx.arc(this.position.x, this.position.y, inner, 0, Math.PI * 2, true);
        }
        ctx.closePath();
        ctx.fillStyle = fill.toString();
        ctx.fill();
    }

}