export class SpriteSheet {
    public image: HTMLImageElement;
    constructor(public spriteWidth: number, public spriteHeight: number, spriteUrl: string, onload: ()=>void) {
        this.image = document.createElement('img');
        this.image.src = "/dist/" + spriteUrl;
        this.image.addEventListener('load', onload);
    }

    private isTuple(v: number|{x:number, y:number}):v is {x:number, y:number}
    {
        return (v as any).y !== undefined;
    }

    render(ctx: CanvasRenderingContext2D, tx: number, ty: number, tw: number, th: number, srcx: number, srcy: number): void
    render(ctx: CanvasRenderingContext2D, tx: number, ty: number, tw: number, th: number, srcx: {x: number, y: number}): void
    render(ctx: CanvasRenderingContext2D, tx: number, ty: number, tw: number, th: number, srcx: number|{x: number, y: number}, srcy?: number): void
    {
        var sx = this.isTuple(srcx) ? srcx.x : srcx;
        var sy = this.isTuple(srcx) ? srcx.y : srcy;
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
}