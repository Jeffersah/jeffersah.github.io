export type TimingFunction = (t: number)=> number;

export const TimingFunctions = {
    linear: (t:number) => t,
    clamp: (t:number) => Math.max(Math.min(t, 1), 0),
    fastIn: Bezier(0, 0.8, 1),
    fastOut: Bezier(0, 0.2, 1),
};

export function Bezier(...pts: number[]): TimingFunction {
    return (t: number) => b_recurse(t, pts, 0, pts.length);
}

function b_recurse(p: number, pts: number[], pi: number, pc: number): number {
    if(pc === 1) return pts[pi];
    return b_recurse(p, pts, pi, pc - 1) * (1-p) + b_recurse(p, pts, pi + 1, pc - 1) * p;
}