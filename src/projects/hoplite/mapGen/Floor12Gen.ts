import GameState from "../GameState";
import IMapGen from "./IMapGen";
import * as C from "../Constants";
import HexCell from "../tiles/HexCell";
import Floor from "../tiles/Floor";
import HexArray from "../HexArray";
import Assets from "../Assets";
import { GetRing } from "../Hex";
import Point from "../../common/position/Point";
import Giant from "../entities/Giant";
import Archer from "../entities/Archer";
import StoneEye from "../entities/StoneEye";
import Lava from "../tiles/Lava";
import IFeature from "../features/IFeature";
import Stairs, { LockedStairs } from "../features/Stairs";
import { RunicLifeGem } from "../features/LifeGem";
import Portal from "../features/Portal";
import MathHelpers from "../../common/MathHelpers";

export default class Floor12Gen implements IMapGen {
    generateMap(assets: Assets, floor: number, state: GameState): void {
        state.tiles = new HexArray<HexCell>(C.MAP_SIZE, new Floor(assets));
        state.features = new HexArray<IFeature>(C.MAP_SIZE, undefined);
        state.features.set(new LockedStairs(), 0, 0);

        const ring = GetRing(4);
        for (let i = 0; i < ring.length/2-1; i++) {
            const floor = i + 1;

            const ringIndex = MathHelpers.wrap((i-4) * 2, ring.length);

            state.features.set(new RunicLifeGem(state.brokenGems[floor] === undefined ? false : state.brokenGems[floor], floor), ring[ringIndex].x, ring[ringIndex].y);
        }

        state.features.set(new Portal(), -2, 4);

        state.tiles.set(new Lava(assets), new Point(5, -1));
        state.tiles.set(new Lava(assets), new Point(5, 0));
        state.tiles.set(new Lava(assets), new Point(4, 1));
        state.tiles.set(new Lava(assets), new Point(-4, -1));
        state.tiles.set(new Lava(assets), new Point(-5, 0));
        state.tiles.set(new Lava(assets), new Point(-5, 1));

        state.enemies.push(new Giant(new Point(0, 0)));
        state.enemies.push(new StoneEye(new Point(0, -2)));
        state.enemies.push(new StoneEye(new Point(2, -2)));
        state.enemies.push(new StoneEye(new Point(2, 0)));
        state.enemies.push(new StoneEye(new Point(-2, 0)));
    }
}