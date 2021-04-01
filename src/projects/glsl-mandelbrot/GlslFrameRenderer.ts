import { Range, Range2d } from "../common";
import * as GLSL from "../common/3d/GlslHelpers";
import { ResizeCanvas } from "../common/CanvasHelpers";
import Point from "../common/position/Point";

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

    constructor(private canvas: HTMLCanvasElement, private fragment_code: string, private onMiddleClick?: (pt: Point) => void) {
        ResizeCanvas(canvas, 1200, 600);
        this.cursor_anchor = null;
        this.mm_down = false;
        this.gl = canvas.getContext('webgl');
        
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

                const perc = this.canvasRange.GetPercentage(dx, dy);
                this.windowRange.ShiftByPercentage(-perc.x, perc.y);
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