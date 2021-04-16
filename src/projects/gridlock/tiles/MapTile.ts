import { Direction, ECardinalDirection } from "../../common/position/Direction";
import MapConnections from "./MapConnections";

export class MapTile {
    connections: MapConnections;

    constructor(public tileId: number, packedConnections: number) {
        this.connections = new MapConnections(packedConnections);
    }
}

const RB = 1 << 0;
const LR = 1 << 1;
const RT = 1 << 2;
const RC = 1 << 3;
const LB = 1 << 4;

const TB = 1 << 5;
const BC = 1 << 6;
const LT = 1 << 7;
const LC = 1 << 8;
const TC = 1 << 9;


const allMapTiles: MapTile[] = [
    null,                  // 0:  No tile
    new MapTile(1, TB), // 1:  Vert
    new MapTile(2, LR), // 2:  Horz
    new MapTile(3, TB|LR), // 3:  3D Cross
    new MapTile(4, LT|RB), // 4:  TL/BR turn
    new MapTile(5, RT|LB), // 5:  TR/BL turn
    new MapTile(6, RT), // 6:  TR turn
    new MapTile(7, RB), // 7:  BR turn
    new MapTile(8, LB), // 8:  BL turn
    new MapTile(9, LT), // 9:  TL turn
    new MapTile(10, RB|RT|LB|LT|LR|TB), // 10: Full Intersection
    new MapTile(11, RB|RT|LB|LT), // 11: Full Turn Intersection
    new MapTile(12, RT|RB), // 12: R T Turn Intersection
    new MapTile(13, RB|LB), // 13: B T Turn Intersection
    new MapTile(14, LT|LB), // 14: L T Turn Intersection
    new MapTile(15, LT|RT), // 15: U T Turn Intersection
    null,                  // 16: Unused
    null,                  // 17: Unused
    new MapTile(18, RT|RB|TB), // 18: R T Intersection
    new MapTile(19, RB|LB|LR), // 19: B T Intersection
    new MapTile(20, LT|LB|TB), // 20: L T Intersection
    new MapTile(21, LT|RT|LR), // 21: U T Intersection
    null,                  // 22: Unused
    null,                  // 23: Unused
    new MapTile(24, RC), // 24: R Stop
    new MapTile(25, BC),  // 25: B Stop
    new MapTile(26, LC),  // 26: L Stop
    new MapTile(27, TC),    // 27: U Stop
    null,                  // 28: Unused
    null,                  // 29: Unused
    // 6 more unused
];


export default allMapTiles;