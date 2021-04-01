import { Complex, Range, Range2d } from "../common";
import * as GLSL from "../common/3d/GlslHelpers";
import { ResizeCanvas } from "../common/CanvasHelpers";
import Point from "../common/position/Point";
import GlslFrameRenderer from "./GlslFrameRenderer";

const SCROLL_DIV = 3;
const SCROLL_POW = 1.1;

export default class GlslJuliaFrameRenderer extends GlslFrameRenderer {
    
    private julia_point: Point;
    private julia_escape: number;

    constructor(canvas: HTMLCanvasElement, fragment_code: string) {
        super(canvas, fragment_code);
        this.setJuliaPoint(new Complex(0,0));
    }

    setJuliaPoint(pt: Complex)
    {
        this.julia_point = new Point(pt.real, pt.imaginary);
        this.julia_escape = (Math.sqrt(4 * pt.abs() + 1) + 1) / 2;
        this.renderFrame();
    }

    renderFrame() {
        GLSL.fragmentShaderOnlyDraw(this.gl, this.program, this.buffer, gl => {
            gl.uniform2fv(gl.getUniformLocation(this.program, 'window_pos'), [this.windowRange.xRange.min, this.windowRange.yRange.min]);
            gl.uniform2fv(gl.getUniformLocation(this.program, 'window_size'), [this.windowRange.xRange.Length(), this.windowRange.yRange.Length()]);
            gl.uniform2fv(gl.getUniformLocation(this.program, 'julia_coord'), [this.julia_point.x, this.julia_point.y]);
            gl.uniform1fv(gl.getUniformLocation(this.program, 'julia_escape'), [this.julia_escape]);
        });
    }
}