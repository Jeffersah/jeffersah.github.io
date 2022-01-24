import { Interpolated, InterpolationTimer, LinkedInterpolation } from "../../common/interpolation/Interpolated";
import Point from "../../common/position/Point";
import Entity from "../Entity";
import IAnimation from "./IAnimation";

export default class EntityMoveAnimation implements IAnimation {
    private timer: InterpolationTimer;
    constructor(private entity: Entity, private motion: Interpolated<Point>, private target: Point, private duration: number) {
        this.timer = new InterpolationTimer(duration);
    }

    tick(): boolean{ 
        if(this.timer.tick()) {
            this.entity.position = this.target;
            return true;
        }
        this.entity.position = this.timer.sample(this.motion);
        return false;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        // The gamestate drawing will draw this entity. No need to draw it twice.
        // this.entity.draw(ctx);
    }
}