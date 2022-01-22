import Point from "../common/position/Point";
import Assets from "./Assets";
import Entity from "./Entity";
import HexWorld from "./HexWorld";
import * as C from "./Constants";

export default abstract class HexCell {
    isPathable: boolean;
    typeId: number;

    constructor(typeId: number, pathable: boolean){
        this.typeId = typeId;
        this.isPathable = pathable;
    }

    abstract OnEntityStep(entity: Entity): void;
    abstract AfterWorldLoad(world: HexWorld, pt: Point): void;
    abstract Draw(ctx: CanvasRenderingContext2D, assets: Assets, world: HexWorld, pt: Point): void;
}

export abstract class SimpleCell extends HexCell{
    public spriteSheetTilePosition: Point;

    constructor(typeId: number, spriteSheetPosition: Point, isPathable: boolean){
        super(typeId, isPathable);
        this.spriteSheetTilePosition = spriteSheetPosition;
    }

    override AfterWorldLoad(world: HexWorld, pt: Point): void {
        
    }

    override Draw(ctx: CanvasRenderingContext2D, assets: Assets, world: HexWorld, pt: Point): void {
        assets.tiles.render(
            ctx,
            pt.x * C.PIX_PER_CELL_X + (pt.y * C.PIX_PER_CELL_Y.x) + C.MAP_CENTER_POSITION.x,
            (pt.y * C.PIX_PER_CELL_Y.y) + C.MAP_CENTER_POSITION.y,
            C.TILE_WIDTH,
            C.TILE_HEIGHT,
            this.spriteSheetTilePosition.x,
            this.spriteSheetTilePosition.y
        )
    }
}

export class Floor extends SimpleCell {
    constructor() {
        super(0, new Point(0,0), true);
    }

    OnEntityStep(entity: Entity): void {
    }
}

export class Lava extends SimpleCell {
    constructor() {
        super(1, new Point(1,0), false);
    }

    OnEntityStep(entity: Entity): void {
        if(!entity.isFlying)
            entity.TakeDamage(999);
    }
}

export class DownStairs extends SimpleCell {
    constructor() {
        super(2, new Point(5, 0), true);
    }

    OnEntityStep(entity: Entity): void {
    }
}