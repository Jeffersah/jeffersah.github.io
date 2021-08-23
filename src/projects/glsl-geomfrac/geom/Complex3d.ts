// The geometric equivalent of a 3d "Complex number"
// Really it's a scalar and a bivector, since that's "primitive" that fractals operate on
// Even though there's 4 components, it's still 3d.

// Basis is [0] = scalar, [1] = XY, [2] = YZ, [3] = ZX
// Translates to GLSL as X = Scalar, Y = XY, Z = YZ, W = ZX
type Complex3d = [number, number, number, number];
export default Complex3d;

export function add(a: Complex3d, b: Complex3d): Complex3d { return a.map((x, i) => x + b[i]) as Complex3d; }
export function negate(a: Complex3d): Complex3d { return a.map(x => -x) as Complex3d; }
export function subtract(a: Complex3d, b: Complex3d): Complex3d { return a.map((x, i) => x - b[i]) as Complex3d; }

// Geometric product of two "complex numbers"
export function multiply(a: Complex3d, b:Complex3d):Complex3d {
    return [
        a[0] * b[0] - a[1] * b[1] - a[2] * b[2] - a[3] * b[3],
        a[0] * b[1] + a[1] * b[0] - a[2] * b[3] + a[3] * b[2],
        a[0] * b[2] + a[1] * b[3] + a[2] * b[0] - a[3] * b[1],
        a[0] * b[3] - a[1] * b[2] + a[2] * b[1] + a[3] * b[0]
    ];
}

export function conjugate(a: Complex3d):Complex3d { return [a[0], -a[1], -a[2], -a[3]] as Complex3d; }

export function dot(a: Complex3d, b: Complex3d): number { return a.map((x, i) => x * b[i]).reduce((a, b) => a + b); }