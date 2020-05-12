import { Range } from './Range';

export class Range2d {
    constructor(public xRange: Range, public yRange: Range) { } 

    public GetValue(xPercent: number, yPercent: number) {
        return { x: this.xRange.GetValue(xPercent), y: this.yRange.GetValue(yPercent) };
    }

    public GetPercentage(xValue: number, yValue: number) {
        return { x: this.xRange.GetPercentage(xValue), y: this.yRange.GetPercentage(yValue) };
    }

    public Shift(xAmt: number, yAmt: number) {
        this.xRange.Shift(xAmt);
        this.yRange.Shift(yAmt);
    }
    public ShiftByPercentage(xShift: number, yShift: number) {
        this.xRange.ShiftByPercentage(xShift);
        this.yRange.ShiftByPercentage(yShift);
    }

    public AspectScale(percent: number, xAnchor: number = 0.5, yAnchor: number = 0.5){
        return this.Scale(percent, xAnchor, percent, yAnchor);
    }
    public Scale(xPercent: number, xAnchor: number, yPercent: number, yAnchor: number) {
        this.xRange.Scale(xPercent, xAnchor);
        this.yRange.Scale(yPercent, yAnchor);
    }

    public ConvertTo(value: {x: number, y: number}, target: Range2d)
    {
        const intermediate = this.GetPercentage(value.x, value.y);
        return target.GetValue(intermediate.x, intermediate.y);
    }
}