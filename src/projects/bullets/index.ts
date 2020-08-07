import AssetLoader from '../common/assets/AssetLoader';
import Const from './const';
import NearestNeighborScalingHelper from '../common/NearestNeighborScalingHelper';
import { NearestNeighborScaling, RotTransformCanvas } from '../common/CanvasHelpers';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import entitySheetUrl from './assets/bullets_entities.png';
import playerUrl from './assets/bullets_ship.png';
import ImageLoader from '../common/assets/ImageLoader';
import Player from './Player';
import KeyboardManager from '../common/input/KeyboardManager';
import KeyState from '../common/input/KeyState';
import Point from '../common/position/Point';

let scalingHelper: NearestNeighborScalingHelper;

export default function Run() {
    const assetLoader = new AssetLoader();
    const entitySheet = new SpriteSheet(8, 16, entitySheetUrl, assetLoader.registerAssetLoadCallback());

    assetLoader.onAllFinished(() => onLoadDone(entitySheet));
}

function onLoadDone(entitySheet: SpriteSheet) {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d');
    scalingHelper = new NearestNeighborScalingHelper(canvas, ctx, Const.Width, Const.Height, true, () => { return; });
    NearestNeighborScaling(ctx);

    const keys = new KeyboardManager(document.body, false);
    const player = new Player(entitySheet);

    repaintLoop(player, keys, canvas, ctx);
}

function repaintLoop(player: Player, keys: KeyboardManager, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    keys.update();
    player.tick(keys);
    repaint(player, canvas, ctx);
    requestAnimationFrame(() => repaintLoop(player, keys, canvas, ctx));
}

function repaint(player: Player, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    NearestNeighborScaling(ctx);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, Const.Width, Const.Height);
    ctx.save();

    const focusPoint = Point.Add(player.position, Point.Multiply(player.velocity, 10));

    ctx.translate(-(focusPoint.x - Const.Width / 2), -(focusPoint.y - Const.Height / 2));
    ctx.fillStyle = 'gray';

    const bg_line_size = 400;

    // Render some bg lines so we can see motion
    for (let ty = Math.floor((focusPoint.y - Const.Height / 2) / bg_line_size) * bg_line_size; ty <= Math.floor((focusPoint.y + Const.Height / 2) / bg_line_size) * bg_line_size; ty += bg_line_size) {
        ctx.fillRect(focusPoint.x - Const.Width / 2, ty, Const.Width, 3);
    }

    for (let tx = Math.floor((focusPoint.x - Const.Width / 2) / bg_line_size) * bg_line_size; tx <= Math.floor((focusPoint.x + Const.Width / 2) / bg_line_size) * bg_line_size; tx += bg_line_size) {
        ctx.fillRect(tx, focusPoint.y - Const.Height / 2, 3, Const.Height);
    }

    player.render(ctx);
    ctx.restore();
}