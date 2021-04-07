import { ResizeCanvas } from "../common/CanvasHelpers";
import IScreen from "./IScreen";
import defaultMap from "./map/MapInfo";
import RunGameScreen from "./RunGameScreen";

export default class Runner {
    ctx: CanvasRenderingContext2D;
    private repaintTimer: number;
    private screen: IScreen;

    constructor(public canvas: HTMLCanvasElement) {
        ResizeCanvas(canvas, 800, 600);
        this.ctx = canvas.getContext('2d');
        this.repaintTimer = -1;

        this.screen = new RunGameScreen(defaultMap);
    }

    start() {
        this.runTick();
    }

    private runTick() {
        this.tick();
        this.repaintTimer = requestAnimationFrame(this.runTick.bind(this));
    }

    tick() {
        this.screen.update(s => {
            this.screen = s;
        });
        this.ctx.save();
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.screen.draw(this.canvas, this.ctx);
        this.ctx.restore();
    }

    stop() {
        if(this.repaintTimer !== -1) {
            cancelAnimationFrame(this.repaintTimer);
        }
    }
}