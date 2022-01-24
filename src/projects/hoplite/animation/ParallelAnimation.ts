import IAnimation from "./IAnimation";

export default class ParallelAnimation implements IAnimation {
    constructor(private steps: IAnimation[]) {

    }

    tick(): boolean {
        for(let i = this.steps.length - 1; i >= 0; i--) {
            if(this.steps[i].tick()) {
                this.steps.splice(i, 1);
            }
        }
        return this.steps.length === 0;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        for(const step of this.steps) {
            step.draw(ctx);
        }
    }
}