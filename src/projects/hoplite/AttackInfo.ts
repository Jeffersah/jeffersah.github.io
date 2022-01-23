import Point from "../common/position/Point";
import IRenderable from "../common/rendering/IRenderable";
import IRenderableSource from "../common/rendering/IRenderableSource";
import Entity from "./Entity";

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
}