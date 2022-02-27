import { timeStamp } from "console";
import Point from "../../common/position/Point";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import Player from "../entities/Player";
import Entity from "../Entity";
import GameState from "../GameState";
import { GetRing, HexLength, TurnLeft } from "../Hex";
import PlayerWeapon from "./PlayerWeapon";
import SimpleWeapon from "./SimpleWeapon";

export default class Hammer extends PlayerWeapon {
    impactAnimation: IRenderableSource;

    constructor(assets: Assets) {
        super('primary', assets, new Point(2, 0));

        this.impactAnimation = assets.getImpactAnimation(0);

        this.name = 'Hammer';
        this.description = 'A primary weapon which allows you to attack an enemy by walking into them, dealing damage to them and adjacent enemies.';
    }

    override enableAdditionalMoves(state: GameState, player: Player): {dest: Point, forceMove: Point}[] {
        const directAttacks = [];
        for(const dir of GetRing(1)) {
            const dest = Point.add(dir, player.position);
            if(!state.tiles.isInBounds(dest.x, dest.y) || !state.tiles.get(dest).isPathable) continue;
            const entity = state.entityAt(dest);
            if(entity !== undefined && !Entity.IsPlayer(entity)) {
                directAttacks.push(dest);
            }
        }
        return directAttacks.map(pt => ({ dest: pt, forceMove: player.position }));
    }

    getBeforeMoveAttacks(state: GameState, player: Player, moveFrom: Point, moveTo: Point): AttackInfo[] {
        const targetEntity = state.entityAt(moveTo);
        if(targetEntity === undefined || Entity.IsPlayer(targetEntity)) return [];
        const ray = Point.subtract(moveTo, moveFrom);
        if(HexLength(ray) !== 1) return [];
        const rot = SimpleWeapon.getRotation(ray, new Point(1, 0));
        const secondaryTargets = [new Point(0, 1), new Point(1, -1)];

        const secondaryAttacks = secondaryTargets.map(target => {
            const realTarget = Point.add(TurnLeft(target, rot), moveFrom);
            const e = state.entityAt(realTarget);
            if(e === undefined) return undefined;
            return AttackInfo.animationAttack(player, e, 2, this.impactAnimation, false);
        }).filter(a => a !== undefined);

        return [
            AttackInfo.animationAttack(player, targetEntity, 2, this.impactAnimation, true),
            ...secondaryAttacks
        ]
    }

    getAfterMoveAttacks(state: GameState, player: Player, moveFrom: Point, moveTo: Point): AttackInfo[] {
        return [];
    }

    getAttack(state: GameState, player: Player, target: Point): AttackInfo | undefined {
        const e = state.entityAt(target);
        if(e === undefined || Entity.IsPlayer(e)) return undefined;
        return AttackInfo.animationAttack(player, e, 2, this.impactAnimation, false);
    }
}