import GameState from "../GameState";
import IMapGen from "./IMapGen";
import * as C from "../Constants";
import HexCell, { Floor } from "../HexCell";
import HexArray from "../HexArray";
import Assets from "../Assets";

export default class StandardMapGen implements IMapGen {
    generateMap(assets: Assets, floor: number, state: GameState): void {
        state.tiles = new HexArray<HexCell>(C.MAP_SIZE, new Floor(assets));

        const downStairY = -C.MAP_SIZE + 1 + Math.floor(Math.random() * 3);
        const [xMin, xMax] = state.tiles.getXRange(downStairY);
    }
}