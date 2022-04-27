import { TILE_SIZE } from ".";

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

type ISingleBoundary = number[];
type IBoundaryInfo = ISingleBoundary[]

export function GenerateNeighborInfo(tileCanvas: HTMLCanvasElement, tileCtx: CanvasRenderingContext2D): ITileNeighborInfo[] {
    let tilesWide = tileCanvas.width / TILE_SIZE;
    let tilesTall = tileCanvas.height / (3 * TILE_SIZE); // Image row and two data rows
    let results: ITileNeighborInfo[] = [];
    let boundaryInfo: IBoundaryInfo[] = [];

    const masks = GenerateMasks(tileCtx);
    console.log('MASKS:');
    console.log(masks);

    results.push({ id: 0, neighbors: [[],[],[],[],[],[]] });
    let defaultBoundaryInfo = [];
    for(let i = 0; i < masks.length; i++) {
        defaultBoundaryInfo.push(masks[i].flatMap(p => [0, 0, 0, 0]));
    }
    boundaryInfo.push(defaultBoundaryInfo);


    for(let y = 0; y < tilesTall; y++) {
        for(let x = 0; x < tilesWide; x++){
            if(x === 0 && y === 0) continue; // the 0,0 tile is special

            const boundaryData = tileCtx.getImageData(x * TILE_SIZE, y * TILE_SIZE * 3 + TILE_SIZE, TILE_SIZE, TILE_SIZE * 2);
            const info = GetBoundaryInfo(masks, boundaryData);
            const myNeighbors:number[][] = [[],[],[],[],[],[]];
            const myId: number = results.length;
            
            results.push({ id: myId, neighbors: myNeighbors });
            boundaryInfo.push(info);

            for(let otherId = 0; otherId < results.length; otherId++){
                const otherInfo = boundaryInfo[otherId];
                // Check if we can be a neighbor of another tile
                for(let direction = 0; direction < 4; direction++) {
                    if(BoundariesMatch(info[direction], otherInfo[(direction + 2) % 4])) {
                        results[otherId].neighbors[(direction + 2) % 4].push(myId);
                        myNeighbors[direction].push(otherId);
                    }
                }

                // Can I support on him?
                if(TopBottomBoundariesMatch(info[4], otherInfo[5])) {
                    results[otherId].neighbors[5].push(myId);
                    myNeighbors[4].push(otherId);
                }
                // Can he support me?
                if(TopBottomBoundariesMatch(otherInfo[4], info[5])){
                    results[otherId].neighbors[4].push(myId);
                    myNeighbors[5].push(otherId);
                }
            }
        }
    }
    return results;
}

function BoundariesMatch(t0: ISingleBoundary, t1: ISingleBoundary): boolean{
    if(t0.length !== t1.length) {
        return false;
    }
    for(let i = 0; i < t0.length; i++) {
        if(t0[i] !== t1[i]) {
            return false
        }
    }
    return true;
}

function TopBottomBoundariesMatch(top: ISingleBoundary, bottom: ISingleBoundary){
    if(top.length !== bottom.length) return false;
    for(let i = 0; i < top.length; i += 4) {
        if(bottom[i+3] === 0) // Bottom is transparent, we don't care about the top cell here
            continue;
        else if (top[i+3] === 0) // Bottom is NOT transparent, top is. Fail
            return false;
        for(let j = 0; j < 3; j++) {
            if(top[i+j] !== bottom[i+j]) return false; // Check the RGB values
        }
    }
    return true;
}

function GetBoundaryInfo(masks: number[][], imageData: ImageData): IBoundaryInfo {
    let results: ISingleBoundary[] = [];
    for(let dir = 0; dir < masks.length; dir++) {
        let pixelIndecies = masks[dir];
        let singleResult: number[] = pixelIndecies.flatMap(pi => [
            imageData.data[pi * 4 + 0],
            imageData.data[pi * 4 + 1],
            imageData.data[pi * 4 + 2],
            imageData.data[pi * 4 + 3],
        ]);

        results.push(singleResult);
    }
    return results;
}

function GenerateMasks(tileCtx: CanvasRenderingContext2D): number[][]{
    let frontMask = tileCtx.getImageData(0, TILE_SIZE, TILE_SIZE, TILE_SIZE);
    let rearMask = tileCtx.getImageData(0, TILE_SIZE * 2, TILE_SIZE, TILE_SIZE);

    let frontPix = GetMaskPixelIndecies(frontMask);
    let rearPix = GetMaskPixelIndecies(rearMask);

    let rearOffset = frontMask.width * frontMask.height;

    return [ rearPix.g.map(i => i + rearOffset), rearPix.r.map(i => i + rearOffset), frontPix.g, frontPix.r, frontPix.b, rearPix.b.map(i => i + rearOffset) ];
}
function GetMaskPixelIndecies(mask: ImageData){
    let r: number[] = [];
    let g: number[] = [];
    let b: number[] = [];
    for(let i = 0; i < mask.data.length; i += 4) {
        if(mask.data[i + 3] === 0) {
            continue;
        }
        if(mask.data[i + 0] > 0) {
            r.push(i/4);
        }
        else if(mask.data[i + 1] > 0) {
            g.push(i/4);
        }
        else if (mask.data[i+2] > 0) {
            b.push(i/4);
        }
    }
    return {r, g, b};
}