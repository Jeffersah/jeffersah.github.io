import IAnimation from "./IAnimation";

export default class SequentialAnimation implements IAnimation {
    constructor(private steps: IAnimation[]) {

    }

    tick(): boolean {
        if(this.steps.length === 0) return true;
        
        while(this.steps[0].tick()){
            this.steps.shift();
            if(this.steps.length === 0) return true;
        }
        return false;
    }

    draw(ctx: CanvasRenderingContext2D): void {
        this.steps[0].draw(ctx);
    }
}