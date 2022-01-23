import Point from "../common/position/Point";

export default class HexArray<T> {
    private data: T[][];
    private _size: number;

    constructor(size: number, defaultValue: T) {
        this._size = size;
        this.data = [];
        let midRowLength = size*2 - 1;
        for(let dy = -size+1; dy <= size-1; dy++){
            let row: T[] = [];
            for(let dx = 0; dx < midRowLength - Math.abs(dy); dx++){
                row.push(defaultValue);
            }
            this.data.push(row);
        }
    }

    public size() {
        return this._size;
    }

    public get(x: number, y: number): T;
    public get(pt: Point): T;
    public get(pt: [number, number]): T;
    public get(xp: number|Point|[number, number], yp?: number): T {
        const [x, y] = this.extractInputCoords(xp, yp);
        let [dx, row] = this.toArrayCoords(x, y);
        return this.data[row][dx];
    }

    public set(value: T, x: number, y: number): void;
    public set(value: T, pt: Point): void;
    public set(value: T, pt: [number, number]): void;
    public set(value: T, xp: number|Point|[number, number], yp?: number): void {
        const [x, y] = this.extractInputCoords(xp, yp);
        const [dx, row] = this.toArrayCoords(x, y);
        this.data[row][dx] = value;
    }

    private extractInputCoords(xp: number|Point|[number, number], y?: number): [number, number] {
        if(typeof xp === "number"){
            return [xp as number, y];
        }
        else if ((xp as Point).x !== undefined) {
            return [(xp as Point).x, (xp as Point).y];
        }
        else {
            return xp as [number, number];
        }
    }

    public getRowLength(y: number): number {
        return this._size * 2 - 1 - Math.abs(y);
    }

    public isInBounds(x: number, y: number): boolean {
        if(y <= -this._size || y >= this._size) {
            return false;
        }
        let [xMin, xMax] = this.getXRange(y);
        return x >= xMin && x < xMax;
    }

    public getXRange(y: number): [number, number] {
        const minX = this.getMinX(y);
        const len = this.getRowLength(y);
        return [minX, minX + len];
    }

    public getMinX(y: number): number {
        const row = this._size - 1 + y;
        return -Math.min(row, this._size - 1);
    }

    public iterate(func: (x: number, y: number, value: T) => void) {
        for(let y = -this._size+1; y < this._size; y++) {
            let [xMin, xMax] = this.getXRange(y);
            for(let x = xMin; x < xMax; x++) {
                func(x, y, this.get(x, y));
            }
        }
    }

    private toArrayCoords(x: number, y: number): [number, number] {
        const row = this._size - 1 + y;
        const firstX = -Math.min(row, this._size - 1);
        const dx = x - firstX;

        return [dx, row];
    }
}