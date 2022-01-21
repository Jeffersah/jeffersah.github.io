import AssetLoader from "../common/assets/AssetLoader";
import { NearestNeighborScaling, ResizeCanvas } from "../common/CanvasHelpers";
import GameState from "./GameState";
import levelsJson from './assets/leveldata/levels.json';
import ILevelData from "./ILevelData";
import Assets from "./assets";
import Point from "../common/position/Point";
import SignalCtrlPanel from "./signalCtrl/SignalCtrlPanel";
import { TILE_SIZE } from "./Constants";

const NUM_INTERP_FRAMES = 40;

const MAX_CVS_WIDTH = 1024;
const MAX_CVS_HEIGHT = 1024;

var NextRunnerId = 0;

export default class Runner {
    ctx: CanvasRenderingContext2D;
    private repaintTimer: number;
    private assets: Assets;
    private boundEventListener: (ev: MouseEvent) => void;

    gameState: GameState;
    interpFrameCount: number;

    isRunning: boolean;

    overlay: SignalCtrlPanel | undefined;

    private runnerID: number;

    private isDestroyed: boolean;
    private canvasScale: number;

    constructor(public canvas: HTMLCanvasElement) {
        this.runnerID = NextRunnerId++;
        console.log(`Create runner ${this.runnerID}`);
        ResizeCanvas(canvas, 512 * 2, 384 * 2);
        this.ctx = canvas.getContext('2d');
        this.ctx.save();
        this.repaintTimer = -1;
        this.interpFrameCount = 0;
        this.isRunning = false;
        this.isDestroyed = false;

        this.boundEventListener = this.handleMouseEvent.bind(this);
        this.overlay = undefined;

        canvas.addEventListener('click', this.boundEventListener);
    }

    handleKeyEvent(ev: KeyboardEvent): boolean {
        if(ev.key === 'escape') {
            this.overlay = undefined;
            return true;
        }

        return false;
    }

    handleMouseEvent(ev: MouseEvent) {
        if(this.isRunning) return;
        const relCoords = new Point(ev.offsetX / this.canvasScale, ev.offsetY / this.canvasScale);
        if(!(this.overlay?.tryHandleClick(relCoords.x, relCoords.y) ?? false)) {
            this.overlay = this.gameState.tryGetOverlay(relCoords, this.canvasScale);
        }
    }

    start() {
        const loader = new AssetLoader();
        this.assets = new Assets(loader); 
        loader.onAllFinished(this.loadComplete.bind(this));
    }

    toggleRunning() {

        this.gameState.ResetLevel();
        this.interpFrameCount = 0;
        this.isRunning = !this.isRunning;
        
        this.overlay = undefined;
    }

    loadLevel(level: ILevelData) {
        console.log('LOAD');
        
        this.ctx.restore();
        this.ctx.save();
        
        const levelWidth = level.width * TILE_SIZE;
        const levelHeight = level.height * TILE_SIZE;
        
        console.log(`${levelWidth * 2}, ${MAX_CVS_WIDTH}`);
        if(levelWidth * 2 <= MAX_CVS_WIDTH && levelHeight * 2 <= MAX_CVS_HEIGHT) {
            ResizeCanvas(this.canvas, levelWidth * 2, levelHeight * 2);
            NearestNeighborScaling(this.ctx);
            this.ctx.scale(2, 2);
            this.canvasScale = 2;
        } else {
            ResizeCanvas(this.canvas, levelWidth, levelHeight);
            this.canvasScale = 1;
        }

        this.gameState = new GameState(level, this.canvas, this.assets);
        this.interpFrameCount = 0;
        this.overlay = undefined;

    }

    private loadComplete() {
        this.gameState = new GameState((levelsJson as ILevelData[])[0], this.canvas, this.assets);
        this.loadLevel((levelsJson as ILevelData[])[0]);
        this.runTick();
    }

    private runTick() {
        if(this.isDestroyed) return;
        this.tick();
        this.draw();
        this.repaintTimer = requestAnimationFrame(this.runTick.bind(this));
    }

    tick() {
        if(!this.isRunning) {
            this.interpFrameCount = 0;
        }
        else {
            this.interpFrameCount++;
            if(this.interpFrameCount >= NUM_INTERP_FRAMES) {
                this.interpFrameCount = 0;
                this.gameState.updateCars();
            }
        }
    }

    draw() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.save();
        this.gameState.draw(this.canvas, this.ctx, this.interpFrameCount / NUM_INTERP_FRAMES);
        this.ctx.restore();

        if(this.overlay !== undefined) {
            this.overlay.draw(this.ctx);
        }
    }

    stop() {
        if(this.repaintTimer !== -1) {
            cancelAnimationFrame(this.repaintTimer);
        }
        this.isDestroyed = true;
        this.canvas.removeEventListener('click', this.boundEventListener);
        console.log(`Destroy runner ${this.runnerID}`);
    }
}