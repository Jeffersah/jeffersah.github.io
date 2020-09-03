import { Complex, isComplex } from '../../../../projects/common/Complex';

export function findCubeCenter(originx: number, originy: number, x: number, y: number, z: number, squish: number, scale: number, height: number, angle: number | Complex) {
    let transform: Complex;
    if (isComplex(angle)) {
        transform = angle;
    }
    else {
        angle %= (Math.PI * 2);
        if (angle < 0) {
            angle += (Math.PI * 2);
        }
        transform = Complex.expi(angle);
    }
    const transformedCoords = Complex.scalarMultiply(Complex.mult(new Complex(x, y), transform), scale, scale);
    transformedCoords.imaginary *= squish;
    return { x: originx + transformedCoords.real, y: originy + transformedCoords.imaginary + z * height };
}

export const sqCoords = [
    new Complex(-1, -1),
    new Complex(1, -1),
    new Complex(1, 1),
    new Complex(-1, 1),
];

export function pathCubeOutside(ctx: CanvasRenderingContext2D, cx: number, cy: number, scale: number, squish: number, height: number, angle: number) {
    angle %= (Math.PI / 2);
    if (angle < 0) {
        angle += (Math.PI / 2);
    }
    const transform = Complex.expi(angle);
    const transformedCoords = sqCoords
        .map(coord => Complex.mult(coord, transform))
        .map(coord => new Complex(cx + scale * coord.real, cy + scale * coord.imaginary * squish)); // to screen coords: Scale, Center, and Squish Y

    const organized = {
        xMin: transformedCoords[3],
        yMin: transformedCoords[0],
        xMax: transformedCoords[1],
        yMax: transformedCoords[2]
    };

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