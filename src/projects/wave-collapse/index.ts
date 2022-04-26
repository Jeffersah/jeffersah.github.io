import AssetLoader from "../common/assets/AssetLoader";
import { SpriteSheet } from "../common/assets/SpriteSheet";
import { NearestNeighborScaling } from "../common/CanvasHelpers";
import NearestNeighborScalingHelper from "../common/NearestNeighborScalingHelper";
import Rect from "../common/position/Rectangle";
import ITileNeighborInfo, { GenerateNeighborInfo } from "./AdjacencyMap";
import tileUrl from './assets/isotiles.png'
import TileInfos, { ITileInfo } from "./assets/TileInfo";
import { CreateChunk, GenerateChunk, getPossibilities, isFinalizedCell, Step, WaveFunction } from "./Generator";

let spriteSheet: SpriteSheet;

export default function Run() {
    const assetLoader = new AssetLoader();
    spriteSheet = new SpriteSheet(32, 32, tileUrl, assetLoader.registerAssetLoadCallback());

    assetLoader.onAllFinished(() => Start());
}

function Start(){
    const neighbors = GenerateNeighborInfo(TileInfos);

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');

    let tiles = CreateChunk(neighbors, 40, 40, 1);


    let scalingHelper = new NearestNeighborScalingHelper(canvas, ctx, 1200, 800, true, () => Paint(TileInfos, spriteSheet, tiles, ctx));

    tickLoop(TileInfos, neighbors, spriteSheet, tiles, ctx);
}

function tickLoop(tileInfos: ITileInfo[], neighborInfos: ITileNeighborInfo[], assets: SpriteSheet, cells: WaveFunction, ctx: CanvasRenderingContext2D) {
    Paint(tileInfos, assets, cells, ctx);

    if(!Step(neighborInfos, cells)){
        requestAnimationFrame(() => tickLoop(tileInfos, neighborInfos, assets, cells, ctx));
    }
}


function Paint(tileInfos: ITileInfo[], assets: SpriteSheet, cells: WaveFunction, ctx: CanvasRenderingContext2D) {
    ctx.clearRect(0, 0, 1200, 800);

    let origin = [600, 800];

    for(let z = 0; z < cells[0][0].length; z++){
        // ctx.globalAlpha = 1-(z / cells[0][0].length);
        for(let x = cells.length - 1; x >= 0; x--) {
            for(let y = cells[x].length - 1; y >= 0; y--) {
                let options = getPossibilities(cells[x][y][z]);

                if(options.length <= 12) {
                    if(options.length === 0) continue;

                    ctx.globalAlpha = 1 / options.length;
                    let tx = (x-y) * 16;
                    let ty = -(x+y) * 8 - z*16;
                    
                    for(const cell of options) {
                        let tileInfo = tileInfos[cell];
                        let sprite = assets.getSprite(tileInfo.tile[0], tileInfo.tile[1], 32, 32);

                        sprite.draw(ctx, new Rect(tx + origin[0], ty + origin[1], 32, 32), 0);
                    }
                }
            }
        }
    }
}