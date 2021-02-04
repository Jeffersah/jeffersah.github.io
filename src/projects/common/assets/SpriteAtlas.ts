import { RotTransformCanvas } from "../CanvasHelpers";
import Point from "../position/Point";

export class SpriteAtlas {
    public image: HTMLImageElement;
    constructor(spriteUrl: string, private onload: () => void) {
        this.image = document.createElement('img');
        this.image.src = spriteUrl;
        this.image.addEventListener('load', () => this.loadFinished());
    }

    private loadFinished() {
        this.onload();
    }

    getSprite(sourceOffset: Point, sourceSize: Point, origin?: Point, sourceRotation?: number) {
        return new AtlasSprite(this, sourceOffset, sourceSize, origin, sourceRotation);
    }
}

export class AtlasSprite {
    public origin: Point;
    public sourceRotation: number;

    constructor(public atlas: SpriteAtlas, public sourceOffset: Point, public sourceSize: Point, origin?: Point, sourceRotation?: number) {
        this.origin = origin ?? new Point(0,0);
        this.sourceRotation = sourceRotation ?? 0;
    }

    draw(ctx: CanvasRenderingContext2D, position: Point, size: Point, rotation?: number) {
        ctx.save();
        ctx.translate(position.x, position.y);
        ctx.rotate((rotation ?? 0) + this.sourceRotation);
        ctx.scale(size.x, size.y);
        ctx.translate(-this.origin.x, -this.origin.y);
        ctx.drawImage(this.atlas.image, this.sourceOffset.x, this.sourceOffset.y, this.sourceSize.x, this.sourceSize.y, 0, 0, 1, 1);
        ctx.restore();
    }
}