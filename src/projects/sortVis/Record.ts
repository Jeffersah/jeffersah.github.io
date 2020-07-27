import SortState from './SortState';
import { Compare } from './delta/SimpleOperations';
import SortArray from './SortArray';

export default class Record {
    constructor(private state: SortState, public array: SortArray, public value: number, public index: number) {

    }

    public compare(other: Record): number {
        this.state.pushDelta(new Compare(this.array, this.index, other.array, other.index));
        return this.value - other.value;
    }
}