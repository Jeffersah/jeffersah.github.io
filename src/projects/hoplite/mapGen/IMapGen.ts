import GameState from "../GameState";

export default interface IMapGen {
    generateMap(floor: number, state: GameState): void;
}