
export interface ITileInfo {
    tile: [number, number];
    edges: number[];

    // If omitted, bottom = edges but 0 => 'any'
    bottom?: (number[]|'any')[];
    // If omitted, top = edges but 2 => 'any'
    top?: (number[]|'any')[];
}

export function getTop(ti: ITileInfo): (number[]|'any')[] {
    return ti.top ?? ti.edges.map(t => t === 2 ? 'any' : [t]);
}

export function getBottom(ti: ITileInfo): (number[]|'any')[] { 
    return ti.bottom ?? ti.edges.map(t => t === 0 ? 'any' : [t]);
}

export function canStack(bottom: (number[]|'any')[], top: (number[]|'any')[]){
    for(let i = 0; i < bottom.length; i++)
    {
        if(bottom[i] === 'any' || top[i] === 'any') continue;
        if(bottom[i].length === 0 || top[i].length === 0) return false;
        if(!hasIntersection(bottom[i] as number[], top[i] as number[])) return false;
    }
    return true;
}

function hasIntersection(a: number[], b: number[]){
    for(let i = 0; i < a.length; i++)
    {
        if(b.indexOf(a[i]) !== -1) return true;
    }
    return false;
}

const TileInfos: ITileInfo[] = [
    { 
        tile: [0, 0],
        edges: [2, 2, 2, 2]
    },
    { 
        tile: [1, 0],
        edges: [1, 0, 1, 0]
    },
    {
        tile: [2, 0],
        edges: [0, 1, 0, 1]
    },/*
    {
        tile: [3, 0],
        edges: [1, 0, 0, 0],
        bottom: [[1, 2], 'any', [1, 2], 'any'],
        top: [[], [], [] , []]
    },
    {
        tile: [4, 0],
        edges: [0, 0, 1, 0],
        bottom: [[1, 2], 'any', [1, 2], 'any'],
        top: [[], [], [] , []]
    },
    {
        tile: [5, 0],
        edges: [0, 1, 0, 0],
        bottom: ['any', [1, 2], 'any', [1, 2]],
        top: [[], [], [] , []]
    },
    {
        tile: [6, 0],
        edges: [0, 0, 0, 1],
        bottom: ['any', [1, 2], 'any', [1, 2]],
        top: [[], [], [] , []]
    },*/
    {
        tile: [7, 0],
        edges: [1, 1, 1, 1]
    },
    {
        tile: [0, 1],
        edges: [1, 1, 0, 1]
    },
    {
        tile: [1, 1],
        edges: [1, 1, 1, 0]
    },
    {
        tile: [2, 1],
        edges: [0, 1, 1, 1]
    },
    {
        tile: [3, 1],
        edges: [1, 0, 1, 1]
    },
    {
        tile: [4, 1],
        edges: [1, 1, 0, 0]
    },
    {
        tile: [5, 1],
        edges: [0, 1, 1, 0]
    },
    {
        tile: [6, 1],
        edges: [0, 0, 1, 1]
    },
    {
        tile: [7, 1],
        edges: [1, 0, 0, 1]
    },
    {
        tile: [0, 2],
        edges: [1, 0, 2, 0]
    },
    {
        tile: [1, 2],
        edges: [0, 1, 0, 2]
    },
    {
        tile: [2, 2],
        edges: [2, 0, 1, 0],
    },
    {
        tile: [3, 2],
        edges: [0, 2, 0, 1],
    },
    { 
        tile: [4, 2],
        edges: [1, 0, 1, 0],
        bottom: [[1,2],[1,2],[1,2],[1,2]],
    },
    {
        tile: [5, 2],
        edges: [0, 1, 0, 1],
        bottom: [[1,2],[1,2],[1,2],[1,2]],
    },
    {
        tile: [5, 3],
        edges: [0, 0, 0, 0]
    },
]


export default TileInfos;