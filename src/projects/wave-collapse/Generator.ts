import ITileNeighborInfo, { NeighborDirections } from "./AdjacencyMap";

export type WaveCell = number | number[];
export type WaveFunction = WaveCell[][][];

export function CreateChunk(neighborInfos: ITileNeighborInfo[], xSize: number, ySize: number, zSize: number)
{
    let defaultCell = [];
    for(let i = 0; i < neighborInfos.length; i++) { defaultCell.push(i); }

    let waveFunction: WaveFunction = [];
    for(let x = 0; x < xSize; x++) {
        let plane = [];
        for(let y = 0; y < ySize; y++) {
            let row = [];
            for(let z = 0; z < zSize; z++) {
                row.push([...defaultCell]);
            }
            plane.push(row);
        }
        waveFunction.push(plane);
    }
    return waveFunction;
}

export function GenerateChunk(neighborInfos: ITileNeighborInfo[], xSize: number, ySize: number, zSize: number) {
    let waveFunction = CreateChunk(neighborInfos, xSize, ySize, zSize);

    while(!Step(neighborInfos, waveFunction)){}

    return waveFunction as number[][][];
}

export function Step(neighborInfos: ITileNeighborInfo[], waveFunction: WaveFunction) {
    let minCount = Infinity;
    let minCells: {x: number, y: number, z: number}[] = [];
    for(let x = 0; x < waveFunction.length; x++) {
        for(let y = 0; y < waveFunction[x].length; y++) {
            for(let z = 0; z < waveFunction[x][y].length; z++) {
                if(!isFinalizedCell(waveFunction[x][y][z])){
                    let count = (waveFunction[x][y][z] as number[]).length;
                    if(count < minCount) {
                        minCount = count;
                        minCells = [{x, y, z}];
                    }
                    else if(count === minCount) {
                        minCells.push({x, y, z});
                    }
                }
            }
        }
    }

    if(!isFinite(minCount)) { return true; }

    let chosenIndex = Math.floor(Math.random() * minCells.length);
    let {x, y, z} = minCells[chosenIndex];
    let waveCell = waveFunction[x][y][z];
    let options = getPossibilities(waveCell);
    let chosen = options[Math.floor(Math.random() * options.length)];

    waveFunction[x][y][z] = chosen;

    PropagateChanges(neighborInfos, waveFunction, x, y, z);
    return false;
}

function PropagateChanges(neighborInfos: ITileNeighborInfo[],waveFunction: WaveFunction, x: number, y: number, z: number)
{
    let stack = [{x, y, z}];
    while(stack.length > 0) {
        let {x, y, z} = stack.pop();
        let waveCell = waveFunction[x][y][z];

        for(let directionIndex = 0; directionIndex < 6; directionIndex++) {
            let direction = NeighborDirections[directionIndex];
            if(x + direction.x < 0 || y + direction.y < 0 || z + direction.z < 0 || x + direction.x >= waveFunction.length || y + direction.y >= waveFunction[x].length || z + direction.z >= waveFunction[x][y].length) {
                continue;
            }

            let neighborCell = waveFunction[x + direction.x][y + direction.y][z + direction.z];

            let newNeighbor = tryAdjustNeighbor(neighborInfos, waveCell, neighborCell, directionIndex);
            if(newNeighbor !== null) {
                waveFunction[x + direction.x][y + direction.y][z + direction.z] = newNeighbor;
                stack.push({x: x + direction.x, y: y + direction.y, z: z + direction.z});
            }
        }
    }
}

function tryAdjustNeighbor(neighborInfos: ITileNeighborInfo[], cell: WaveCell, neighbor: WaveCell, direction: number): null | WaveCell {
    if(isFinalizedCell(neighbor)) {
        return null;
    }

    let options: number[] = [];

    getPossibilities(cell).forEach(self => {
        let neighborInfo = neighborInfos[self];
        let results = neighborInfo.neighbors[direction];
        results.forEach(result => {
            if(options.indexOf(result) === -1) options.push(result);
        });
    });

    let other = getPossibilities(neighbor);
    let diff = false;
    for(var i = other.length - 1; i >= 0; i--) {
        if(options.indexOf(other[i]) === -1) {
            other.splice(i, 1);
            diff = true;
        }
    }

    if(diff) {
        if(other.length === 1) {
            return other[0];
        }
        else if(other.length === 0) {
            return options[0];
        }
        else {
            return other;
        }
    }
    else {
        return null;
    }
}


export function getPossibilities(waveCell: WaveCell){
    if(isFinalizedCell(waveCell)) {
        return [waveCell];
    }
    else {
        return waveCell;
    }
}
export function isFinalizedCell(waveCell: WaveCell): waveCell is number {
    return typeof waveCell === 'number';
}