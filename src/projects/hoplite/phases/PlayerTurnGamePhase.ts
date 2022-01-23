import GameState from "../GameState";
import IGamePhase from "./IGamePhase";

export default class PlayerTurnGamePhase implements IGamePhase {

    tick(state: GameState): IGamePhase {
        return this;
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        state.draw(ctx);
    }

}