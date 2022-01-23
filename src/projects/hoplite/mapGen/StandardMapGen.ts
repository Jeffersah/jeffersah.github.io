import GameState from "../GameState";
import IMapGen from "./IMapGen";
import * as C from "../Constants";
import HexCell, { DownStairs, Floor } from "../HexCell";
import HexArray from "../HexArray";
import Assets from "../Assets";
import Point from "../../common/position/Point";
import Zombie from "../entities/Zombie";

export default class StandardMapGen implements IMapGen {
    generateMap(assets: Assets, floor: number, state: GameState): void {
        state.tiles = new HexArray<HexCell>(C.MAP_SIZE, new Floor(assets));
        state.enemies = [];

        const downStairY = -C.MAP_SIZE + 1 + Math.floor(Math.random() * 3);
        const [xMin, xMax] = state.tiles.getXRange(downStairY);
        const downStairX = Math.floor(Math.random() * (xMax - xMin)) + xMin;
        state.tiles.set(new DownStairs(assets), downStairX, downStairY);

        let validEnemySpawns: Point[] = [];
        for(let y = -C.MAP_SIZE + 1; y <= 1; y++) {
            const [xMin, xMax] = state.tiles.getXRange(y);
            for(let x = xMin; x < xMax; x++) {
                if(state.tiles.get(x, y).typeId === Floor.TypeID) {
                    validEnemySpawns.push(new Point(x, y));
                }
            }
        }

        for(let i = 0; i < Math.min(12, floor); i++) {
            let spawnId = Math.floor(Math.random() * validEnemySpawns.length);
            const [pos] = validEnemySpawns.splice(spawnId, 1);
            const zombie = new Zombie(pos);
            state.enemies.push(zombie);
        }
    }
}