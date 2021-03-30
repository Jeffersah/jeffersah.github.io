import Point from "../position/Point";
import { PlayingAnimation } from "./SpriteAnimation";
import { AtlasSprite } from "./SpriteAtlas";

export class AnimationControl {
    queue: (PlayingAnimation | AtlasSprite)[];
    scaleFactor: Point;

    constructor(initial: PlayingAnimation | AtlasSprite, size?:Point) {
        this.queue = [initial];
        if(size === undefined) {
            this.scaleFactor = new Point(1, 1);
        }
        else if(isSprite(initial)) {
            this.scaleFactor = new Point(size.x / initial.sourceSize.x, size.y / initial.sourceSize.y);
        }
        else {
            this.scaleFactor = new Point(size.x / initial.source.sourceSize.x, size.y / initial.source.sourceSize.y);
        }
    }

    play(src: PlayingAnimation | AtlasSprite) {
        this.queue = [src];
    }

    enqueue(src: PlayingAnimation | AtlasSprite) {
        this.queue.push(src);
    }

    tick() {
        if(isSprite(this.queue[0])) {
            this.advance();
        }
        else {
            if(this.queue[0].tick()) this.advance();
        }
    }

    advance() {
        if(this.queue.length > 1) {
            this.queue.splice(0, 1);
        }
    }

    render(ctx: CanvasRenderingContext2D, pt: Point, rot?: number) {
        this.queue[0].draw(ctx, pt, this.getRenderSize(this.queue[0]), rot);
    }

    private getRenderSize(src: PlayingAnimation | AtlasSprite): Point {
        if(isSprite(src)) return Point.Multiply(src.sourceSize, this.scaleFactor);
        else return Point.Multiply(src.source.sourceSize, this.scaleFactor);
    }
}

function isSprite(src: PlayingAnimation | AtlasSprite): src is AtlasSprite {
    return (<AtlasSprite>src).origin !== undefined;
}