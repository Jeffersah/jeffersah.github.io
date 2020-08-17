export type GlslConstant = number | GlslTimeVariable;

export function GlslSin(rate: number, min?: number, max?: number): GlslTimeVariable {
    const useMin = min === undefined ? -1 : min;
    const useMax = max === undefined ? 1 : max;
    return new GlslTimeVariable('sin', useMin, useMax, rate);
}

export function GlslCos(rate: number, min?: number, max?: number): GlslTimeVariable {
    const useMin = min === undefined ? -1 : min;
    const useMax = max === undefined ? 1 : max;
    return new GlslTimeVariable('cos', useMin, useMax, rate);
}

export class GlslTimeVariable {
    constructor (public timeFunc: 'sin' | 'cos', public min: number, public max: number, public rate: number) {
    }
}

function constIsTimeVar(c: GlslConstant): c is GlslTimeVariable {
    return (c as GlslTimeVariable).timeFunc !== undefined;
}

export function glslFloatConst(n: GlslConstant): string {
    if (constIsTimeVar(n)) {
        const range = (n.max - n.min);
        const halfRange = range / 2;
        const midp = (n.max + n.min) / 2;
        const rate = `(t/60.0 * ${glslFloatConst(n.rate)})`;
        switch (n.timeFunc) {
            case 'sin': return `sin(${rate} * PI * 2.0) * ${glslFloatConst(halfRange)} + ${glslFloatConst(midp)}`;
            case 'cos': return `cos(${rate} * PI * 2.0) * ${glslFloatConst(halfRange)} + ${glslFloatConst(midp)}`;
        }
    } else {
        const asstr = n.toString();
        if (asstr.indexOf('.') === -1) return asstr + '.0';
        return asstr;
    }
}