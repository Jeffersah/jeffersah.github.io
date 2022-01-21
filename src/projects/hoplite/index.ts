import AssetLoader from '../common/assets/AssetLoader';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import { NearestNeighborScaling, ResizeCanvas } from '../common/CanvasHelpers';
import NearestNeighborScalingHelper from '../common/NearestNeighborScalingHelper';
import KeyboardManager from '../common/input/KeyboardManager';
import Point from '../common/position/Point';
import { TILES_HIGH } from '../rpgt/Constants';
import * as C from "./Constants";
import Assets from './Assets';
import HexWorld from './HexWorld';

export default function Run(): (()=>void) {
    let ctx: CanvasRenderingContext2D;
    
    let keys: KeyboardManager;
    let scaleHelper: NearestNeighborScalingHelper;
    
    const assetLoader = new AssetLoader();
    const assets = new Assets(assetLoader);

    let world: HexWorld;

    keys = new KeyboardManager(document.body);
    assetLoader.onAllFinished(assetLoadDone);
    
    function assetLoadDone() {
        const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
        ctx = canvas.getContext('2d');
        scaleHelper = new NearestNeighborScalingHelper(
            canvas, 
            ctx, 
            C.MAP_PIXEL_SIZE, 
            C.MAP_PIXEL_SIZE, 
            true, 
            () => { return; }
        );
        world = new HexWorld(C.MAP_SIZE);
        tick();
    }
    
    function tick() {
        NearestNeighborScaling(ctx);
        ctx.clearRect(0, 0, C.MAP_PIXEL_SIZE, C.MAP_PIXEL_SIZE);

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, C.MAP_PIXEL_SIZE, C.MAP_PIXEL_SIZE);

        world.draw(ctx, assets);


        requestAnimationFrame(() => tick());
    }

    return (() => scaleHelper.Detatch());
}
