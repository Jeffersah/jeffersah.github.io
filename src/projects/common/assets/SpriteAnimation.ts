import Point from "../position/Point";
import { IJsonAnimation } from "./json/IJsonAnimation";
import { SpriteAtlas } from "./SpriteAtlas";

export class SpriteAnimation {
    public origin: Point;

    constructor(public atlas: SpriteAtlas, public sourceOffset: Point, public sourceSize: Point, public numFrames: number, origin?: Point) {
        this.origin = origin ?? new Point(0,0);
    }

    static FromJson(atlas: SpriteAtlas, params: IJsonAnimation) : SpriteAnimation {

        return new SpriteAnimation(atlas, 
            new Point(params.sourceOffset[0], params.sourceOffset[1]),
            new Point(params.frameSize[0], params.frameSize[1]),
            params.numFrames,
            params.origin === undefined ? undefined : new Point(params.origin[0], params.origin[1]));
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
    play(args: ISpriteAnimationArgs): PlayingAnimation;
    play(maxTime: number, loop?: boolean): PlayingAnimation;
    play(args: ISpriteAnimationArgs | number, loop?: boolean): PlayingAnimation {
        if((<ISpriteAnimationArgs>args).animation !== undefined) {
            return new PlayingAnimation(this, (<ISpriteAnimationArgs>args).maxTime, (<ISpriteAnimationArgs>args).loop ?? false)
        }
        else {
            return new PlayingAnimation(this, <number>args, loop ?? false);
        }
    }
}

export interface ISpriteAnimationArgs {
    animation: SpriteAnimation,
    maxTime: number,
    loop?: boolean
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