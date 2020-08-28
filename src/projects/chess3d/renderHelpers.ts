import { Complex } from '../common';
import { isComplex } from '../common/Complex';

export const sqCoords = [
    new Complex(-1, -1),
    new Complex(1, -1),
    new Complex(1, 1),
    new Complex(-1, 1),
];

export function pathCubeOutside(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, squish: number, height: number, angle: number | Complex) {
    const transform = isComplex(angle) ? angle : Complex.expi(angle);
    const transformedCoords = sqCoords
        .map(coord => Complex.mult(coord, transform))
        .map(coord => new Complex(cx + scale * coord.real, cy + scale * coord.imaginary * squish)); // to screen coords: Scale, Center, and Squish Y
    const organized = coordExtents(transformedCoords);
    ctx.moveTo(organized.xMin.real, organized.xMin.imaginary - height / 2);
    ctx.lineTo(organized.yMin.real, organized.yMin.imaginary - height / 2);
    ctx.lineTo(organized.xMax.real, organized.xMax.imaginary - height / 2);

    ctx.lineTo(organized.xMax.real, organized.xMax.imaginary + height / 2);
    ctx.lineTo(organized.yMax.real, organized.yMax.imaginary + height / 2);
    ctx.lineTo(organized.xMin.real, organized.xMin.imaginary + height / 2);
    ctx.lineTo(organized.xMin.real, organized.xMin.imaginary - height / 2);
}


export function coordExtents(pts: Complex[]): { xMin: Complex, yMin: Complex, xMax: Complex, yMax: Complex } {
    // tslint:disable-next-line: one-variable-per-declaration
    let xMin = pts[0],
        yMin = pts[0],
        xMax = pts[0],
        yMax = pts[0];

    for (let i = 1; i < pts.length; i++) {
        if (pts[i].real < xMin.real) xMin = pts[i];
        if (pts[i].real > xMax.real) xMax = pts[i];
        if (pts[i].imaginary < yMin.imaginary) yMin = pts[i];
        if (pts[i].imaginary > yMax.imaginary) yMax = pts[i];
    }

    return { xMin, xMax, yMin, yMax };
}