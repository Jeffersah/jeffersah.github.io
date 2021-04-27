import DirectionHelper from "../DirectionHelper";
import ETileAnchor, { TileAnchorHelper } from "../ETileAnchor";

export default class MapConnections {
    private connections: boolean[][];

    constructor(packed: number) {
        
        this.connections = [];
        for(let dir = 0; dir < 4; dir++) {
            const connectionArr = [];
            for(let to = dir; to < 4; to++) {
                connectionArr.push((packed & 1) > 0);
                packed >>= 1;
            }
            this.connections.push(connectionArr);
        }

    }

    public connection(from: ETileAnchor, to: ETileAnchor): boolean;
    public connection(from: ETileAnchor, to: ETileAnchor, value: boolean): void;
    public connection(from: ETileAnchor, to: ETileAnchor, value?: boolean): void|boolean {
        const fromIndex = TileAnchorHelper.AnchorToIndex(from);
        const toIndex = TileAnchorHelper.AnchorToIndex(to);
        const minIndex = Math.min(fromIndex, toIndex);
        const maxIndex = Math.max(fromIndex, toIndex);
        if (value === undefined) {
            return this.connections[minIndex][maxIndex-minIndex];
        }
        else {
            this.connections[minIndex][maxIndex-minIndex] = value;
        }

    }

    public allConnections(from: ETileAnchor): ETileAnchor[] {
        let output = [];
        for(const to of TileAnchorHelper.AllAnchors) {
            if(this.connection(from, to)) {
                output.push(to);
            }
        }
        return output;
    }
}