import Point from "../common/position/Point";
import Assets from "./Assets";
import * as C from "./Constants";
import IRenderable from "../common/rendering/IRenderable";
import Sprite from "../common/rendering/Sprite";
import Rect from "../common/position/Rectangle";
import GameState from "./GameState";
import { HexToPixel } from "./Hex";
import HexCell from "./HexCell";
import { AllDirections, Direction, DirectionHelper } from "./Direction";
import { StackRenderable } from "../common/rendering/StackRenderable";
import { DeltaRenderable } from "../common/rendering/DeltaRenderable";

interface ITilePart {
    directions: Direction[];
    tileCoords: Point;
    tileSlice: Rect;
}

const tileParts: ITilePart[] = [
    {
        // Top of Tile
        directions: [Direction.UpLeft, Direction.UpRight],
        tileCoords: new Point(0, 0),
        tileSlice: new Rect(0, 0, 1, 0.5),
    },
    {
        // Bottom of Tile
        directions: [Direction.DownLeft, Direction.DownRight],
        tileCoords: new Point(0, 0),
        tileSlice: new Rect(0, 0.5, 1, 0.5),
    }, 
    {
        // TopLeft of Tile
        directions: [Direction.Left, Direction.UpLeft],
        tileCoords: new Point(0, 1),
        tileSlice: new Rect(0, 0, 0.5, 0.5),
    },
    {
        // TopRight of Tile
        directions: [Direction.Right, Direction.UpRight],
        tileCoords: new Point(0, 1),
        tileSlice: new Rect( 0.5, 0, 0.5, 0.5),
    },
    {
        // BottomLeft of Tile
        directions: [Direction.Left, Direction.DownLeft],
        tileCoords: new Point(0, 1),
        tileSlice: new Rect(0, 0.5, 0.5, 0.5),
    },
    {
        // BottomRight of Tile
        directions: [Direction.Right, Direction.DownRight],
        tileCoords: new Point(0, 1),
        tileSlice: new Rect(0.5, 0.5, 0.5, 0.5),
    }
]

export default abstract class MultiPartCell extends HexCell{
    private renderable: IRenderable;
    private bg_renderable: IRenderable;
    private assets: Assets;

    constructor(typeId: number, assets: Assets, private spriteSheetPosition: Point, isPathable: boolean){
        super(typeId, isPathable);

        this.assets = assets;
        this.bg_renderable = new Sprite(assets.tiles.image, new Rect(11 * C.TILE_WIDTH, 0, C.TILE_WIDTH, C.TILE_HEIGHT));
    }

    override AfterWorldLoad(world: GameState, pt: Point): void {
        const adjacencyMap = AllDirections.map(d => {
            const hexPt = Point.add(pt, DirectionHelper.ToPoint(d));
            if(world.tiles.isInBounds(hexPt.x, hexPt.y)) {
                return world.tiles.get(pt).typeId !== world.tiles.get(hexPt).typeId;
            }
            else {
                return true;
            }
        });

        const images = tileParts.map(part => {
            const index = part.directions.reduceRight((acc, dir) => (acc << 1) + (adjacencyMap[dir] ? 1 : 0), 0);
            const sourceBounds = new Rect(
                (part.tileCoords.x + index + part.tileSlice.x + this.spriteSheetPosition.x) * C.TILE_WIDTH,
                (part.tileCoords.y + part.tileSlice.y + this.spriteSheetPosition.y) * C.TILE_HEIGHT,
                (part.tileSlice.w) * C.TILE_WIDTH,
                (part.tileSlice.h) * C.TILE_HEIGHT
            );
            return new DeltaRenderable(
                new Sprite(this.assets.tiles.image, sourceBounds),
                part.tileSlice
            );
        });

        this.renderable = new StackRenderable(
            images,
            'all'
        );
    }

    override draw(ctx: CanvasRenderingContext2D, world: GameState, pt: Point): void {
        let target = HexToPixel(pt);

        this.bg_renderable.draw(ctx, new Rect(target.x, target.y + 24, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
        this.renderable.draw(ctx, new Rect(target.x, target.y, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
    }
}