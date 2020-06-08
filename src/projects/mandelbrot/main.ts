import * as Const from './Constants';
import { Renderer } from './Renderer';
import { Mandelbrot } from './iterativeFunctions/Mandelbrot';
import { Julia } from './iterativeFunctions/Julia';
import { Range2d, Range, Complex } from '../common';
import { ClickDragWrapper } from './ClickDragWrapper';


let mandelRender: ClickDragWrapper;
let juliaRender: ClickDragWrapper;

export default function Run() {
    const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;
    const subCanvas = document.getElementById('subCanvas') as HTMLCanvasElement;

    canvas.setAttribute('width', Const.CANVAS_WIDTH + '');
    canvas.setAttribute('height', Const.CANVAS_HEIGHT + '');
    canvas.style.width = Const.CANVAS_WIDTH + 'px';
    canvas.style.height = Const.CANVAS_HEIGHT + 'px';

    subCanvas.setAttribute('width', Const.CANVAS_WIDTH + '');
    subCanvas.setAttribute('height', Const.CANVAS_HEIGHT + '');
    subCanvas.style.width = Const.CANVAS_WIDTH + 'px';
    subCanvas.style.height = Const.CANVAS_HEIGHT + 'px';

    mandelRender = new ClickDragWrapper(canvas, new Range2d(new Range(-1, 1), new Range(-1, 1)), new Renderer(canvas, new Mandelbrot()), mandelbrotSelect);
    juliaRender = new ClickDragWrapper(subCanvas, new Range2d(new Range(-1, 1), new Range(-1, 1)), new Renderer(subCanvas,  new Julia(new Complex(0, 0))), (x, y) => undefined);

    setTimeout(Tick, 0);
}

function mandelbrotSelect(x: number, y: number) {
    juliaRender.renderer.func = new Julia(new Complex(x, y));
    juliaRender.reset();
}

function Tick() {
    mandelRender.Tick();
    juliaRender.Tick();
    requestAnimationFrame(Tick);
}