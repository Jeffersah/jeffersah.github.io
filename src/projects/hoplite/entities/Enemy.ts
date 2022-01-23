import Point from "../../common/position/Point";
import AttackInfo from "../AttackInfo";
import { SimpleEnemy } from "../Entity";
import GameState from "../GameState";

export default abstract class Enemy extends SimpleEnemy {

    abstract getAttacks(state: GameState): AttackInfo[];
    abstract getMove(state: GameState, attack: AttackInfo[]): Point;
}