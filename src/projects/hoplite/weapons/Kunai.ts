import { timeStamp } from "console";
import Point from "../../common/position/Point";
import IRenderable from "../../common/rendering/IRenderable";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import Player from "../entities/Player";
import Entity from "../Entity";
import GameState from "../GameState";
import SimpleWeapon from "./SimpleWeapon";

export default class Kunai extends SimpleWeapon {
    projectile: Sprite;
    constructor(assets: Assets) {
        super('secondary', assets, new Point(1, 1), true,
        {
            onMove: new Point(1, 0),
            pattern: [ 
                { empty: [new Point(1, -1)], target: new Point(2, -2) }, 
                { empty: [new Point(0, 1)], target: new Point(0, 2) }
            ],
            attack: (s,p,t) => this.getAttack(s,p,t)
        });

        this.name = 'Kunai';
        this.projectile = assets.getAsset('projectile_kunai') as Sprite;
        this.description = 'A ranged secondary weapon which attacks enemies forward-left and forward-right of you two spaces away when you move'
    }

    getAttack(state: GameState, player: Player, target: Point): AttackInfo | undefined {
        const e = state.entityAt(target);
        if(e === undefined || Entity.IsPlayer(e)) return undefined;
        return AttackInfo.projectileAttack(player, e, 1, this.projectile);
    }
}