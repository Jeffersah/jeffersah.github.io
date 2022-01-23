import Point from "../common/position/Point";
import Assets from "./Assets";
import Entity from "./Entity";
import * as C from "./Constants";
import IRenderableSource from "../common/rendering/IRenderableSource";
import IRenderable from "../common/rendering/IRenderable";
import Sprite from "../common/rendering/Sprite";
import Rect from "../common/position/Rectangle";
import GameState from "./GameState";
import { HexToPixel } from "./Hex";

export default abstract class HexCell {
    isPathable: boolean;
    typeId: number;

    constructor(typeId: number, pathable: boolean){
        this.typeId = typeId;
        this.isPathable = pathable;
    }

    abstract OnEntityStep(entity: Entity): void;
    abstract AfterWorldLoad(world: GameState, pt: Point): void;
    abstract draw(ctx: CanvasRenderingContext2D, world: GameState, pt: Point): void;
}

export abstract class SimpleCell extends HexCell{
    private renderable: IRenderable;
    private bg_renderable: IRenderable;

    constructor(typeId: number, assets: Assets, spriteSheetPosition: Point, isPathable: boolean){
        super(typeId, isPathable);

        this.bg_renderable = new Sprite(assets.tiles.image, new Rect(11 * C.TILE_WIDTH, 0, C.TILE_WIDTH, C.TILE_HEIGHT));
        this.renderable = new Sprite(assets.tiles.image, new Rect(spriteSheetPosition.x * C.TILE_WIDTH, spriteSheetPosition.y * C.TILE_HEIGHT, C.TILE_WIDTH, C.TILE_HEIGHT));
    }

    override AfterWorldLoad(world: GameState, pt: Point): void {
        
    }

    override draw(ctx: CanvasRenderingContext2D, world: GameState, pt: Point): void {
        let target = HexToPixel(pt);

        this.bg_renderable.draw(ctx, new Rect(target.x, target.y + 24, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
        this.renderable.draw(ctx, new Rect(target.x, target.y, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
    }
}

export class Floor extends SimpleCell {
    constructor(assets: Assets) {
        super(0, assets,new Point(0,0), true);
    }

    OnEntityStep(entity: Entity): void {
    }
}

// TypeID 1 : Lava

export class DownStairs extends SimpleCell {
    constructor(assets: Assets) {
        super(2, assets, new Point(5, 0), true);
    }

    OnEntityStep(entity: Entity): void {
    }
}