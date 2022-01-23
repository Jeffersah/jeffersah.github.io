import KeyboardManager from "../../common/input/KeyboardManager";
import GameState from "../GameState";

export default interface IGamePhase {
    init(state: GameState):void;
    tick(state: GameState, keys: KeyboardManager): IGamePhase;
    draw(ctx: CanvasRenderingContext2D, state: GameState): void;
}