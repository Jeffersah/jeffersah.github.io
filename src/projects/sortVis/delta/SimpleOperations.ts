import IDelta from './IDelta';
import EComplexity from './EComplexity';
import SortState from '../SortState';
import SortArray from '../SortArray';

export class Get implements IDelta {
    complexity: EComplexity;
    type = 'get';
    constructor(public array: SortArray, public index: number) {
        this.complexity = EComplexity.Get;
    }
    apply(state: SortState): void { return; }
    rollback(state: SortState): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
export class Compare implements IDelta {
    complexity: EComplexity;
    type = 'compare';
    constructor(public array1: SortArray, public index1: number, public array2: SortArray, public index2: number) {
        this.complexity = EComplexity.Get;
    }
    apply(state: SortState): void { return; }
    rollback(state: SortState): void { return; }
}

// tslint:disable-next-line: max-classes-per-file
export class Set implements IDelta {
    complexity: EComplexity;
    type = 'set';
    constructor(public array: SortArray, public index: number, private oldValue: number, private newValue: number) {
        this.complexity = EComplexity.Set;
    }
    apply(state: SortState): void {
        this.array.internalSet(this.index, this.newValue);
    }
    rollback(state: SortState): void {
        this.array.internalSet(this.index, this.oldValue);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class Copy implements IDelta {
    type = 'copy';
    complexity: EComplexity;
    constructor(public srcArray: SortArray, public srcIndex: number, public tgtArray: SortArray, public tgtIndex: number, private replacedValue: number) {
        this.complexity = EComplexity.Set;
    }
    apply(state: SortState): void {
        this.tgtArray.internalSet(this.tgtIndex, this.srcArray.internalGet(this.srcIndex).value);
    }
    rollback(state: SortState): void {
        this.tgtArray.internalSet(this.tgtIndex, this.replacedValue);
    }
}

// tslint:disable-next-line: max-classes-per-file
export class Swap implements IDelta {
    type = 'swap';
    complexity: EComplexity;
    constructor(public srcArray: SortArray, public srcIndex: number, public tgtArray: SortArray, public tgtIndex: number) {
        this.complexity = EComplexity.Swap;
    }
    apply(state: SortState): void {
        const v1 = this.srcArray.internalGet(this.srcIndex).value;
        this.srcArray.internalSet(this.srcIndex, this.tgtArray.internalGet(this.tgtIndex).value);
        this.tgtArray.internalSet(this.tgtIndex, v1);
    }
    rollback(state: SortState): void {
        this.apply(state);
    }
}