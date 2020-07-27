import SortState from './SortState';
import Record from './Record';
import { DeleteSubArray } from './delta/SubArray';
import { Get, Swap, Copy as Copy } from './delta/SimpleOperations';

export default class SortArray {
    private data: Record[];
    constructor(private state: SortState, public arrayId: number, data: number[]) {
        this.data = [];
        for (let i = 0; i < data.length; i++) {
            this.data.push(new Record(state, this, data[i], i));
        }
    }

    public length () {
        return this.data.length;
    }

    public get(index: number): Record {
        // Don't record get accesses, it'll just clog everything up
        // this.state.deltas.push(new Get(this.arrayId, index));
        return this.data[index];
    }

    public swap(i1: number, i2: number) {
        this.state.pushDelta(new Swap(this, i1, this, i2));
        const tmp = this.data[i1].value;
        this.data[i1].value = this.data[i2].value;
        this.data[i2].value = tmp;
    }

    public set(index: number, r: Record) {
        this.state.pushDelta(new Copy(r.array, r.index, this, index, this.data[index].value));
        this.data[index].value = r.value;
    }

    public getDeleteDelta() {
        return new DeleteSubArray(this, this.data.map(d => d.value));
    }

    public internalSet(index: number, value: number) {
        this.data[index].value = value;
    }

    public internalSwap(i1: number, i2: number) {
        const tmp = this.data[i1].value;
        this.data[i1].value = this.data[i2].value;
        this.data[i2].value = tmp;
    }

    public internalGet(index: number): Record {
        return this.data[index];
    }

    public internalFill (data: number[]) {
        this.data = [];
        for (let i = 0; i < data.length; i++) {
            this.data.push(new Record(this.state, this, data[i], i));
        }
    }
}