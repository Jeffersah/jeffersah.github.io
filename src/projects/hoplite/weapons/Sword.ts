import { timeStamp } from "console";
import Point from "../../common/position/Point";
import Assets from "../Assets";
import AttackInfo from "../AttackInfo";
import Player from "../entities/Player";
import Entity from "../Entity";
import GameState from "../GameState";
import SimpleWeapon from "./SimpleWeapon";

export default class Sword extends SimpleWeapon {
    constructor(assets: Assets) {
        super('primary', assets, new Point(8, 1), 
        {
            onMove: new Point(1, 0),
            pattern: [new Point(0, -1), new Point(1, -1), new Point(-1, 1), new Point(0, 1)],
            attack: (s,p,t) => this.getAttack(s,p,t)
        });
    }

    getAttack(state: GameState, player: Player, target: Point): AttackInfo | undefined {
        const e = state.entityAt(target);
        if(e === undefined || Entity.IsPlayer(e)) return undefined;
        return new AttackInfo(player, target, [target], 2, false, /* ATTACK ANIMATION HERE */ null, null); 
    }
}