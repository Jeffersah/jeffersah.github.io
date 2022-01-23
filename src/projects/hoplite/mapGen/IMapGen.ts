import Assets from "../Assets";
import GameState from "../GameState";
import Floor12Gen from "./Floor12Gen";
import FloorZeroGen from "./FloorZeroGen";
import StandardMapGen from "./StandardMapGen";

export default interface IMapGen {
    generateMap(assets: Assets, floor: number, state: GameState): void;
}

export const MapGenerators: {range: [number, number], gen: IMapGen}[] = [
    {range: [0,1], gen: new FloorZeroGen()},
    {range: [1,12], gen: new StandardMapGen()},
    {range: [12,13], gen: new Floor12Gen()},
    {range: [13,-1], gen: new StandardMapGen()}
]