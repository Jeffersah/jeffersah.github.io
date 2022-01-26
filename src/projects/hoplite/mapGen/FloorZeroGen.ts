import GameState from "../GameState";
import IMapGen from "./IMapGen";
import * as C from "../Constants";
import HexCell, { DownStairs, Floor } from "../HexCell";
import HexArray from "../HexArray";
import Assets from "../Assets";
import { GetRing } from "../Hex";
import Lava from "../LavaCell";
import Point from "../../common/position/Point";
import StoneEye from "../entities/StoneEye";

const playerMoveTileArts = [
    new Point(6,2),
    new Point(7,2),
    new Point(9,2),
    new Point(7,3),
    new Point(6,3),
    new Point(8,2),
];

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

        const playerRing = GetRing(1).map(p => Point.add(p, C.PLAYER_START_POSITION));
        for(let i = 0; i < playerRing.length; i++) {
            state.tiles.set(
                new Floor(assets, playerMoveTileArts[i]),
                playerRing[i]
            )
        }


        state.tiles.set(new DownStairs(assets), 2, -4);
    }
}