import { canStack, getBottom, getTop, ITileInfo } from "./assets/TileInfo";

export default interface ITileNeighborInfo {
    id: number,
    // x+, y+, x-, y-, z+, z-
    neighbors: number[][],
}

export const NeighborDirections = [
    { x: 1, y: 0, z: 0 },
    { x: 0, y: 1, z: 0 },
    { x: -1, y: 0, z: 0 },
    { x: 0, y: -1, z: 0 },
    { x: 0, y: 0, z: 1 },
    { x: 0, y: 0, z: -1 },
]

export function GenerateNeighborInfo(tiles: ITileInfo[]) {
    const result: ITileNeighborInfo[] = [];
    tiles.forEach(tile => {
        let neighborInfo: ITileNeighborInfo = {
            id: result.length,
            neighbors: [[], [], [], [], [], []],
        };

        for(let otherId = 0; otherId < tiles.length; otherId++){
            let otherTile = tiles[otherId];
            for(let dir = 0; dir < 4; dir++) {
                if(otherTile.edges[(dir + 2)%4] === tile.edges[dir])
                {
                    neighborInfo.neighbors[dir].push(otherId);
                }
            }
            if(canStack(getTop(otherTile), getBottom(tile))) {
                neighborInfo.neighbors[4].push(otherId);
            }
            
            if(canStack(getTop(tile), getBottom(otherTile))) {
                neighborInfo.neighbors[5].push(otherId);
            }
        }

        for(var i = 0; i < neighborInfo.neighbors.length; i++){
            neighborInfo.neighbors[i].sort((a, b) => a - b);
        }
        result.push(neighborInfo);
    });

    return result;
}