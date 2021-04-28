export default class Rand {
    static Int(): number;
    static Int(maxExclusive: number): number;
    static Int(minInclusive: number, maxExclusive: number): number;
    static Int(min?: number, max?: number): number {
        const r = Math.random();
        if(min === undefined && max === undefined) {
            return Math.floor(r * Number.MAX_SAFE_INTEGER);
        } else if(max === undefined) {
            return Math.floor(r * min);
        } else {
            return min + Math.floor(r * (max - min));
        }
    }
}