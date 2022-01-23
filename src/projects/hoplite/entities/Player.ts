import { LinkedInterpolation } from "../../common/interpolation/Interpolated";
import Point from "../../common/position/Point";
import IRenderable from "../../common/rendering/IRenderable";
import { OffsetRenderable } from "../../common/rendering/OffsetRenderable";
import { StackRenderable } from "../../common/rendering/StackRenderable";
import Assets from "../Assets";
import Entity from "../Entity";
import PlayerWeapon from "./PlayerWeapon";
import * as C from '../Constants';
import Sprite from "../../common/rendering/Sprite";
import Rect from "../../common/position/Rectangle";
import { HexToPixel } from "../Hex";

export default class Player extends Entity {

    public primary: PlayerWeapon;
    public secondary: PlayerWeapon;
    private renderable: Sprite;

    constructor(assets: Assets, pos: Point) {
        super(pos);

        this.primary = new PlayerWeapon('primary', assets, new Point(8, 1));
        this.secondary = new PlayerWeapon('secondary', assets, new Point(10, 0));

        this.renderable = new Sprite(assets.tiles.image, new Rect(C.TILE_WIDTH * 8, 0, C.TILE_WIDTH, C.TILE_HEIGHT));
    }

    draw(ctx: CanvasRenderingContext2D): void {

        const target = HexToPixel(this.position);
        const rect = new Rect(target.x, target.y, C.TILE_WIDTH, C.TILE_HEIGHT);

        this.renderable.draw(ctx, rect, 0);
        this.primary.sprite.draw(ctx, new Rect(rect.x, rect.y, rect.w / 2, rect.h), 0);
        this.secondary.sprite.draw(ctx, new Rect(rect.x +rect.w / 2, rect.y, rect.w / 2, rect.h), 0);
    }
}