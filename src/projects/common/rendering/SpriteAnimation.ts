import Rect from "../position/Rectangle";
import Point from "../position/Point";
import IRenderable, { ISimpleRenderable } from "./IRenderable";
import IRenderableSource from "./IRenderableSource";
import Sprite from "./Sprite";

export class SpriteAnimation implements IRenderableSource {
    constructor(
        public source: CanvasImageSource,
        public firstFrame: Rect, 
        public origin: Point,
        public frameAdvance: Point,
        public numFrames: number,
        public duration: number,
        public loop: boolean) {

    }

    getPixelSize(): Point {
        return new Point(this.firstFrame.w, this.firstFrame.y);
    }

    getRenderable(): IRenderable {
        return new SpriteAnimationInstance(this, this.loop);
    }

    getSprite(frameNumber: number): Sprite {
        const frame = new Rect(
            this.firstFrame.x + (frameNumber * this.frameAdvance.x),
            this.firstFrame.y + (frameNumber * this.frameAdvance.y),
            this.firstFrame.w,
            this.firstFrame.h
        );
        return new Sprite(this.source, frame, this.origin);
    }
}

export class SpriteAnimationInstance implements ISimpleRenderable, IRenderable {

    private duration: number;
    private currentTick: number;

    constructor(public source: SpriteAnimation, public loop: boolean, private overrideDuration?: number) {
        this.duration = overrideDuration ?? source.duration;
        this.currentTick = 0;
    }

    tick(): boolean {
        this.currentTick++;
        if(this.currentTick === this.duration) {
            if(this.loop) this.currentTick = 0;
            return true;
        }
        return false;
    }

    getSprite(): Sprite {
        const frameNumber = (this.currentTick * this.source.numFrames) / this.duration;
        return this.source.getSprite(Math.floor(frameNumber));
    }

    draw(ctx: CanvasRenderingContext2D, position: Rect, rotation: number): void {
        this.getSprite().draw(ctx, position, rotation);
    }
}


export class DelaySpriteAnimationInstance implements ISimpleRenderable, IRenderable {

    private duration: number;
    private currentTick: number;

    constructor(public source: SpriteAnimationInstance, delayDuration: number) {
        this.duration = delayDuration;
        this.currentTick = 0;
    }

    tick(): boolean {
        if(this.currentTick >= this.duration){
            return this.source.tick();
        }
        else{
            this.currentTick++;
            return false;
        }
    }

    getSprite(): Sprite {
        return this.source.getSprite();
    }

    draw(ctx: CanvasRenderingContext2D, position: Rect, rotation: number): void {
        this.getSprite().draw(ctx, position, rotation);
    }
}