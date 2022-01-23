import Point from "../common/position/Point";
import Rect from "../common/position/Rectangle";
import IRenderable from "../common/rendering/IRenderable";
import { HexToPixel } from "./Hex";
import * as C from './Constants';

export default abstract class Entity {
    isFlying: boolean;
    maxHp: number;
    hp: number;
    position: Point;

    constructor(position: Point) {
        this.position = position;
    }

    abstract draw(ctx: CanvasRenderingContext2D): void;
}

export abstract class SimpleEnemy extends Entity {
    abstract getRenderable() : IRenderable;
    override draw(ctx: CanvasRenderingContext2D): void {
        const target = HexToPixel(this.position);
        const rect = new Rect(target.x, target.y, C.TILE_WIDTH, C.TILE_HEIGHT);
        this.getRenderable().draw(ctx, rect, 0);
    } 
}