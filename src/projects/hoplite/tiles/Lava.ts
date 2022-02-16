import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderable from "../../common/rendering/IRenderable";
import Sprite from "../../common/rendering/Sprite";
import { StackRenderable } from "../../common/rendering/StackRenderable";
import Assets from "../Assets";
import { Direction, DirectionHelper } from "../Direction";
import Entity from "../Entity";
import GameState from "../GameState";
import HexCell from "./HexCell";
import MultiPartCell, { StitchTileParts } from "./MultiPartCell";
import * as C from "../Constants";
import { HexToPixel } from "../Hex";
import IAttackInfo from "../attackInfos/IAttackInfo";
import TileAttackInfo from "../attackInfos/TileAttackInfo";

export default class Lava extends HexCell {
    public static TypeID = 1;

    private lavaStatic: IRenderable;
    private lavaOverlay: IRenderable;

    private bg_renderable: IRenderable;
    private assets: Assets;

    constructor(assets: Assets) {
        super(Lava.TypeID, false);
        this.assets = assets;
        
        this.bg_renderable = new Sprite(assets.tiles.image, new Rect(11 * C.TILE_WIDTH, 0, C.TILE_WIDTH, C.TILE_HEIGHT));
    }

    override AfterEnemyTurn(state: GameState, x: number, y: number): IAttackInfo[] {
        const steppingEnemy = state.enemies.find(e => e.position.x == x && e.position.y == y);
        if(steppingEnemy !== undefined && !steppingEnemy.isFlying){
            return [
                new TileAttackInfo(new Point(x, y), [{ damage: 999, positions: [new Point(x,y)] }], 0, this.assets.getImpactAnimation(2))
            ]
        }
        return [];
    }

    OnEntityStep(entity: Entity): void {
    }

    override AfterWorldLoad(world: GameState, pt: Point): void {
        this.lavaStatic = StitchTileParts(this.assets.lavaLayers.image, 0, 0, C.TILE_WIDTH, C.TILE_HEIGHT, (d:Direction) => {
            const hexPt = Point.add(pt, DirectionHelper.ToPoint(d));
            if(world.tiles.isInBounds(hexPt.x, hexPt.y)) {
                return world.tiles.get(pt).typeId !== world.tiles.get(hexPt).typeId;
            }
            else {
                return true;
            }
        });

        this.lavaOverlay = StitchTileParts(this.assets.lavaLayers.image, 0, 2, C.TILE_WIDTH, C.TILE_HEIGHT, (d:Direction) => {
            const hexPt = Point.add(pt, DirectionHelper.ToPoint(d));
            if(world.tiles.isInBounds(hexPt.x, hexPt.y)) {
                return world.tiles.get(pt).typeId !== world.tiles.get(hexPt).typeId;
            }
            else {
                return true;
            }
        });
    }

    override draw(ctx: CanvasRenderingContext2D, world: GameState, pt: Point): void {
        let target = HexToPixel(pt);

        this.bg_renderable.draw(ctx, new Rect(target.x, target.y + 24, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
        this.lavaStatic.draw(ctx, new Rect(target.x, target.y, C.TILE_WIDTH, C.TILE_HEIGHT), 0);

        let overlayWaver = Math.round(Math.sin(world.renderTickNumber / 15 + pt.x/2) * 1.5);
        this.lavaOverlay.draw(ctx, new Rect(target.x, target.y + overlayWaver, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
    }
}