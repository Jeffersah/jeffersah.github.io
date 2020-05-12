import { Range2d, Range } from "../common";
import { Renderer } from "./Renderer";

const SCROLL_DIV = 3;
const SCROLL_POW = 1.1;

export class ClickDragWrapper {
    screenBounds: Range2d;
    constructor(private control: HTMLElement, private paintWindow: Range2d, public renderer: Renderer, private onSelect: (x:number, y:number)=>void) 
    {
        control.addEventListener('mousedown', this.handleMouseDown.bind(this));
        control.addEventListener('mouseup', this.handleMouseUp.bind(this));
        control.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
        control.addEventListener('mousemove', this.handleMouseMove.bind(this));
        control.addEventListener('wheel', this.handleScroll.bind(this));
        this.screenBounds = new Range2d(new Range(0, control.offsetWidth), new Range(0, control.offsetHeight));
    }

    reset() {
        this.paintWindow = new Range2d(new Range(-1, 1), new Range(-1, 1));
        this.renderer.ResetPaint();
    }

    grabX: number;
    grabY: number;
    isGrabbed: boolean;
    private handleMouseDown(event: MouseEvent) {
        if(event.button === 0) {
            this.grabX = event.offsetX;
            this.grabY = event.offsetY;
            this.isGrabbed = true;
        } 
        else if(event.button === 1) {
            let result = this.screenBounds.ConvertTo({ x: event.offsetX, y: event.offsetY }, this.paintWindow);
            this.onSelect(result.x, result.y);
        }
    }
    private handleMouseUp() {
        this.isGrabbed = false;
    }
    private handleMouseLeave() {
        this.isGrabbed = false;
    }
    private handleMouseMove(event: MouseEvent) {
        if(!this.isGrabbed) return;
        let dx = event.offsetX - this.grabX;
        let dy = event.offsetY - this.grabY;

        let perc = this.screenBounds.GetPercentage(dx, dy);
        this.paintWindow.ShiftByPercentage(-perc.x, -perc.y);
        this.renderer.ResetPaint();

        this.grabX = event.offsetX;
        this.grabY = event.offsetY;
    }

    private handleScroll(event: WheelEvent) {
        let scalePercentage = event.deltaY / SCROLL_DIV;
        let scalePerc = Math.pow(SCROLL_POW, scalePercentage);
        let perc = this.screenBounds.GetPercentage(event.offsetX, event.offsetY);
        this.paintWindow.AspectScale(scalePerc, perc.x, perc.y);
        this.renderer.ResetPaint();
    }

    public Tick(){
        this.renderer.Paint(this.paintWindow);
    }
}