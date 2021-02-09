import Point from "../position/Point";
import { SpriteAtlas } from "./SpriteAtlas";

export class SpriteAnimation {
    public origin: Point;

    constructor(public atlas: SpriteAtlas, public sourceOffset: Point, public sourceSize: Point, public numFrames: number, origin?: Point) {
        this.origin = origin ?? new Point(0,0);
    }

    draw(ctx: CanvasRenderingContext2D, position: Point, size: Point, frame: number, rotation?: number) {
        ctx.save();
        ctx.translate(position.x, position.y);
        if(rotation !== undefined)
            ctx.rotate(rotation);
        ctx.scale(size.x, size.y);
        ctx.translate(-this.origin.x, -this.origin.y);
        ctx.drawImage(this.atlas.image, this.sourceOffset.x + frame * this.sourceSize.x, this.sourceOffset.y, this.sourceSize.x, this.sourceSize.y, 0, 0, 1, 1);
        ctx.restore();
    }

    play(maxTime: number, loop?: boolean): PlayingAnimation {
        return new PlayingAnimation(this, maxTime, loop ?? false);
    }
}

export class PlayingAnimation {
    private currentTime: number;
    constructor(public source: SpriteAnimation, public maxTime: number, public loop: boolean)
    {
        this.currentTime = 0;
    }

    tick(): boolean {
        this.currentTime++;
        if(this.currentTime < this.maxTime) {
            return false;
        } else {
            if(this.loop) this.currentTime = 0;
            return true;
        }
    }

    draw(ctx: CanvasRenderingContext2D, position: Point, size: Point, rotation?: number) {
        const frameNumber = Math.floor(this.currentTime * this.source.numFrames / this.maxTime);
        this.source.draw(ctx, position, size, frameNumber, rotation);
    }
}