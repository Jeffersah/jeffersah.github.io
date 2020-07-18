import * as Const from './Constants';
import AssetLoader from '../common/assets/AssetLoader';
import { NearestNeighborScaling, ResizeCanvas } from '../common/CanvasHelpers';
import NearestNeighborScalingHelper from '../common/NearestNeighborScalingHelper';
import ImageLoader from '../common/assets/ImageLoader';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import baseImgUrl from './assets/MechIndicators.png';
import symbolUrl from './assets/MechSymbols.png';
import Symbol from './Symbol';
import { SYMBOL_LOC } from './Coords';

let ctx: CanvasRenderingContext2D;
let baseImg: ImageLoader;
let symbolSheet: SpriteSheet;

const symbols: Symbol[] = [];

export default function Run() {
    const assetLoader = new AssetLoader();
    baseImg = new ImageLoader(baseImgUrl, assetLoader.registerAssetLoadCallback());
    symbolSheet = new SpriteSheet(6, 6, symbolUrl, assetLoader.registerAssetLoadCallback());
    assetLoader.onAllFinished(assetLoadDone);

    for (const symdef of SYMBOL_LOC) {
        symbols.push(new Symbol(symdef.x, symdef.y, symdef.def));
    }
}

let scaleHelper: NearestNeighborScalingHelper;
export function ForceResizeCheck() {
    if (scaleHelper !== undefined) {
        scaleHelper.Rescale();
    }
}

function assetLoadDone() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d');
    scaleHelper = new NearestNeighborScalingHelper(canvas, ctx, Const.FULL_W, Const.FULL_H, false, repaint);

    canvas.addEventListener('mousedown', mouseEvent => {
        const px = mouseEvent.offsetX / scaleHelper.scaleFactor;
        const py = mouseEvent.offsetY / scaleHelper.scaleFactor;
        for (const sym of symbols) {
            if (px >= sym.x && px <= sym.x + 6 && py >= sym.y && py <= sym.y + 6) {
                sym.Toggle();
                repaint();
                return;
            }
        }
    });

    repaint();
}

function repaint() {
    ctx.clearRect(0, 0, Const.FULL_W, Const.FULL_H);
    NearestNeighborScaling(ctx);
    ctx.fillStyle = '#9eaec7';
    ctx.fillRect(0, 0, Const.FULL_W, Const.FULL_H);
    ctx.drawImage(baseImg.image, 0, 0);

    for (const sym of symbols) {
        sym.Draw(ctx, symbolSheet);
    }
}