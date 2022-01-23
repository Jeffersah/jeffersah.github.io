import { LinkedInterpolation } from "../common/interpolation/Interpolated";
import Point from "../common/position/Point";
import Rect from "../common/position/Rectangle";
import IRenderable from "../common/rendering/IRenderable";
import GameState from "./GameState";

export default abstract class Entity {
    isFlying: boolean;
    maxHp: number;
    hp: number;
    position: Point;

    constructor(position: Point) {
        this.position = position;
    }
    
    TakeDamage(dmg: number) {

    }

    tick(state: GameState) {

    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
}