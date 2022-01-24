import Point from "../common/position/Point";
import Rect from "../common/position/Rectangle";
import IRenderable from "../common/rendering/IRenderable";
import IRenderableSource from "../common/rendering/IRenderableSource";
import EntityMoveAnimation from "./animation/EntityMoveAnimation";
import IAnimation from "./animation/IAnimation";
import RenderableAnimation from "./animation/RenderableAnimation";
import Entity from "./Entity";
import * as C from "./Constants";
import { HexToPixel } from "./Hex";
import { Interpolated, InterpolationTimer, LinkedInterpolation } from "../common/interpolation/Interpolated";

const BUMP_ANIMATION_TIME = 10;

export default class AttackInfo {
    public startPoint: Point;
    constructor(public attacker: Entity, public target: Point, public affectedTiles: Point[], public damage: number, public bumpAnimation: boolean, public impactAnimation: IRenderableSource, public projectile: IRenderableSource) {
        this.startPoint = attacker.position;
    }

    static basicAttack(attacker: Entity, target: Entity, damage: number) {
        return new AttackInfo(attacker, target.position, [target.position], damage, true, null, null);
    }

    static animationAttack(attacker: Entity, target: Entity, damage: number, impactAnimation: IRenderableSource, bumpAnimation?: boolean) {
        return new AttackInfo(attacker, target.position, [target.position], damage, bumpAnimation??false, impactAnimation, null);
    }

    static projectileAttack(attacker:Entity, target: Entity, damage: number, projectile: IRenderableSource) {
        return new AttackInfo(attacker, target.position, [target.position], damage, false, null, projectile);
    }

    toAnimations():IAnimation[] {
        let animations:IAnimation[] = [];
        if(this.bumpAnimation) {
            animations.push(new EntityMoveAnimation(
                this.attacker, 
                Interpolated.linear<Point>(Point.interpolate, 
                    this.attacker.position, 
                    Point.interpolate(this.attacker.position, this.target, 1/2), 
                    this.attacker.position), 
                this.attacker.position, 
                BUMP_ANIMATION_TIME));
        }
        if(this.projectile) {
            // TODO
        }
        if(this.impactAnimation) {
            const pixTarget = HexToPixel(this.target);
            animations.push(new RenderableAnimation(this.impactAnimation.getRenderable(), new Rect(pixTarget.x, pixTarget.y, C.TILE_WIDTH, C.TILE_HEIGHT)));
        }
        return animations;
    }
}