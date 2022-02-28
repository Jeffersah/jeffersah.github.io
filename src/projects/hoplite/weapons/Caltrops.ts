import { timeStamp } from "console";
import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import Player from "../entities/Player";
import Entity from "../Entity";
import GameState from "../GameState";
import SimpleWeapon from "./SimpleWeapon";

export default class Caltrops extends SimpleWeapon {
    projectile: Sprite;
    constructor(assets: Assets) {
        super('secondary', assets, new Point(2, 1), true,
        {
            onMove: new Point(1, 0),
            pattern: [
                new Point(-1, 0), 
                { empty: [new Point(-1, 0)], target: new Point(-2, 0) }
            ],
            attack: (s,p,t) => this.getAttack(s,p,t)
        });

        this.name = 'Caltrops';
        this.projectile = assets.getAsset('projectile_kunai') as Sprite;
        this.description = 'A secondary weapon which attacks behind you up to 2 spaces away'
    }

    getAttack(state: GameState, player: Player, target: Point): AttackInfo | undefined {
        const e = state.entityAt(target);
        if(e === undefined || Entity.IsPlayer(e)) return undefined;
        return AttackInfo.projectileAttack(player, e, 1, this.projectile);
    }
}