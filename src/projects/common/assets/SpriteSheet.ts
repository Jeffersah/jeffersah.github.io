import { RotTransformCanvas } from "../CanvasHelpers";
import Rect from "../position/Rectangle";
import Sprite from "../rendering/Sprite";

export class SpriteSheet {
    public image: HTMLImageElement;
    public tilesWide: number;
    public tilesHigh: number;
    constructor(public spriteWidth: number, public spriteHeight: number, spriteUrl: string, private onload: () => void) {
        this.image = document.createElement('img');
        this.image.src = spriteUrl;
        this.image.addEventListener('load', () => this.loadFinished());
    }

    private loadFinished() {
        this.tilesWide = this.image.width / this.spriteWidth;
        this.tilesHigh = this.image.height / this.spriteHeight;
        this.onload();
    }

    private isTuple(v: number|{x: number, y: number}): v is {x: number, y: number} {
        return (v as any).y !== undefined;
    }

    public getSprite(x: number, y: number, w: number, h: number) {
        return new Sprite(this.image, new Rect(x * w, y * h, w, h));
    }

    render(ctx: CanvasRenderingContext2D, tx: number, ty: number, tw: number, th: number, srcx: number, srcy: number): void;
    render(ctx: CanvasRenderingContext2D, tx: number, ty: number, tw: number, th: number, srcx: {x: number, y: number}): void;
    render(ctx: CanvasRenderingContext2D, tx: number, ty: number, tw: number, th: number, srcx: number|{x: number, y: number}, srcy?: number): void {
        const sx = this.isTuple(srcx) ? srcx.x : srcx;
        const sy = this.isTuple(srcx) ? srcx.y : srcy;
        ctx.drawImage(
            this.image,
            sx * this.spriteWidth,
            sy * this.spriteHeight,
            this.spriteWidth,
            this.spriteHeight,
            tx,
            ty,
            tw,
            th
        );
    }

    rotrender(
            ctx: CanvasRenderingContext2D,
            tx: number,
            ty: number,
            tw: number,
            th: number,
            srcx: number,
            srcy: number,
            rot: number,
            originx: number,
            originy: number) {
        ctx.save();
        RotTransformCanvas(ctx, tx, ty, originx, originy, rot);
        ctx.drawImage(this.image, srcx * this.spriteWidth, srcy * this.spriteHeight, this.spriteWidth, this.spriteHeight, 0, 0, tw, th);
        ctx.restore();
    }

    renderCustom(ctx: CanvasRenderingContext2D, tx: number, ty: number, tw: number, th: number, srcx: number, srcy: number, twid: number, thei: number) {
        const sx = srcx * twid;
        const sy = srcy * thei;
        ctx.drawImage(
            this.image,
            sx,
            sy,
            twid,
            thei,
            tx,
            ty,
            tw,
            th
        );
    }
}