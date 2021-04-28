import { clearLine } from "readline";
import C from "../EAnchorConnectionFlag";
import ETileAnchor, { TileAnchorHelper } from "../ETileAnchor";
import MapConnections from "./MapConnections";

const EDGE_SIGNAL_OFFSET = 16;

export interface ISignalDefinition {
    dx: number;
    dy: number;
    inputDirs: ETileAnchor[];
    outputDirs: ETileAnchor[];
}

export class MapTileDefinition {
    connections: MapConnections;
    signals: ISignalDefinition[];

    constructor(public tileId: number, packedConnections: number, signalPerInput: boolean = false, public isStop: boolean = false, public isCrossover: boolean = false) {
        this.connections = new MapConnections(packedConnections);
        this.signals = [];
        for(const anchor of TileAnchorHelper.AllAnchors) {
            const output = this.connections.allConnections(anchor);
            if(output.length > 1) {
                // ambiguous, we need a signal here
                let tgtSignal: ISignalDefinition;
                if(signalPerInput || this.signals.length === 0) {
                    tgtSignal = { ...getSignalOffset(signalPerInput, anchor), inputDirs: [], outputDirs: [] };
                    this.signals.push(tgtSignal);
                }
                else {
                    tgtSignal = this.signals[0];
                }

                tgtSignal.inputDirs.push(anchor);
                for(const outDir of output) {
                    tgtSignal.outputDirs.push(outDir)
                }

            }
        }
    }
}

function getSignalOffset(signalPerInput: boolean, anchor: ETileAnchor): {dx: number, dy: number} {
    if(!signalPerInput) return { dx: 0, dy: 0 };
    const pos = TileAnchorHelper.AnchorToTileMove(anchor).MultWith(EDGE_SIGNAL_OFFSET);
    return {dx: pos.x, dy: pos.y };
}


const allMapTileDefinitions: MapTileDefinition[] = [
    null,
    new MapTileDefinition(1, C.TB),
    new MapTileDefinition(2, C.LR),
    new MapTileDefinition(3, C.TB|C.LR, false, false, true),

    new MapTileDefinition(4, C.RT),
    new MapTileDefinition(5, C.RB),
    new MapTileDefinition(6, C.LB),
    new MapTileDefinition(7, C.LT),

    new MapTileDefinition(8, C.RT|C.RB, true),
    new MapTileDefinition(9, C.RB|C.LB, true),
    new MapTileDefinition(10, C.LT|C.LB, true),
    new MapTileDefinition(11, C.LT|C.RT, true),

    new MapTileDefinition(12, C.RT|C.RB|C.TB),
    new MapTileDefinition(13, C.RB|C.LB|C.LR),
    new MapTileDefinition(14, C.LT|C.LB|C.TB),
    new MapTileDefinition(15, C.LT|C.RT|C.LR),

    new MapTileDefinition(16, 0, false, true),
    new MapTileDefinition(17, 0, false, true),
    new MapTileDefinition(18, 0, false, true),
    new MapTileDefinition(19, 0, false, true),

    new MapTileDefinition(20, C.LT|C.RB),
    new MapTileDefinition(21, C.RT|C.LB),
    new MapTileDefinition(22, C.RB|C.RT|C.LB|C.LT|C.LR|C.TB),
    new MapTileDefinition(23, C.RB|C.RT|C.LB|C.LT, true),

    new MapTileDefinition(24, C.RR),
    new MapTileDefinition(25, C.BB),
    new MapTileDefinition(26, C.LL),
    new MapTileDefinition(27, C.TT),
    
    new MapTileDefinition(28, C.RR|C.TT),
    new MapTileDefinition(29, C.BB|C.RR),
    new MapTileDefinition(30, C.LL|C.BB),
    new MapTileDefinition(31, C.TT|C.LL),
    
    new MapTileDefinition(32, C.RR|C.TT|C.BB),
    new MapTileDefinition(33, C.BB|C.RR|C.LL),
    new MapTileDefinition(34, C.LL|C.BB|C.TT),
    new MapTileDefinition(35, C.TT|C.LL|C.RR),
    
    new MapTileDefinition(36, C.RR|C.LL),
    new MapTileDefinition(37, C.BB|C.TT),
    new MapTileDefinition(38, C.RR|C.LL|C.BB|C.TT),
    null, // Special: The overlay for bridges

    new MapTileDefinition(39, C.RT|C.LL, false, false, true),
    new MapTileDefinition(40, C.RB|C.TT, false, false, true),
    new MapTileDefinition(41, C.LB|C.TT, false, false, true),
    new MapTileDefinition(42, C.LT|C.RR, false, false, true),
    
    new MapTileDefinition(43, C.RT|C.BB, false, false, true),
    new MapTileDefinition(44, C.RB|C.LL, false, false, true),
    new MapTileDefinition(45, C.LB|C.RR, false, false, true),
    new MapTileDefinition(46, C.LT|C.BB, false, false, true),
    
    new MapTileDefinition(47, C.RT|C.LL|C.BB, false, false, true),
    new MapTileDefinition(48, C.RB|C.TT|C.LL, false, false, true),
    new MapTileDefinition(49, C.LB|C.TT|C.RR, false, false, true),
    new MapTileDefinition(50, C.LT|C.RR|C.BB, false, false, true),
];


export default allMapTileDefinitions;