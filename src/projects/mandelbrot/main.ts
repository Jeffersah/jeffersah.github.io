import * as Const from "./Constants";
import { Renderer } from "./Renderer";
import { Mandelbrot, Julia } from "./IIterativeFunction";
import { Range2d, Range, Complex } from "../common";
import { ClickDragWrapper } from "./ClickDragWrapper";

let mandelRender: ClickDragWrapper;
let juliaRender: ClickDragWrapper;

window.addEventListener("load", () => {
    const canvas = document.getElementById("mainCanvas") as HTMLCanvasElement;
    const subCanvas = document.getElementById("subCanvas") as HTMLCanvasElement;

    canvas.setAttribute("width", Const.CanvasWidth+"");
    canvas.setAttribute("height", Const.CanvasHeight+"");
    canvas.style.width = Const.CanvasWidth + "px";
    canvas.style.height = Const.CanvasHeight + "px";
    
    subCanvas.setAttribute("width", Const.CanvasWidth+"");
    subCanvas.setAttribute("height", Const.CanvasHeight+"");
    subCanvas.style.width = Const.CanvasWidth + "px";
    subCanvas.style.height = Const.CanvasHeight + "px";

    mandelRender = new ClickDragWrapper(canvas, new Range2d(new Range(-1, 1), new Range(-1, 1)), new Renderer(canvas, new Mandelbrot()), mandelbrotSelect);
    juliaRender = new ClickDragWrapper(subCanvas, new Range2d(new Range(-1, 1), new Range(-1, 1)), new Renderer(subCanvas,  new Julia(new Complex(0,0))), (x,y)=>{});

    setTimeout(Tick, 0);
});

function mandelbrotSelect(x: number, y: number) {
    juliaRender.renderer.func = new Julia(new Complex(x, y));
    console.log(x +","+ y);
    juliaRender.reset();
}

function Tick()
{
    mandelRender.Tick();
    juliaRender.Tick();
    requestAnimationFrame(Tick);
}