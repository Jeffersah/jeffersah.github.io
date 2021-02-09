export class Range {
    constructor(public min: number, public max: number) { }

    Length() {
        return this.max - this.min;
    }

    GetValue(percentage: number) {
        return this.min + (this.max - this.min) * percentage;
    }

    GetPercentage(point: number) {
        return (point - this.min) / (this.max - this.min);
    }

    Shift(amt: number) {
        this.min += amt;
        this.max += amt;
    }

    ShiftByPercentage(percentage: number) {
        const range = this.max - this.min;
        this.min += range * percentage;
        this.max += range * percentage;
    }

    Scale(percentage: number, anchor = 0.5) {
        this.ScaleTo(this.Length() * percentage, anchor);
    }

    ScaleTo(targetWidth: number, anchor: number) {
        const range = this.max - this.min;
        const deltaRange = targetWidth - range;
        this.min -= deltaRange * anchor;
        this.max += deltaRange * (1 - anchor);
    }

    Contains(value: number) {
        const perc = this.GetPercentage(value);
        return perc >= 0 && perc < 1;
    }

    ConvertTo(value: number, targetRange: Range) {
        return targetRange.GetValue(this.GetPercentage(value));
    }
    ConvertFrom(value: number, targetRange: Range) {
        return targetRange.ConvertTo(value, this);
    }

    static Intersects(a: Range, b:Range): boolean {
        return a.Contains(b.min) || a.Contains(b.max) || b.Contains(a.min);
    }
}
export const unitRange: Range = new Range(0, 1);
(window as any).range = Range;