import * as Const from "./Constants";
import { Range2d, Range, ColorRange, Complex } from "../common";
import { IIterativeFunction } from './IIterativeFunction';
import { ProgressiveRepaint } from './ProgressiveRepaint';

const MAX_DEPTH = 255;
const PAINT_PER_TICK = Const.CanvasWidth * 20;
const paintColor: ColorRange = new ColorRange(0, 255, 0, 200, 0, 0)

export class Renderer {

    private ctx: CanvasRenderingContext2D;
    private ScreenRange: Range2d;
    private repainter: ProgressiveRepaint;

    constructor(private canvas: HTMLCanvasElement, public func: IIterativeFunction)
    {
        this.repainter = new ProgressiveRepaint(Const.CanvasWidth, Const.CanvasHeight);
        this.ctx = canvas.getContext("2d");
        this.ScreenRange = new Range2d(new Range(0, 500), new Range(0, 500));
    }

    Paint(WindowRange: Range2d) {
        for(let i = 0; i < PAINT_PER_TICK && !this.repainter.finished; i++){
            let x = this.repainter.X();
            let y = this.repainter.Y();
            let s = this.repainter.Scale();
            let worldCoords = this.ScreenRange.ConvertTo({x, y}, WindowRange);
            this.ctx.fillStyle = this.CalcColor(worldCoords);
            this.ctx.fillRect(x, y, s, s);
            this.repainter.Advance();
        }
    }

    CalcColor(coords: {x: number, y: number}): string {

        let original = new Complex(coords.x, coords.y);
        let rolling = new Complex(coords.x, coords.y);
        let iter = 0;

        while(iter < MAX_DEPTH && rolling.AbsSq() < this.func.MaxAbsSq()) {
            rolling = this.func.Iterate(rolling, original);
            iter++;
        }

        if(rolling.AbsSq() < this.func.MaxAbsSq())
            return "white";

        let perc = iter / MAX_DEPTH;
        return paintColor.ToColor(perc);
    }

    ResetPaint(){
        this.repainter.Reset();
    }
}