import { timeStamp } from "console";
import Point from "../../common/position/Point";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import Player from "../entities/Player";
import Entity from "../Entity";
import GameState from "../GameState";
import SimpleWeapon from "./SimpleWeapon";

export default class Spear extends SimpleWeapon {

    impactAnimation: IRenderableSource;

    constructor(assets: Assets) {
        super('primary', assets, new Point(1, 0), false,
        {
            onMove: new Point(1, 0),
            pattern: [new Point(2, 0)],
            attack: (s,p,t) => this.getAttack(s,p,t)
        });

        this.impactAnimation = assets.getImpactAnimation(1);

        this.name = 'Spear';
        this.description = 'A primary weapon which strikes enemies two spaces away when you step towards them';
    }

    getAttack(state: GameState, player: Player, target: Point): AttackInfo | undefined {
        const e = state.entityAt(target);
        if(e === undefined || Entity.IsPlayer(e)) return undefined;
        return AttackInfo.animationAttack(player, e, 2, this.impactAnimation, true);
    }
}