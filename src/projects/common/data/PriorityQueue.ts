export default class PriorityQueue<T> {

    private _data: { value:T, score: number }[];

    public length(): number {
        return this._data.length;
    }

    constructor() {
        this._data = [];
    }

    public pop(): T|undefined {
        return this._data.shift()?.value;
    }

    public peek(): T|undefined {
        if(this._data.length === 0) return undefined;
        return this._data[0].value;
    }

    public push(value: T, score: number): void {
        const index = this.binarySearch(score, 0, this._data.length);
        this._data.splice(index, 0, {value, score});
    }

    public reduceKey(value: T, newScore: number): void {
        const index = this._data.findIndex(e => e.value === value);
        if(index !== -1) {
            this._data.splice(index, 1);
        }
        this.push(value, newScore);
    }

    public getScore(value: T): number|undefined {
        const index = this._data.findIndex(e => e.value === value);
        if(index === -1) return undefined;
        return this._data[index].score;
    }

    private binarySearch(score: number, left: number, right: number): number {
        if(left === right) {
            return left;
        }
        const mid = (left + right) >> 1; // Github Copilot suggested this, interesting way to force js to do integer division! That never occured to me.
        const midValue = this._data[mid].score;
        if(midValue === score) 
            return mid;
        else if(midValue >= score) {
            return this.binarySearch(score, left, Math.max(mid - 1, left));
        }
        else {
            return this.binarySearch(score, Math.min(mid + 1, right), right);
        }
    }
}