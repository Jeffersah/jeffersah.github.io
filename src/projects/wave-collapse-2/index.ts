import AssetLoader from "../common/assets/AssetLoader";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import { NearestNeighborScaling } from "../common/CanvasHelpers";
import NearestNeighborScalingHelper from "../common/NearestNeighborScalingHelper";
import Rect from "../common/position/Rectangle";
import ITileNeighborInfo, { GenerateNeighborInfo } from "./AdjacencyMap";
import tileUrl from './assets/isoTiles2.png'
import { CreateChunk, GenerateChunk, getPossibilities, isFinalizedCell, PropagateChanges, Step, WaveFunction } from "./Generator";

export const TILE_SIZE = 64;

let spriteSheet: SpriteSheet;

export default function Run() {
    const assetLoader = new AssetLoader();
    spriteSheet = new SpriteSheet(64, 64, tileUrl, assetLoader.registerAssetLoadCallback());

    assetLoader.onAllFinished(() => Start());
}

function Start(){

    const offscreenCanvas = document.createElement('canvas');
    offscreenCanvas.width = spriteSheet.image.width;
    offscreenCanvas.height = spriteSheet.image.height;
    const offscreenCtx = offscreenCanvas.getContext('2d');
    offscreenCtx.drawImage(spriteSheet.image, 0, 0);

    const neighbors = GenerateNeighborInfo(offscreenCanvas, offscreenCtx);
    console.log("Adj Table:");
    console.log(neighbors);


    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    let tiles = CreateChunk(neighbors, 24, 24, 3);

    for(let x = 0; x < tiles.length; x++) {
        for(let z = 0; z < tiles[0][0].length; z++){
            tiles[x][0][z] = 0;
            PropagateChanges(neighbors, tiles, x, 0, z);
            tiles[x][tiles[0].length - 1][z] = 0;
            PropagateChanges(neighbors, tiles, x, tiles[0].length - 1, z);
        }
    }
    
    for(let y = 0; y < tiles[0].length; y++) {
        for(let z = 0; z < tiles[0][0].length; z++){
            tiles[0][y][z] = 0;
            PropagateChanges(neighbors, tiles, 0, y, z);
            tiles[tiles.length-1][y][z] = 0;
            PropagateChanges(neighbors, tiles, tiles.length-1, y, z);
        }
    }

    let scalingHelper = new NearestNeighborScalingHelper(canvas, ctx, 1600, 1200, true, () => Paint(spriteSheet, tiles, ctx));

    tickLoop(neighbors, spriteSheet, tiles, ctx);
}

function tickLoop(neighborInfos: ITileNeighborInfo[], assets: SpriteSheet, cells: WaveFunction, ctx: CanvasRenderingContext2D) {
    Paint(assets, cells, ctx);

    if(!Step(neighborInfos, cells)){
        requestAnimationFrame(() => tickLoop(neighborInfos, assets, cells, ctx));
    }
}


function Paint(assets: SpriteSheet, cells: WaveFunction, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 1600, 1200);

    let origin = [800, 1200];

    for(let z = 0; z < cells[0][0].length; z++){
        // ctx.globalAlpha = 1-(z / cells[0][0].length);
        for(let x = cells.length - 1; x >= 0; x--) {
            for(let y = cells[x].length - 1; y >= 0; y--) {
                let options = getPossibilities(cells[x][y][z]);

                if(options.length <= 8) {
                    if(options.length === 0) continue;

                    ctx.globalAlpha = 1 / options.length;
                    let tx = (x-y) * (TILE_SIZE/2);
                    let ty = -(x+y) * (TILE_SIZE/4) - z*(TILE_SIZE/2);
                    
                    for(const cellId of options) {
                        let cellX = cellId % (spriteSheet.tilesWide);
                        let cellY = Math.floor(cellId / (spriteSheet.tilesWide));

                        let sprite = assets.getSprite(cellX, cellY * 3, TILE_SIZE, TILE_SIZE);

                        sprite.draw(ctx, new Rect(tx + origin[0], ty + origin[1], TILE_SIZE, TILE_SIZE), 0);
                    }
                }
            }
        }
    }
}