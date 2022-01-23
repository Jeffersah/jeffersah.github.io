import Rectangle from "../position/Rectangle";
import IRenderable from "./IRenderable";

export class StackRenderable implements IRenderable {

    public finishMode: 'any'|'all';

    constructor(public renderables: IRenderable[], renderableFinishMode?: 'any'|'all') {
        this.finishMode = renderableFinishMode ?? 'any';
    }

    tick(): boolean {
        let allFinished = true;
        let anyFinished = false;
        for(let i = 0; i < this.renderables.length; i++) {
            const f = this.renderables[i].tick();
            allFinished = allFinished && f;
            anyFinished = anyFinished || f;
        }
        return this.finishMode === 'any' ? anyFinished : allFinished;
    }

    draw(ctx: CanvasRenderingContext2D, position: Rectangle, rotation: number): void {
        for(let i = 0; i < this.renderables.length; i++) {
            this.renderables[i].draw(ctx, position, rotation);
        }
    }
}