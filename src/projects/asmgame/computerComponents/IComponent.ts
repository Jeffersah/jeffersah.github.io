import Point from "../../common/position/Point";
import { IInstructionImplementation } from "../language/IInstructionImplementation";

export interface IComponent {
    
    getExtraInstructions(): IInstructionImplementation[];

    renderSize: Point;

    /** Reset the component. Called when a level is loaded, test case is changed, or execution is stopped. */
    reset(): void;

    /** Return undefined if the instruction is valid, otherwise return an error string */

    /** Called when the CPU runs a tick */
    tick(): void;

    /** Called once per animation frame */
    animTick(): void;

    /** 
     * Called to render a component
     * ctx is translated to the draw location. DO NOT render outside your bounding box, between (0,0) and (renderSize)
     */
    draw(ctx: CanvasRenderingContext2D): void;
}