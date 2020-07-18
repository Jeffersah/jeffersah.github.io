import * as Const from './Constants';
import AssetLoader from '../common/assets/AssetLoader';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import arrowsUrl from '../common-assets/arrows.png';
import tilesUrl from '../common-assets/rpg1.png';
import wizardUrl from '../common-assets/wizard16.png';
import { NearestNeighborScaling, ResizeCanvas } from '../common/CanvasHelpers';
import NearestNeighborScalingHelper from '../common/NearestNeighborScalingHelper';
import World from './world/World';
import Cell from './world/Cell';
import Rect from '../common/position/Rectangle';
import KeyboardManager from '../common/input/KeyboardManager';
import Point from '../common/position/Point';
import { FileResource } from '../common/assets/FileResource';

const CAMERA_SLOWDOWN_FACTOR = 3;

let assets: {
    tiles: SpriteSheet,
    wizard: SpriteSheet,
    arrows: SpriteSheet,
    tilesets: FileResource<any>
};

let ctx: CanvasRenderingContext2D;

let world: World;

let keys: KeyboardManager;

export default function Run() {
    const assetLoader = new AssetLoader();
    assets = {
        tiles: new SpriteSheet(16, 16, tilesUrl, assetLoader.registerAssetLoadCallback()),
        wizard: new SpriteSheet(16, 16, wizardUrl, assetLoader.registerAssetLoadCallback()),
        arrows: new SpriteSheet(16, 16, arrowsUrl, assetLoader.registerAssetLoadCallback()),
        tilesets: new FileResource('../dist/assets/rpgtest/tilesets.json', assetLoader.registerAssetLoadCallback()),
    };
    keys = new KeyboardManager(document.body);
    assetLoader.onAllFinished(assetLoadDone);
}

function assetLoadDone() {
    world = new World(Const.TILES_WIDE * 2, Const.TILES_HIGH * 2, () => {
        if (Math.random() <= 0.15) {
            return Cell.RockWall(assets.tiles);
        }
        else {
            return Cell.GrassFloor(assets.tiles);
        }
    });
    world.updatePrerender();
    const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
    ctx = canvas.getContext('2d');
    const scaleHelper = new NearestNeighborScalingHelper(canvas, ctx, Const.TILE_SIZE * Const.TILES_WIDE, Const.TILE_SIZE * Const.TILES_HIGH, true, () => { return; });
    tick();
}

const camPos = new Point(0, 0);
const playerPos = new Rect(0, 0, 14, 14);
let toggle = false;
function tick() {
    ctx.clearRect(0, 0, Const.TILES_WIDE * Const.TILE_SIZE, Const.TILES_HIGH * Const.TILE_SIZE);
    NearestNeighborScaling(ctx);
    ctx.save();
    let cx = 0;
    let cy = 0;
    if (world.width > Const.TILES_WIDE) {
        cx = Math.max(0, Math.min((world.width - Const.TILES_WIDE) * Const.TILE_SIZE, playerPos.x - (Const.TILE_SIZE * Const.TILES_WIDE / 2)));
    }
    if (world.height > Const.TILES_HIGH) {
        cy = Math.max(0, Math.min((world.height - Const.TILES_HIGH) * Const.TILE_SIZE, playerPos.y - (Const.TILE_SIZE * Const.TILES_HIGH / 2)));
    }

    camPos.MultWith(CAMERA_SLOWDOWN_FACTOR, CAMERA_SLOWDOWN_FACTOR)
          .AddWith(cx, cy)
          .DivideWith(CAMERA_SLOWDOWN_FACTOR + 1, CAMERA_SLOWDOWN_FACTOR + 1);

    ctx.translate(-camPos.x, -camPos.y);
    ctx.drawImage(world.prerender, 0, 0);
    keys.update();

    ctx.fillStyle = 'blue';
    ctx.fillRect(playerPos.x, playerPos.y, playerPos.w, playerPos.h);
    const vel = new Point(0, 0);
    if (keys.isKeyDown('a')) {
        vel.x = -3;
    }
    if (keys.isKeyDown('d')) {
        vel.x = 3;
    }
    if (keys.isKeyDown('w')) {
        vel.y = -3;
    }
    if (keys.isKeyDown('s')) {
        vel.y = 3;
    }
    ctx.fillStyle = 'yellow';
    ctx.globalAlpha = 0.6;
    world.tryMoveEntity(playerPos, vel, (tx, ty) => {
        ctx.fillRect(tx * Const.TILE_SIZE, ty * Const.TILE_SIZE, Const.TILE_SIZE, Const.TILE_SIZE);
    });
    ctx.globalAlpha = 1;

    toggle = !toggle;
    if (toggle) {
        ctx.fillStyle = 'white';
        ctx.fillRect(0, 0, 10, 10);
    }
    ctx.restore();
    requestAnimationFrame(() => tick());
}