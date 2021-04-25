import { Direction, ECardinalDirection } from "../../common/position/Direction";
import C from "../EAnchorConnectionFlag";
import MapConnections from "./MapConnections";

export class MapTile {
    connections: MapConnections;

    constructor(public tileId: number, packedConnections: number, public isStop: boolean = false) {
        this.connections = new MapConnections(packedConnections);
    }
}


const allMapTiles: MapTile[] = [
    null,
    new MapTile(1, C.TB),
    new MapTile(2, C.LR),
    new MapTile(3, C.TB|C.LR),

    new MapTile(4, C.RT),
    new MapTile(5, C.RB),
    new MapTile(6, C.LB),
    new MapTile(7, C.LT),

    new MapTile(8, C.RT|C.RB),
    new MapTile(9, C.RB|C.LB),
    new MapTile(10, C.LT|C.LB),
    new MapTile(11, C.LT|C.RT),

    new MapTile(12, C.RT|C.RB|C.TB),
    new MapTile(13, C.RB|C.LB|C.LR),
    new MapTile(14, C.LT|C.LB|C.TB),
    new MapTile(15, C.LT|C.RT|C.LR),

    new MapTile(16, C.RR, true),
    new MapTile(17, C.BB, true),
    new MapTile(18, C.LL, true),
    new MapTile(19, C.TT, true),

    new MapTile(20, C.LT|C.RB),
    new MapTile(21, C.RT|C.LB),
    new MapTile(22, C.RB|C.RT|C.LB|C.LT|C.LR|C.TB),
    new MapTile(23, C.RB|C.RT|C.LB|C.LT),

    new MapTile(24, C.RR),
    new MapTile(25, C.BB),
    new MapTile(26, C.LL),
    new MapTile(27, C.TT),
    
    new MapTile(28, C.RR|C.TT),
    new MapTile(29, C.BB|C.RR),
    new MapTile(30, C.LL|C.BB),
    new MapTile(31, C.TT|C.LL),
    
    new MapTile(32, C.RR|C.TT|C.BB),
    new MapTile(33, C.BB|C.RR|C.LL),
    new MapTile(34, C.LL|C.BB|C.TT),
    new MapTile(35, C.TT|C.LL|C.RR),
    
    new MapTile(36, C.RR|C.LL),
    new MapTile(37, C.BB|C.TT),
    new MapTile(38, C.RR|C.LL|C.BB|C.TT),
    null,
];


export default allMapTiles;