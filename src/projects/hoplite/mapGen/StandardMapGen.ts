import GameState from "../GameState";
import IMapGen from "./IMapGen";
import * as C from "../Constants";
import HexCell from "../tiles/HexCell";
import DownStairs from "../tiles/DownStairs";
import Floor from "../tiles/Floor";
import HexArray from "../HexArray";
import Assets from "../Assets";
import Point from "../../common/position/Point";
import Zombie from "../entities/Zombie";
import Archer from "../entities/Archer";
import Mage from "../entities/Mage";
import Lava from "../tiles/Lava";
import { AllDirections, DirectionHelper } from "../Direction";
import { AssurePathTo, AssurePathToEnd } from "./MapGenCommon";
import StoneEye from "../entities/StoneEye";
import Trap, { TrapDamage } from "../tiles/Trap";

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
        AssurePathToEnd(state, assets, 1);

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

        for(let i = 0; i < Math.min(6, (floor - 3) / 3); i++) {
            let spawnId = Math.floor(Math.random() * validEnemySpawns.length);
            const [pos] = validEnemySpawns.splice(spawnId, 1);
            const archer = new Archer(pos);
            state.enemies.push(archer);
        }
        
        for(let i = 0; i < Math.min(3, (floor - 4) / 4); i++) {
            let spawnId = Math.floor(Math.random() * validEnemySpawns.length);
            const [pos] = validEnemySpawns.splice(spawnId, 1);
            const enemy = (Math.random() < 0.2) ? new StoneEye(pos) : new Mage(pos);
            state.enemies.push(enemy);
        }
        
        // Don't spawn enemies where they can't get to you: Forge a path. (unless they're flying)
        for(const enemy of state.enemies) {
            if(enemy.isFlying) continue;
            AssurePathTo(state, assets, (pt)=>pt.equals(enemy.position), 0.3);
        }

        let floorPositions: Point[] = [];
        state.tiles.iterate((x, y, c) => {
            if(c.typeId === Floor.TypeID) {
                floorPositions.push(new Point(x, y));
            }
        });

        for(let i = 0; i < 3 + Math.min(3, (floor - 4) / 4); i++) {
            let replaceFloor = floorPositions.splice(Math.floor(Math.random() * floorPositions.length), 1)[0];
            state.tiles.set(new Trap(assets, [1,3,5][Math.floor(Math.random() * 3)] as TrapDamage), replaceFloor.x, replaceFloor.y);
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