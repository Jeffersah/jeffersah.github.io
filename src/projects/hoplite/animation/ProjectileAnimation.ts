import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderable from "../../common/rendering/IRenderable";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import Sprite from "../../common/rendering/Sprite";
import { HexToPixel } from "../Hex";
import IAnimation from "./IAnimation";
import RenderableAnimation from "./RenderableAnimation";
import SequentialAnimation from "./SequentialAnimation";
import * as C from '../Constants';

export default class ProjectileAnimation implements IAnimation {

    private angle: number;
    private time: number;
    constructor(private renderable: IRenderable, private size: Point, private fromPixel: Point, private toPixel: Point, private duration: number) {
        this.angle = Math.atan2(toPixel.y - fromPixel.y, toPixel.x - fromPixel.x);
        this.time = 0;
    }

    tick(): boolean {
        this.time++;
        return this.time >= this.duration;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        const position = Point.interpolate(this.fromPixel, this.toPixel, this.time / this.duration);
        const destination = new Rect(position.x, position.y, this.size.x, this.size.y);
        this.renderable.draw(ctx, destination, this.angle);
    }
}

export function CreateProjectileAnimation(projectile: Sprite, fromHex: Point, toHex: Point, duration: number, onImpact: IRenderableSource): IAnimation {
    const destPt = HexToPixel(toHex);
    const projAnimation = new ProjectileAnimation(projectile, projectile.getPixelSize(), Point.add(HexToPixel(fromHex), C.HALF_TILE_SIZE), Point.add(destPt, C.HALF_TILE_SIZE), duration);
    if(onImpact !== null) {
        const impactAnimation = new RenderableAnimation(onImpact.getRenderable(), new Rect(destPt.x, destPt.y, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
        return new SequentialAnimation([projAnimation, impactAnimation]);
    }
    return projAnimation;
}