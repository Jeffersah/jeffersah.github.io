import GameState from "../GameState";

export default interface IGamePhase {
    tick(state: GameState): IGamePhase;
    draw(ctx: CanvasRenderingContext2D, state: GameState): void;
}