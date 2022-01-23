import KeyboardManager from "../../common/input/KeyboardManager";
import Point from "../../common/position/Point";
import AttackInfo from "../AttackInfo";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import AttackAnimationPhase from "./AttackAnimationPhase";
import EnemyMovePhase from "./EnemyMovePhase";
import IGamePhase from "./IGamePhase";
import PlayerMoveAnimPhase from "./PlayerMoveAnimPhase";
import PlayerTurnGamePhase from "./PlayerTurnGamePhase";


export default class EnemyAttackPhase implements IGamePhase {

    enemyAttacks: AttackInfo[][];

    init(state: GameState): void {
        this.enemyAttacks = state.enemies.map(enemy => enemy.getAttacks(state));
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        if(this.enemyAttacks.some(e => e.length > 0)) {
            return new AttackAnimationPhase(this.enemyAttacks.reduce((a,b) => a.concat(b), []), 
            () => new EnemyMovePhase(this.enemyAttacks));
        }
        else{
            return new EnemyMovePhase(this.enemyAttacks);
        }
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        state.draw(ctx);
    }

}