export class Range {
    constructor(public min: number, public max: number) { }

    GetValue(percentage: number) {
        return this.min + (this.max - this.min) * percentage;
    }

    GetPercentage(point: number) {
        return (point - this.min) / (this.max - this.min);
    }

    ShiftByPercentage(percentage: number)
    {
        const range = this.max-this.min;
        this.min += range * percentage;
        this.max += range * percentage;
    }

    Scale(percentage: number, anchor: number = 0.5)
    {
        const range = this.max-this.min;
        const deltaRange = (range * percentage) - range;
        this.min -= deltaRange * anchor;
        this.max += deltaRange * (1-anchor);
    }

    ConvertTo(value: number, targetRange: Range) {
        return targetRange.GetValue(this.GetPercentage(value));
    }
    ConvertFrom(value: number, targetRange: Range) {
        return targetRange.ConvertTo(value, this);
    }
}
export const UnitRange: Range = new Range(0, 1);
(window as any).range = Range;