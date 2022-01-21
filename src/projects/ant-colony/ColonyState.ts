import Point from "../common/position/Point";

export class ColonyState {
    public points: Point[];
    public signals: number[][];
    public distances: number[][];
    public maxDist: number;

    constructor(pts: Point[])
    {
        this.points = pts;
        this.initSignals();
    }

    private initSignals () {
        this.signals = [];
        this.distances = [];

        this.maxDist = 0;
        for(let from = 0; from < this.points.length; from++){
            let row = [];
            let distRow = [];
            for(let to = from + 1; to < this.points.length; to++){
                row.push(1);
                let dist = Point.subtract(this.points[from], this.points[to]).length();
                distRow.push(dist);
                if(dist > this.maxDist) this.maxDist = dist;
            }
            this.signals.push(row);
            this.distances.push(distRow);
        }
    }

    setPoints(pts: Point[]){
        this.points = pts;
        this.initSignals();
    }

    clearWeights() {
        for(let i = 0; i < this.signals.length; i++) {
            for(let j = 0; j < this.signals[i].length; j++) {
                this.signals[i][j] = 1;
            }
        }
    }

    multWeights(mult: number) {
        for(let i = 0; i < this.signals.length; i++) {
            for(let j = 0; j < this.signals[i].length; j++) {
                this.signals[i][j] *= mult;
            }
        }
    }

    addWeights(path: number[], weight: number) {
        for(let i = 0; i < path.length; i++) {
            let j = (i + 1) % path.length;
            this.weight(path[i], path[j], Math.max(0, Math.min(1, this.weight(path[i], path[j]) + weight)));
        }
    }

    weight(from: number, to: number): number;
    weight(from: number, to: number, value: number): void;
    weight(from: number, to: number, value?: number): number | void {
        const i1 = Math.min(from, to);
        const i2 = Math.max(from, to) - i1 - 1;
        if(value === undefined) {
            return this.signals[i1][i2];
        }
        else {
            if(isNaN(value)) throw "WHAT";
            this.signals[i1][i2] = value;
        }
    }

    distance(from: number, to: number): number {
        const i1 = Math.min(from, to);
        const i2 = Math.max(from, to) - i1 - 1;
        return this.distances[i1][i2];
    }

    point(index: number): Point;
    point(index: number, point: Point) : void;
    point(index: number, point ?: Point) : void | Point {
        if(point === undefined) return this.points[index];
        this.points[index] = point;
    }
}