import IAnimation from "./IAnimation";

export default class DelayAnimation implements IAnimation {

    constructor(private inner: IAnimation, private delay: number) {

    }

    tick(): boolean {
        if(this.delay === 0) return this.inner.tick();
        else {
            this.delay --;
            return false;
        }
    }

    draw(ctx: CanvasRenderingContext2D): void {
        if(this.delay === 0) {
            return this.inner.draw(ctx);
        }
    }

}