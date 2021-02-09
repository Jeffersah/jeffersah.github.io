import Point from "./Point";
import { Range } from '../Range';

export default class Line {

    constructor(public start: Point, public end: Point)
    {

    }

    ray(): Point {
        return Point.subtract(this.end, this.start);
    }

    midpoint(): Point {
        return Point.interpolate(this.start, this.end, 0.5);
    }

    interpolate(p: number): Point {
        return Point.interpolate(this.start, this.end, p);
    }

    static intersection(a: Line, b: Line): { percentA: number, percentB: number } {
        const denom = (a.start.x - a.end.x) * (b.start.y - b.end.y) - (a.start.y - a.end.y) * (b.start.x - b.end.x);

        if(denom === 0) {
            return Line.parallelIntersection(a, b);
        }
        const percentA = ((a.start.x - b.start.x) * (b.start.y - b.end.y) - (a.start.y - b.start.y) * (b.start.x - b.end.x)) / denom;
        const percentB = ((a.end.x - a.start.x) * (a.start.y - b.start.y) - (a.end.y - a.start.y) * (a.start.x - b.start.x)) / denom;

        return { percentA, percentB };
    }

    private static parallelIntersection(a: Line, b: Line): { percentA: number, percentB: number } | null {
        const basis = a.ray().normalize();
        function getBasisValue(pt: Point) {
            return Point.Dot(Point.subtract(pt, a.start), basis);
        }
        let aRange = new Range(getBasisValue(a.start), getBasisValue(a.end));
        let bRange = new Range(getBasisValue(b.start), getBasisValue(b.end));

        let bMinP = aRange.GetPercentage(bRange.min);
        let bMaxP = aRange.GetPercentage(bRange.max);
        
        if(Math.abs(bMinP) <= Math.abs(bMaxP)) {
            return { percentA: bMinP, percentB: 0 };
        }  else {
            return { percentA: bMaxP, percentB: 1 };
        }
    }
}