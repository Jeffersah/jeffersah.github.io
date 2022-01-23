import KeyboardManager from "../../common/input/KeyboardManager";
import Point from "../../common/position/Point";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import IGamePhase from "./IGamePhase";
import PlayerMoveAnimPhase from "./PlayerMoveAnimPhase";
import PlayerTurnGamePhase from "./PlayerTurnGamePhase";


export default class EnemyTurnPhase implements IGamePhase {
    init(state: GameState): void {
        
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        return new PlayerTurnGamePhase();
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        state.draw(ctx);
    }

}