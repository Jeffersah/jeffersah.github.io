import AssetLoader from "../common/assets/AssetLoader";
import { SpriteAtlas } from "../common/assets/SpriteAtlas";
import { ResizeCanvas } from "../common/CanvasHelpers";
import gridlockTrackUrl from './assets/gridlocktrack.png';
import carUrl from './assets/cars.png';
import GameState from "./GameState";
import levelsJson from './assets/leveldata/levels.json';
import ILevelData from "./ILevelData";
import { Car } from "./Car";

const NUM_INTERP_FRAMES = 20;

export default class Runner {
    ctx: CanvasRenderingContext2D;
    private repaintTimer: number;
    private trackImageAtlas: SpriteAtlas;
    private carImageAtlas: SpriteAtlas;

    private cars: Car[];

    gameState: GameState;
    interpFrameCount: number;

    constructor(public canvas: HTMLCanvasElement) {
        ResizeCanvas(canvas, 800, 600);
        this.ctx = canvas.getContext('2d');
        this.repaintTimer = -1;
        this.interpFrameCount = 0;
    }

    start() {
        const loader = new AssetLoader();
        this.trackImageAtlas = new SpriteAtlas(gridlockTrackUrl, loader.registerAssetLoadCallback());
        this.carImageAtlas = new SpriteAtlas(carUrl, loader.registerAssetLoadCallback());
        loader.onAllFinished(this.loadComplete.bind(this));
    }

    private loadComplete() {
        this.gameState = new GameState((levelsJson as ILevelData[])[0], this.trackImageAtlas, this.carImageAtlas);
        this.gameState.updateCars();
        this.runTick();
    }

    private runTick() {
        this.tick();
        this.draw();
        this.repaintTimer = requestAnimationFrame(this.runTick.bind(this));
    }

    tick() {
        this.interpFrameCount++;
        if(this.interpFrameCount >= NUM_INTERP_FRAMES) {
            this.interpFrameCount = 0;
            this.gameState.updateCars();
        }
    }

    draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.gameState.draw(this.canvas, this.ctx, this.interpFrameCount / NUM_INTERP_FRAMES);
        this.ctx.restore();
    }

    stop() {
        if(this.repaintTimer !== -1) {
            cancelAnimationFrame(this.repaintTimer);
        }
    }
}