import Assets from "../Assets";
import GameState from "../GameState";

export default interface IMapGen {
    generateMap(assets: Assets, floor: number, state: GameState): void;
}