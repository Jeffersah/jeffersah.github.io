import Point from "../../common/position/Point";
import IAnimation from "../animation/IAnimation";
import GameState from "../GameState";

export interface IAttackDamageInfo {
    damage: number;
    positions: Point[];
    ignorePlayer?: boolean;
    ignoreEnemies?: boolean;
}
export default interface IAttackInfo {
    getAffectedTiles(state: GameState): IAttackDamageInfo[];
    toAnimations(state: GameState): IAnimation[];
}