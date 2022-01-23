import KeyboardManager from "../../common/input/KeyboardManager";
import Point from "../../common/position/Point";
import AttackInfo from "../AttackInfo";
import { Direction, DirectionHelper } from "../Direction";
import Entity from "../Entity";
import GameState from "../GameState";
import AttackAnimationPhase from "./AttackAnimationPhase";
import IGamePhase from "./IGamePhase";
import PlayerMoveAnimPhase from "./PlayerMoveAnimPhase";
import PlayerTurnGamePhase from "./PlayerTurnGamePhase";

const duration = 20;
export default class EnemyMovePhase implements IGamePhase {

    timer = 0;
    enemyMoves: {entity: Entity, from: Point, to: Point}[];
    constructor(private enemyAttacks: AttackInfo[][]) {

    }

    init(state: GameState): void {
        this.enemyMoves = [];
        for(let i = 0; i < state.enemies.length; i++) { 
            this.enemyMoves[i] = {
                entity: state.enemies[i],
                from: state.enemies[i].position,
                to: state.enemies[i].getMove(state, this.enemyAttacks[i])
            };
        }
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        if(this.timer >= duration) { return new PlayerTurnGamePhase(); }
        else {
            this.timer++;
        }

        return this;
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        const p = this.timer / duration;
        for(let i = 0; i < this.enemyMoves.length; i++) {
            this.enemyMoves[i].entity.position = Point.interpolate(this.enemyMoves[i].from, this.enemyMoves[i].to, p);
        }
        state.draw(ctx);
    }

}