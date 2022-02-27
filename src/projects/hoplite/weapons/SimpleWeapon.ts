import Point from "../../common/position/Point";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import Player from "../entities/Player";
import GameState from "../GameState";
import { HexLength, TurnLeft, TurnRight } from "../Hex";
import PlayerWeapon from "./PlayerWeapon";

interface ISimpleAttack { onMove: Point, pattern: WeaponPattern[], attack: (state: GameState, player:Player, target: Point) => AttackInfo | undefined}

type WeaponPattern = Point | { empty: Point[], target: Point };

function patternIsPoint(pattern: WeaponPattern): pattern is Point {
    return (pattern as Point).x !== undefined;
}

export default class SimpleWeapon extends PlayerWeapon{
    private attacks: ISimpleAttack[];
    constructor(type: 'primary'|'secondary', assets: Assets, artTile: Point, private beforeMove: boolean, ...simpleAttacks: ISimpleAttack[]) {
        super(type, assets, artTile);
        this.attacks = simpleAttacks;
    }

    private getAttacks(state:GameState, player: Player, moveFrom: Point, moveTo: Point): AttackInfo[] {
        const attacks: AttackInfo[] = [];
        const moveDelta = Point.subtract(moveTo, moveFrom);
        for(const attack of this.attacks) {
            if(HexLength(moveDelta) !== HexLength(attack.onMove)) continue;
            const rot = SimpleWeapon.getRotation(moveDelta, attack.onMove);
            if(rot === undefined) continue;
            for(const pattern of attack.pattern) {
                const requireEmpty = patternIsPoint(pattern) ? [] : pattern.empty;

                const target = Point.add(moveFrom, TurnLeft(patternIsPoint(pattern) ? pattern : pattern.target, rot));
                const isEmptyRequirementFulfilled = requireEmpty.every(p => state.entityAt(Point.add(moveFrom, TurnLeft(p, rot))) === undefined);
                if(requireEmpty.length === 0 || isEmptyRequirementFulfilled) {
                    const attackInfo = attack.attack(state, player, target);
                    if(attackInfo !== undefined) attacks.push(attackInfo);
                }
            }
        }
        return attacks;
    }

    override enableAdditionalMoves(state: GameState, player: Player): {dest: Point, forceMove: Point}[] {
        return [];
    }

    getBeforeMoveAttacks(state: GameState, player: Player, moveFrom: Point, moveTo: Point): AttackInfo[] {
        if(this.beforeMove) return this.getAttacks(state, player, moveFrom, moveTo);
        return [];
    }
    
    getAfterMoveAttacks(state: GameState, player: Player, moveFrom: Point, moveTo: Point): AttackInfo[] {
        if(this.beforeMove) return [];
        return this.getAttacks(state, player, moveFrom, moveTo);
    }

    static getRotation(delta: Point, target: Point) {
        for(let i = 0; i < 6; i++) {
            if(delta.equals(target)) return i;
            delta = TurnRight(delta);
        }
        return undefined;
    }

}