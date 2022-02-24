import { timeStamp } from "console";
import Point from "../../common/position/Point";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import Player from "../entities/Player";
import Entity from "../Entity";
import GameState from "../GameState";
import SimpleWeapon from "./SimpleWeapon";

export default class Kunai extends SimpleWeapon {
    constructor(assets: Assets) {
        super('secondary', assets, new Point(11, 1), true,
        {
            onMove: new Point(1, 0),
            pattern: [new Point(2, -2), new Point(0, 2)],
            attack: (s,p,t) => this.getAttack(s,p,t)
        });

        this.name = 'Kunai';
        this.description = 'A ranged secondary weapon which attacks enemies forward-left and forward-right of you two spaces away when you move'
    }

    getAttack(state: GameState, player: Player, target: Point): AttackInfo | undefined {
        const e = state.entityAt(target);
        if(e === undefined || Entity.IsPlayer(e)) return undefined;
        return AttackInfo.basicAttack(player, e, 1);
    }
}