export function ResizeCanvas(canvas: HTMLCanvasElement, tgtWidth: number, tgtHeight: number) {
    canvas.width = tgtWidth;
    canvas.height = tgtHeight;
    canvas.style.width = tgtWidth + 'px';
    canvas.style.height = tgtHeight + 'px';
}

export function NearestNeighborScaling(ctx: CanvasRenderingContext2D) {
    ctx.imageSmoothingEnabled = false;
}

export function RotTransformCanvas(ctx: CanvasRenderingContext2D, tx: number, ty: number, originx: number, originy: number, rot: number) {
    ctx.translate(tx, ty);
    ctx.rotate(rot);
    ctx.translate(-originx, -originy);
}