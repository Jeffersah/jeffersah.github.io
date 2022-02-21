import DjikstraPath from "../DjikstraPath";
import GameState from "../GameState";
import * as C from "../Constants";
import Floor from "../tiles/Floor";
import Point from "../../common/position/Point";
import { AllDirections, DirectionHelper } from "../Direction";
import Assets from "../Assets";
import HexCell from "../tiles/HexCell";

export function AssurePathTo(state: GameState, assets: Assets, predicate:(pt: Point, tile: HexCell)=>boolean, checkEnd: (isValidEnd: Point) => boolean, pathLengthNoise?: number) {
    function getNeighbors(point: Point):{to: Point, cost: number}[] {
        const neighbors = [];
        for(const dir of AllDirections) {
            const destPt = Point.add(point, DirectionHelper.ToPoint(dir));
            if(state.tiles.isInBounds(destPt.x, destPt.y) && predicate(destPt, state.tiles.get(destPt))) {
                neighbors.push({to: destPt, cost: state.tiles.get(destPt).isPathable ? 1 - (Math.random() * (pathLengthNoise??0)) : 99 });
            }
        }
        return neighbors;
    }

    const pathToEnd = DjikstraPath(C.PLAYER_START_POSITION, checkEnd, getNeighbors);
    for(const pt of pathToEnd) {
        if(!state.tiles.get(pt).isPathable) {
            state.tiles.set(new Floor(assets), pt);
        }
    }
}

export function AssurePathToEnd(state: GameState, assets: Assets, pathLengthNoise?: number) {
    return AssurePathTo(state, assets, pt => state.features.get(pt)?.name !== 'LifeGem', (pt) => state.features.get(pt)?.name === 'Stairs', pathLengthNoise);
}