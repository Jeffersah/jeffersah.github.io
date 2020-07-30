import IDelta from './IDelta';
import EComplexity from './EComplexity';
import SortArray from '../SortArray';
import SortState from '../SortState';

export class CreateSubArray implements IDelta {
    complexity: EComplexity;
    type = 'createSubArray';
    constructor(public array: SortArray, public startingSize: number, public offset: number) {
        this.complexity = EComplexity.Get;
    }
    apply(state: SortState): void {
        this.array.internalFill(new Array(this.startingSize));
        state.internalCreateArray(this.array);
    }
    rollback(state: SortState): void {
        state.internalRemoveArray(this.array);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class DeleteSubArray implements IDelta {
    complexity: EComplexity;
    type = 'deleteSubArray';
    constructor(public array: SortArray, private endingData: number[]) {
        this.complexity = EComplexity.Get;
    }
    apply(state: SortState): void {
        state.internalRemoveArray(this.array);
    }
    rollback(state: SortState): void {
        this.array.internalFill(this.endingData);
        state.internalCreateArray(this.array);
    }
}