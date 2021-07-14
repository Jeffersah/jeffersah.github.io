import Point from "../../common/position/Point";
import { IInstructionImplementation } from "../language/IInstructionImplementation";
import { IComponent } from "./IComponent";

export default class MemoryComponent implements IComponent {
    renderSize: Point;

    data: number[];

    constructor(public maxSize: number)
    {
        // TODO: Memory render
        this.renderSize = new Point(0, 0);
        this.data = [];
    }

    getExtraInstructions(): IInstructionImplementation[] {
        return [];
    }

    reset(): void {
        this.data = [];
    }

    read(index: number): number {
        if(this.data[index] === undefined) return 0;
        return this.data[index];
    }

    write(index: number, value: number) {
        this.data[index] = value;
    }

    tick(): void {
    }

    animTick(): void {
    }

    draw(ctx: CanvasRenderingContext2D): void {
    }
}