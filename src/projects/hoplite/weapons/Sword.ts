import { timeStamp } from "console";
import Point from "../../common/position/Point";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import Player from "../entities/Player";
import Entity from "../Entity";
import GameState from "../GameState";
import SimpleWeapon from "./SimpleWeapon";

export default class Sword extends SimpleWeapon {

    impactAnimation: IRenderableSource;

    constructor(assets: Assets) {
        super('primary', assets, new Point(0, 0), true,
        {
            onMove: new Point(1, 0),
            pattern: [new Point(0, -1), new Point(1, -1), new Point(-1, 1), new Point(0, 1)],
            attack: (s,p,t) => this.getAttack(s,p,t)
        });

        this.impactAnimation = assets.getImpactAnimation(0);

        this.name = 'Sword';
        this.description = 'A versatile weapon which strikes all adjacent enemies (except those directly behind you) when you move.'
    }

    getAttack(state: GameState, player: Player, target: Point): AttackInfo | undefined {
        const e = state.entityAt(target);
        if(e === undefined || Entity.IsPlayer(e)) return undefined;
        return AttackInfo.animationAttack(player, e, 1, this.impactAnimation, false);
    }
}