import * as Const from './Constants';
import { Range2d, Range, ColorRange, Complex } from '../common';
import { IIterativeFunction } from './iterativeFunctions/IIterativeFunction';
import { ProgressiveRepaint } from './ProgressiveRepaint';

const MAX_DEPTH = 255;
const PAINT_PER_TICK = Const.CANVAS_WIDTH * 20;
const paintColor: ColorRange = new ColorRange(0, 255, 0, 200, 0, 0);

export class Renderer {

    private ctx: CanvasRenderingContext2D;
    private screenRange: Range2d;
    private repainter: ProgressiveRepaint;

    constructor(private canvas: HTMLCanvasElement, public func: IIterativeFunction) {
        this.repainter = new ProgressiveRepaint(Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT);
        this.ctx = canvas.getContext('2d');
        this.screenRange = new Range2d(new Range(0, canvas.offsetWidth), new Range(0, canvas.offsetHeight));
    }

    Paint(windowRange: Range2d) {
        for (let i = 0; i < PAINT_PER_TICK && !this.repainter.finished; i++) {
            const x = this.repainter.X();
            const y = this.repainter.Y();
            const s = this.repainter.Scale();
            const worldCoords = this.screenRange.ConvertTo({x, y}, windowRange);
            this.ctx.fillStyle = this.CalcColor(worldCoords);
            this.ctx.fillRect(x, y, s, s);
            this.repainter.Advance();
        }
    }

    CalcColor(coords: {x: number, y: number}): string {

        const original = new Complex(coords.x, coords.y);
        let rolling = new Complex(coords.x, coords.y);
        let iter = 0;

        while (iter < MAX_DEPTH && rolling.absSq() < this.func.MaxAbsSq()) {
            rolling = this.func.Iterate(rolling, original);
            iter++;
        }

        if (rolling.absSq() < this.func.MaxAbsSq()) {
            return 'white';
        }

        const perc = iter / MAX_DEPTH;
        return paintColor.ToColor(perc);
    }

    ResetPaint() {
        this.repainter.Reset();
    }
}