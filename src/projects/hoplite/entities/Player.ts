import { LinkedInterpolation } from "../../common/interpolation/Interpolated";
import Point from "../../common/position/Point";
import IRenderable from "../../common/rendering/IRenderable";
import { OffsetRenderable } from "../../common/rendering/OffsetRenderable";
import { StackRenderable } from "../../common/rendering/StackRenderable";
import Assets from "../Assets";
import Entity from "../Entity";
import PlayerWeapon from "../weapons/PlayerWeapon";
import * as C from '../Constants';
import Sprite from "../../common/rendering/Sprite";
import Rect from "../../common/position/Rectangle";
import { HexToPixel } from "../Hex";
import Sword from "../weapons/Sword";
import Dagger from "../weapons/Dagger";
import HpRenderer from "../HpRenderer";

export default class Player extends Entity {

    public primary: PlayerWeapon;
    public secondary: PlayerWeapon;
    private renderable: Sprite;
    private hpRenderer: HpRenderer;

    constructor(assets: Assets, pos: Point) {
        super(pos);

        this.hpRenderer = assets.hpRenderer;

        this.maxHp = this.hp = 3;

        this.primary = new Sword(assets);
        this.secondary = new Dagger(assets);

        this.renderable = new Sprite(assets.tiles.image, new Rect(C.TILE_WIDTH * 8, 0, C.TILE_WIDTH, C.TILE_HEIGHT));
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const target = HexToPixel(this.position);
        const rect = new Rect(target.x, target.y, C.TILE_WIDTH, C.TILE_HEIGHT);

        this.renderable.draw(ctx, rect, 0);
        this.primary.sprite.draw(ctx, new Rect(rect.x, rect.y, rect.w / 2, rect.h), 0);
        this.secondary.sprite.draw(ctx, new Rect(rect.x +rect.w / 2, rect.y, rect.w / 2, rect.h), 0);

        this.hpRenderer.draw(ctx, this.position, this.hp, this.maxHp);
    }
}