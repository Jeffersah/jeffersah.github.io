import AssetLoader from '../common/assets/AssetLoader';
import Const from './const';
import NearestNeighborScalingHelper from '../common/NearestNeighborScalingHelper';
import { NearestNeighborScaling } from '../common/CanvasHelpers';

let scalingHelper: NearestNeighborScalingHelper;

export default function Run() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    scalingHelper = new NearestNeighborScalingHelper(canvas, ctx, Const.Width, Const.Height, true, () => { return; });
    NearestNeighborScaling(ctx);
    repaintLoop(canvas, ctx);
}

function repaintLoop(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    repaint(canvas, ctx);
    requestAnimationFrame(() => repaintLoop(canvas, ctx));
}

function repaint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#BBB';
    ctx.globalCompositeOperation = 'multiply';
    ctx.fillRect(0, 0, Const.Width, Const.Height);


    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = '#888';
    for (let y = 0; y < Const.Height; y += 2) {
        let density = y / Const.Height;
        density = density * density;
        for (let x = 0; x < Const.Width; x += 2) {
            if (Math.random() < density) {
                ctx.fillRect(x, y, 2, 2);
            }
        }
    }
}