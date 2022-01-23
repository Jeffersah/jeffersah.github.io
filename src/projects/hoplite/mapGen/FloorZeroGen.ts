import GameState from "../GameState";
import IMapGen from "./IMapGen";
import * as C from "../Constants";
import HexCell, { DownStairs, Floor } from "../HexCell";
import HexArray from "../HexArray";
import Assets from "../Assets";
import { GetRing } from "../Hex";
import Lava from "../LavaCell";

export default class FloorZeroGen implements IMapGen {
    generateMap(assets: Assets, floor: number, state: GameState): void {
        state.tiles = new HexArray<HexCell>(C.MAP_SIZE, new Floor(assets));

        const ring = GetRing(2);
        for(var i = 0; i < ring.length; i++) {
            state.tiles.set(new Lava(assets), ring[i]);
        }

        const ring2 = GetRing(3);
        for(var i = 0; i < ring2.length; i += 3) {
            state.tiles.set(new Lava(assets), ring2[i]);
        }

        state.tiles.set(new Lava(assets), 0,0);

        state.tiles.set(new DownStairs(assets), 2, -4);
    }
}