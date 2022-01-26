import { timeStamp } from "console";
import Point from "../../common/position/Point";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import Player from "../entities/Player";
import Entity from "../Entity";
import GameState from "../GameState";
import SimpleWeapon from "./SimpleWeapon";

export default class Dagger extends SimpleWeapon {
    constructor(assets: Assets) {
        super('secondary', assets, new Point(10, 0), true,
        {
            onMove: new Point(1, 0),
            pattern: [new Point(1, -1), new Point(0, 1)],
            attack: (s,p,t) => this.getAttack(s,p,t)
        });
    }

    getAttack(state: GameState, player: Player, target: Point): AttackInfo | undefined {
        const e = state.entityAt(target);
        if(e === undefined || Entity.IsPlayer(e)) return undefined;
        return AttackInfo.basicAttack(player, e, 1);
    }
}