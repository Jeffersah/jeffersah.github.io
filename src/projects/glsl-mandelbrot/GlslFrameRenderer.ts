import { Range, Range2d } from "../common";
import * as GLSL from "../common/3d/GlslHelpers";
import { ResizeCanvas } from "../common/CanvasHelpers";
import Point from "../common/position/Point";
import Rect from "../common/position/Rectangle";

const SCROLL_DIV = 3;
const SCROLL_POW = 1.1;

export default class GlslFrameRenderer {
    protected gl: WebGLRenderingContext;
    protected program: WebGLProgram;
    protected buffer: WebGLBuffer;

    private cursor_anchor: Point | null;
    private mm_down: boolean;

    protected canvasRange: Range2d;
    protected windowRange: Range2d;

    private touch_anchors: { [key: number]: Point }

    constructor(private canvas: HTMLCanvasElement, private fragment_code: string, private onMiddleClick?: (pt: Point) => void) {
        ResizeCanvas(canvas, 1200, 600);
        this.cursor_anchor = null;
        this.mm_down = false;
        this.gl = canvas.getContext('webgl');
        this.touch_anchors = {};
        
        this.canvasRange = new Range2d(new Range(0, 1200), new Range(0, 600));
        this.windowRange = new Range2d(new Range(-1, 1), new Range(-1, (canvas.height / canvas.width)));
        this.init();
    }

    init() {
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);
        this.initProgram();
    }

    initProgram() {
        this.program = GLSL.initShaderProgram(this.gl, GLSL.defaultVertexShader, this.fragment_code);
        this.buffer = GLSL.fragmentShaderOnlyInitBuffer(this.gl);
    }

    run() {
        this.renderFrame();

        this.canvas.addEventListener('mousedown', e => {
            if(e.button === 0) {
                this.cursor_anchor = new Point(e.offsetX, e.offsetY);
            }
            else if(e.button === 1) {
                this.mm_down = true;
                let perc = this.canvasRange.GetPercentage(e.offsetX, e.offsetY);
                perc = this.windowRange.GetValue(perc.x, 1-perc.y);
                if(this.onMiddleClick !== undefined) {
                    this.onMiddleClick(new Point(perc.x, perc.y));
                }
            }
            e.preventDefault();
        });
        this.canvas.addEventListener('mouseup', e => {
            if(e.button === 0)
                this.cursor_anchor = null;
            else if(e.button === 1)
                this.mm_down = false;
            e.preventDefault();
        });
        this.canvas.addEventListener('mousemove', e => {
            if(this.cursor_anchor != null) {
                const dx = e.offsetX - this.cursor_anchor.x;
                const dy = e.offsetY - this.cursor_anchor.y;
                this.panCameraByScreenDelta(new Point(dx, dy));
                this.cursor_anchor = new Point(e.offsetX, e.offsetY);
                this.renderFrame();
                e.preventDefault();
            }
            if(this.mm_down && this.onMiddleClick !== undefined){
                let perc = this.canvasRange.GetPercentage(e.offsetX, e.offsetY);
                perc = this.windowRange.GetValue(perc.x, 1-perc.y);
                this.onMiddleClick(new Point(perc.x, perc.y));
            }
        });
        this.canvas.addEventListener('wheel', e => {
            const scalePercentage = e.deltaY / SCROLL_DIV;
            const scalePerc = Math.pow(SCROLL_POW, scalePercentage);
            const perc = this.canvasRange.GetPercentage(e.offsetX, e.offsetY);

            this.windowRange.AspectScale(scalePerc, perc.x, 1-perc.y);
            this.renderFrame();
            e.preventDefault();
        });
        this.canvas.addEventListener('touchstart', ev => { 
            if(ev.targetTouches.length >= 3 || ev.targetTouches.length === 0) return;
            for(let i = 0; i < ev.targetTouches.length; i++){
                const touch = ev.targetTouches.item(i);
                this.touch_anchors[touch.identifier] = touchOffset(touch);
            }
            ev.preventDefault();
        });
        this.canvas.addEventListener('touchmove', ev => {
            if(ev.touches.length >= 3 || ev.touches.length === 0) return;
            const moves: [Point, Point][] = [];
            for(let i = 0; i < ev.targetTouches.length; i++){
                const touch = ev.targetTouches.item(i);
                const pos = touchOffset(touch);
                const oldPos = this.touch_anchors[touch.identifier];
                if(oldPos === undefined) return;
                moves.push([oldPos, pos]);
                this.touch_anchors[touch.identifier] = pos;
            }

            if(moves.length === 1) {
                // Just pan the camera
                this.panCameraByScreenDelta(Point.subtract(moves[0][1], moves[0][0]));
            }
            else if(moves.length === 2) {
                // Average the start + End positions to find the move amt
                const dragStart = Point.Multiply(Point.add(moves[0][0], moves[1][0]), 0.5, 0.5);
                const dragEnd = Point.Multiply(Point.add(moves[0][1], moves[1][1]), 0.5, 0.5);
                const worldPos = this.panCameraByScreenDelta(dragEnd.SubtractWith(dragStart));
                const startDist = Point.subtract(moves[0][0], moves[1][0]).Length();
                const endDist = Point.subtract(moves[0][1], moves[1][1]).Length();
                const scaleAmt = startDist / endDist;
                this.windowRange.AspectScale(scaleAmt, worldPos.x, 1-worldPos.y);
            }

            this.renderFrame();
            ev.preventDefault();
        });
        this.canvas.addEventListener('touchend', ev => {
            this.touch_anchors = {};
            ev.preventDefault();
        });
        this.canvas.addEventListener('touchcancel', ev => {
            this.touch_anchors = {};
            ev.preventDefault();
        });
    }

    private panCameraByScreenDelta(delta: Point) {
        const perc = this.canvasRange.GetPercentage(delta.x, delta.y);
        this.windowRange.ShiftByPercentage(-perc.x, perc.y);
        return perc;
    }

    renderFrame() {
        GLSL.fragmentShaderOnlyDraw(this.gl, this.program, this.buffer, gl => {
            gl.uniform2fv(gl.getUniformLocation(this.program, 'window_pos'), [this.windowRange.xRange.min, this.windowRange.yRange.min]);
            gl.uniform2fv(gl.getUniformLocation(this.program, 'window_size'), [this.windowRange.xRange.Length(), this.windowRange.yRange.Length()]);
        });
    }

    cleanup() {
        
    }
}

function touchOffset(touch: Touch): Point {
    const tgt = (touch.target as HTMLElement).getBoundingClientRect();
    return new Point(touch.pageX - tgt.left, touch.pageY - tgt.top);
}