import GameState from "../GameState";
import IMapGen from "./IMapGen";
import * as C from "../Constants";
import HexCell from "../tiles/HexCell";
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
import IFeature from "../features/IFeature";
import Stairs from "../features/Stairs";
import LifeGem from "../features/LifeGem";
import Shrine from "../features/Shrine";
import Spider from "../entities/Spider";
import Shop from "../features/Shop";
import ISaleItem from "../shopItems/ISaleItem";
import Sword from "../weapons/Sword";
import Spear from "../weapons/Spear";
import Hammer from "../weapons/Hammer";
import Dagger from "../weapons/Dagger";
import Kunai from "../weapons/Kunai";
import WeaponSaleItem from "../shopItems/WeaponSaleItem";
import FullHealItem from "../shopItems/FullHealItem";

const allPrimaryWeapons = [
    { cost: 50, generateItem: (assets: Assets) => new Sword(assets) },
    { cost: 50, generateItem: (assets: Assets) => new Spear(assets) },
    { cost: 50, generateItem: (assets: Assets) => new Hammer(assets) },
]

const allSecondaryWeapons = [
    { cost: 10, generateItem: (assets: Assets) => new Dagger(assets) },
    { cost: 20, generateItem: (assets: Assets) => new Kunai(assets) },
]

export default class DepthsMapGen implements IMapGen {
    generateMap(assets: Assets, floor: number, state: GameState): void {
        state.tiles = new HexArray<HexCell>(C.MAP_SIZE, new Floor(assets));
        state.features = new HexArray<IFeature>(C.MAP_SIZE, undefined);
        state.regionId = 1;
        
        state.enemies = [];

        let leftLavaY = Math.floor(Math.random() * (C.MAP_SIZE - 2)) * (Math.random() >= 0.5 ? 1 : -1);
        let leftLavaX = state.tiles.getMinX(leftLavaY);

        this.genLava(assets, state, new Point(leftLavaX, leftLavaY), Math.floor(Math.random() * 12) + 4);

        let rightLavaY = Math.floor(Math.random() * (C.MAP_SIZE - 2)) * (Math.random() >= 0.5 ? 1 : -1);
        let rightLavaX = state.tiles.getXRange(rightLavaY)[1]-1;

        this.genLava(assets, state, new Point(rightLavaX, rightLavaY), Math.floor(Math.random() * 12) + 4);

        const downStairY = -C.MAP_SIZE + 1 + Math.floor(Math.random() * 3);
        const [xMin, xMax] = state.tiles.getXRange(downStairY);
        const downStairX = Math.floor(Math.random() * (xMax - xMin)) + xMin;
        state.features.set(new Stairs(), downStairX, downStairY);

        if(floor % 3 === 0 || floor === 11) {
            const shrinePositions = state.getCells((_, tile, feat) => tile.typeId === Floor.TypeID && feat === undefined);
            const shrinePosition = shrinePositions[Math.floor(Math.random() * shrinePositions.length)];
            state.features.set(new Shrine(), shrinePosition.x, shrinePosition.y);
        }
        
        if(floor % 4 === 0 || floor === 11) {
            const shopPositions = state.getCells((_, tile, feat) => tile.typeId === Floor.TypeID && feat === undefined);
            const shopPosition = shopPositions[Math.floor(Math.random() * shopPositions.length)];
            const primary = allPrimaryWeapons[Math.floor(Math.random() * allPrimaryWeapons.length)];
            const secondary = allSecondaryWeapons[Math.floor(Math.random() * allSecondaryWeapons.length)];
            const shopItems: ISaleItem[] = [
                new WeaponSaleItem(primary.generateItem(assets), primary.cost),
                new WeaponSaleItem(secondary.generateItem(assets), secondary.cost),
                new FullHealItem(100, assets)
            ];
            state.features.set(new Shop(shopItems), shopPosition.x, shopPosition.y);
        }

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

        for(let i = 0; i < Math.min(8, floor); i++) {
            let spawnId = Math.floor(Math.random() * validEnemySpawns.length);
            const [pos] = validEnemySpawns.splice(spawnId, 1);
            const entity = (Math.random() < 0.85) ? new Zombie(pos) : new Spider(pos);
            state.enemies.push(entity);
        }
        
        
        // Don't spawn enemies where they can't get to you: Forge a path. (unless they're flying)
        for(const enemy of state.enemies) {
            if(enemy.isFlying) continue;
            AssurePathTo(state, assets, _ => true, (pt)=>pt.equals(enemy.position), 0.3);
        }

        let floorPositions: Point[] = [];
        state.tiles.iterate((x, y, c) => {
            if(c.typeId === Floor.TypeID && state.features.get(x, y) === undefined) {
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