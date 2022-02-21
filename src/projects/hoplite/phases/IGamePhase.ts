import KeyboardManager from "../../common/input/KeyboardManager";
import MouseManager from "../../common/input/MouseManager";
import GameState from "../GameState";

export default interface IGamePhase {
    init(state: GameState):void;
    tick(state: GameState, keys: KeyboardManager, mouse: MouseManager): IGamePhase;
    draw(ctx: CanvasRenderingContext2D, state: GameState): void;
}