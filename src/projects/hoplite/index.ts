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
import Floor12Gen from './mapGen/Floor12Gen';
import MouseManager from '../common/input/MouseManager';
import ShopPhase from './phases/ShopPhase';
import WeaponSaleItem from './shopItems/WeaponSaleItem';
import Sword from './weapons/Sword';
import Dagger from './weapons/Dagger';
import Kunai from './weapons/Kunai';

let scaleHelper: NearestNeighborScalingHelper;

export default class HopliteProgram {
    static keys: KeyboardManager;
    static mouse: MouseManager;
    static scaleHelper: NearestNeighborScalingHelper;

    public static run(): (()=>void) {
        let ctx: CanvasRenderingContext2D;
        
        const assetLoader = new AssetLoader();
        const assets = new Assets(assetLoader);

        let state: GameState;
        let currentPhase: IGamePhase = new GameStartAnimationPhase();

        HopliteProgram.keys = new KeyboardManager(document.body);
        assetLoader.onAllFinished(assetLoadDone);
        
        function assetLoadDone() {
            assets.onLoadFinished();
            
            const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
            ctx = canvas.getContext('2d');
            HopliteProgram.mouse = new MouseManager(canvas);
            HopliteProgram.scaleHelper = new NearestNeighborScalingHelper(
                canvas, 
                ctx, 
                C.MAP_PIXEL_SIZE, 
                C.MAP_PIXEL_SIZE, 
                true, 
                () => { return; }
            );

            state = new GameState(assets, C.MAP_SIZE, 0, new FloorZeroGen());

            NearestNeighborScaling(ctx);
            tick();
        }
        
        function tick() {
            HopliteProgram.scaleHelper.TryRescale();
            NearestNeighborScaling(ctx);
            HopliteProgram.mouse.update();

            const nextPhase = currentPhase.tick(state, HopliteProgram.keys, HopliteProgram.mouse);

            ctx.clearRect(0, 0, C.MAP_PIXEL_SIZE, C.MAP_PIXEL_SIZE);
            ctx.fillStyle = '#000000';
            ctx.fillRect(0, 0, C.MAP_PIXEL_SIZE, C.MAP_PIXEL_SIZE);

            currentPhase.draw(ctx, state);

            if(nextPhase !== currentPhase) {
                currentPhase = nextPhase;
                nextPhase.init(state);
            }

            HopliteProgram.keys.update();
            requestAnimationFrame(() => tick());
        }

        return (() => HopliteProgram.scaleHelper.Detatch());
    }
}