import { Range } from './Range';
export class ColorRange {
    public rRange: Range;
    public gRange: Range;
    public bRange: Range;
    constructor(rMin: number, rMax: number, gMin: number, gMax: number, bMin: number, bMax: number) {
        this.rRange = new Range(rMin, rMax);
        this.gRange = new Range(gMin, gMax);
        this.bRange = new Range(bMin, bMax);
    }

    public ToColor(percentage: number): string {
        return 'rgb(' + Math.floor(this.rRange.GetValue(percentage)) + ','
                      + Math.floor(this.gRange.GetValue(percentage)) + ','
                      + Math.floor(this.bRange.GetValue(percentage)) + ')';
    }
}