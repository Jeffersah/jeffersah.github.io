import Point from "../../common/position/Point";
import AttackInfo from "../attackInfos/AttackInfo";
import IAttackInfo from "../attackInfos/IAttackInfo";
import { SimpleEnemy } from "../Entity";
import GameState from "../GameState";

export default abstract class Enemy extends SimpleEnemy {

    lastAttacks: IAttackInfo[];

    abstract getAttacks(state: GameState): IAttackInfo[];
    abstract getMove(state: GameState, attack: IAttackInfo[], disallow: Point[]): Point;
}