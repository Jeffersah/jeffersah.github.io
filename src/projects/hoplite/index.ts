import AssetLoader from '../common/assets/AssetLoader';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import { NearestNeighborScaling, ResizeCanvas } from '../common/CanvasHelpers';
import NearestNeighborScalingHelper from '../common/NearestNeighborScalingHelper';
import KeyboardManager from '../common/input/KeyboardManager';
import Point from '../common/position/Point';
import { TILES_HIGH } from '../rpgt/Constants';
import * as C from "./Constants";
import Assets from './Assets';
import GameState from './GameState';
import StandardMapGen from './mapGen/StandardMapGen';
import EntryAnimationPhase from './phases/EntryAnimationPhase';
import IGamePhase from './phases/IGamePhase';
import GameStartAnimationPhase from './phases/GameStartAnimationPhase';
import FloorZeroGen from './mapGen/FloorZeroGen';
import Zombie from './entities/Zombie';

export default function Run(): (()=>void) {
    let ctx: CanvasRenderingContext2D;
    
    let keys: KeyboardManager;
    let scaleHelper: NearestNeighborScalingHelper;
    
    const assetLoader = new AssetLoader();
    const assets = new Assets(assetLoader);

    let state: GameState;
    let currentPhase: IGamePhase = new GameStartAnimationPhase();

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

        Zombie.onAssetsLoaded(assets);
        state = new GameState(assets, C.MAP_SIZE, 0, new FloorZeroGen());
        NearestNeighborScaling(ctx);
        tick();
    }
    
    function tick() {
        scaleHelper.TryRescale();
        NearestNeighborScaling(ctx);

        const nextPhase = currentPhase.tick(state, keys);

        ctx.clearRect(0, 0, C.MAP_PIXEL_SIZE, C.MAP_PIXEL_SIZE);
        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, C.MAP_PIXEL_SIZE, C.MAP_PIXEL_SIZE);

        currentPhase.draw(ctx, state);

        if(nextPhase !== currentPhase) {
            currentPhase = nextPhase;
            nextPhase.init(state);
        }

        keys.update();
        requestAnimationFrame(() => tick());
    }

    return (() => scaleHelper.Detatch());
}
