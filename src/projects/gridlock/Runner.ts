import AssetLoader from "../common/assets/AssetLoader";
import { SpriteAtlas } from "../common/assets/SpriteAtlas";
import { ResizeCanvas } from "../common/CanvasHelpers";
import gridlockTrackUrl from './assets/gridlocktrack.png';
import carUrl from './assets/cars.png';

export default class Runner {
    ctx: CanvasRenderingContext2D;
    private repaintTimer: number;
    private trackImageAtlas: SpriteAtlas;
    private carImageAtlas: SpriteAtlas;

    constructor(public canvas: HTMLCanvasElement) {
        ResizeCanvas(canvas, 800, 600);
        this.ctx = canvas.getContext('2d');
        this.repaintTimer = -1;

    }

    start() {
        const loader = new AssetLoader();
        this.trackImageAtlas = new SpriteAtlas(gridlockTrackUrl, loader.registerAssetLoadCallback());
        this.carImageAtlas = new SpriteAtlas(carUrl, loader.registerAssetLoadCallback());
        loader.onAllFinished(this.loadComplete.bind(this));
    }

    private loadComplete() {
        this.runTick();
    }

    private runTick() {
        this.tick();
        this.repaintTimer = requestAnimationFrame(this.runTick.bind(this));
    }

    tick() {
    }

    stop() {
        if(this.repaintTimer !== -1) {
            cancelAnimationFrame(this.repaintTimer);
        }
    }
}