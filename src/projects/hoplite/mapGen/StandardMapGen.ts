import GameState from "../GameState";
import IMapGen from "./IMapGen";
import * as C from "../Constants";
import HexCell, { DownStairs, Floor } from "../HexCell";
import HexArray from "../HexArray";
import Assets from "../Assets";
import Point from "../../common/position/Point";
import Zombie from "../entities/Zombie";
import Archer from "../entities/Archer";
import Mage from "../entities/Mage";
import Lava from "../LavaCell";
import { AllDirections, DirectionHelper } from "../Direction";
import { AssurePathToEnd } from "./MapGenCommon";

export default class StandardMapGen implements IMapGen {
    generateMap(assets: Assets, floor: number, state: GameState): void {
        state.tiles = new HexArray<HexCell>(C.MAP_SIZE, new Floor(assets));
        state.enemies = [];

        let leftLavaY = Math.floor(Math.random() * (C.MAP_SIZE - 2)) * (Math.random() >= 0.5 ? 1 : -1);
        let leftLavaX = state.tiles.getMinX(leftLavaY);

        this.genLava(assets, state, new Point(leftLavaX, leftLavaY), Math.floor(Math.random() * 20) + 8);

        let rightLavaY = Math.floor(Math.random() * (C.MAP_SIZE - 2)) * (Math.random() >= 0.5 ? 1 : -1);
        let rightLavaX = state.tiles.getXRange(rightLavaY)[1]-1;

        this.genLava(assets, state, new Point(rightLavaX, rightLavaY), Math.floor(Math.random() * 20) + 8);

        const downStairY = -C.MAP_SIZE + 1 + Math.floor(Math.random() * 3);
        const [xMin, xMax] = state.tiles.getXRange(downStairY);
        const downStairX = Math.floor(Math.random() * (xMax - xMin)) + xMin;
        state.tiles.set(new DownStairs(assets), downStairX, downStairY);

        // Replaces lava with floor to ensure there's a path from the start to the end.
        AssurePathToEnd(state, assets);

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

        for(let i = 0; i < Math.min(6, (floor - 2) / 2); i++) {
            let spawnId = Math.floor(Math.random() * validEnemySpawns.length);
            const [pos] = validEnemySpawns.splice(spawnId, 1);
            const archer = new Archer(pos);
            state.enemies.push(archer);
        }
        
        for(let i = 0; i < Math.min(3, (floor - 3) / 3); i++) {
            let spawnId = Math.floor(Math.random() * validEnemySpawns.length);
            const [pos] = validEnemySpawns.splice(spawnId, 1);
            const mage = new Mage(pos);
            state.enemies.push(mage);
        }
    }

    genLava(assets: Assets, state: GameState, pt: Point, len: number) {
        state.tiles.set(new Lava(assets), pt);
        if(len <= 1) return;

        const validRiverDirections = AllDirections.filter(dir => {
            // Check if this is a valid continuation for the lava river
            const dest = Point.add(pt, DirectionHelper.ToPoint(dir));
            if(!state.tiles.isInBounds(dest.x, dest.y) || state.tiles.get(dest).typeId !== Floor.TypeID || dest.equals(C.PLAYER_START_POSITION)) 
                return false;
            return true;
        });

        if(validRiverDirections.length === 0) return;
        const dir = validRiverDirections[Math.floor(Math.random() * validRiverDirections.length)];
        this.genLava(assets, state, Point.add(pt, DirectionHelper.ToPoint(dir)), len - 1);
    }
}