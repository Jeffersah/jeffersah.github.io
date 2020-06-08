export function ResizeCanvas(canvas: HTMLCanvasElement, tgtWidth: number, tgtHeight: number) {
    canvas.width = tgtWidth;
    canvas.height = tgtHeight;
    canvas.style.width = tgtWidth + 'px';
    canvas.style.height = tgtHeight + 'px';
}

export function NearestNeighborScaling(ctx: CanvasRenderingContext2D) {
    ctx.imageSmoothingEnabled = false;
}