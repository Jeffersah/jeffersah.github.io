import { ResizeCanvas } from "../common/CanvasHelpers";
import Point from "../common/position/Point";
import IScreen from "./IScreen";
import {MapInfo} from "./map/MapInfo";

const USE_CACHED_RENDER = true;

export default class RunGameScreen implements IScreen {

    private offscreenCanvas: HTMLCanvasElement;
    private offscreenCtx: CanvasRenderingContext2D;

    private recursionArgs: {
        offset: Point,
        rotation: number,
        scale: number
    };

    constructor(private map: MapInfo) {
    }

    update(): void {
        
    }

    initOffscreenCanvas(canvas: HTMLCanvasElement) {
        this.offscreenCanvas = document.createElement('canvas');
        ResizeCanvas(this.offscreenCanvas, canvas.width, canvas.height);
        this.offscreenCtx = this.offscreenCanvas.getContext('2d');
    }
    
    draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): void {
        if(this.offscreenCanvas === null || this.offscreenCanvas === undefined)
            this.initOffscreenCanvas(canvas);
        if(USE_CACHED_RENDER)
            this.renderWorld(this.offscreenCanvas, this.offscreenCtx);
        ctx.save();
        this.recursiveRender(this.offscreenCanvas, canvas, ctx);
        ctx.restore();
    }

    recursiveRender(src: HTMLCanvasElement, canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        for(let i = 0; i < 8; i++){
            if(USE_CACHED_RENDER)
                ctx.drawImage(src, 0, 0, canvas.width, canvas.height);
            else
                this.renderWorld(canvas, ctx);
            ctx.translate(-400, -300);
            ctx.scale(this.map.recursePosition.scale, this.map.recursePosition.scale);
            ctx.rotate(this.map.recursePosition.rotation);

            const tgtPoint = this.map.recursePosition.center.rotate(-this.map.recursePosition.rotation).multWith(1/this.map.recursePosition.scale, 1/this.map.recursePosition.scale);

            ctx.translate(tgtPoint.x, tgtPoint.y);
        }
    }

    renderWorld(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
        ctx.save();
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, 800, 600);
        ctx.beginPath();
        for(const obstruction of this.map.obstructions) {
            ctx.moveTo(obstruction.bounds[0].x, obstruction.bounds[0].y);
            for(let i = 1; i <= obstruction.bounds.length; i++) {
                ctx.lineTo(obstruction.bounds[i % obstruction.bounds.length].x, obstruction.bounds[i % obstruction.bounds.length].y);
            }
        }
        ctx.fillStyle = '#006';
        ctx.strokeStyle = 'blue';
        ctx.fill();
        ctx.stroke();
        ctx.restore();
    }

}