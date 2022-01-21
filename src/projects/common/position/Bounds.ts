import Line from "./Line";
import Point from "./Point";

export default class Bounds {
    constructor(public position: Point, public size: Point, public origin: Point, public rotation: number)
    {

    }

    getVertecies(): Point[] {
        let relativePoints = [
            new Point(0, 0),
            new Point(this.size.x, 0),
            new Point(this.size.x, this.size.y),
            new Point(0, this.size.y)
        ];

        relativePoints = relativePoints.map(pt => Point.subtract(pt, this.origin));
        relativePoints = relativePoints.map(pt => {
            const angle = Math.atan2(pt.y, pt.x);
            const dist = pt.length();
            return Point.fromAngle(angle + this.rotation, dist);
        });
        relativePoints = relativePoints.map(pt => Point.add(pt, this.position));
        return relativePoints;
    }

    getEdges(): Line[] {
        return this.getVertecies().map((pt, idx, arr) => new Line(pt, arr[(idx + 1) % arr.length]));
    }

    findLineIntersection(line: Line): number | null  {
        let edges = this.getEdges();
        let minLinePerc: number | null = null;
        for(let i = 0; i < edges.length; i++) {
            let colision = Line.intersection(line, edges[i]);
            if( colision.percentA >= 0 && 
                colision.percentA < 1 && 
                colision.percentB >= 0 && 
                colision.percentB < 1 &&
                (minLinePerc === null || colision.percentA < minLinePerc)) {
                    minLinePerc = colision.percentA;
            }
        }
        return minLinePerc;
    }
}