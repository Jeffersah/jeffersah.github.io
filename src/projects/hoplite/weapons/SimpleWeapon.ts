import Point from "../../common/position/Point";
import Assets from "../Assets";
import AttackInfo from "../AttackInfo";
import Player from "../entities/Player";
import GameState from "../GameState";
import { HexLength, TurnLeft, TurnRight } from "../Hex";
import PlayerWeapon from "./PlayerWeapon";

interface ISimpleAttack { onMove: Point, pattern: Point[], attack: (state: GameState, player:Player, target: Point) => AttackInfo | undefined}

export default class SimpleWeapon extends PlayerWeapon{
    private attacks: ISimpleAttack[];
    constructor(type: 'primary'|'secondary', assets: Assets, artTile: Point, ...attacks: ISimpleAttack[]) {
        super(type, assets, artTile);
        this.attacks = attacks;
    }


    getAttacks(state: GameState, player: Player, moveFrom: Point, moveTo: Point): AttackInfo[] {
        const attacks: AttackInfo[] = [];
        const moveDelta = Point.subtract(moveTo, moveFrom);
        for(const attack of this.attacks) {
            if(HexLength(moveDelta) !== HexLength(attack.onMove)) continue;
            const rot = this.getRotation(moveDelta, attack.onMove);
            if(rot === undefined) continue;
            for(const pattern of attack.pattern) {
                const target = Point.add(moveFrom, TurnLeft(pattern, rot));
                const attackInfo = attack.attack(state, player, target);
                if(attackInfo !== undefined) attacks.push(attackInfo);
            }
        }
        return attacks;
    }

    getRotation(delta: Point, target: Point) {
        for(let i = 0; i < 6; i++) {
            if(delta.equals(target)) return i;
            delta = TurnRight(delta);
        }
        return undefined;
    }

}