import IDelta from './delta/IDelta';
import SortArray from './SortArray';
import { CreateSubArray, DeleteSubArray } from './delta/SubArray';
import EComplexity from './delta/EComplexity';

export default class SortState {
    private deltas: IDelta [];
    public arrays: SortArray [];
    private nextArrayId: number;
    public currentDeltaIndex: number;
    public maxValue: number;
    private initialValue: number[];

    constructor(data: number[]) {
        this.initialValue = data;
        this.deltas = [];
        this.arrays = [
            new SortArray(this, 0, data)
        ];
        this.maxValue = 0;
        for (const d of data) {
            if (d > this.maxValue) this.maxValue = d;
        }
        this.nextArrayId = 1;
        this.currentDeltaIndex = 0;
    }

    pushDelta(delta: IDelta) {
        this.deltas.push(delta);
        this.currentDeltaIndex ++;
    }

    totalDeltas(): number {
        return this.deltas.length;
    }

    deltaIndex(): number {
        return this.currentDeltaIndex;
    }

    remainingStepsFwd(): number {
        return this.deltas.length - this.currentDeltaIndex;
    }

    remainingStepsBack(): number {
        return this.currentDeltaIndex;
    }

    seekTo(tgt: number) {
        const deltaHere = Math.abs(tgt - this.currentDeltaIndex);
        const deltaStart = tgt;
        const deltaEnd = this.deltas.length - tgt;

        if (deltaStart <= deltaEnd && deltaStart <= deltaHere) {
            // Skip to start, seek from there
            this.arrays = [
                this.arrays[0]
            ];
            this.arrays[0].internalFill(this.initialValue);
            this.currentDeltaIndex = 0;
        }
        else if (deltaEnd <= deltaStart && deltaEnd <= deltaHere) {
            // Skip to end, seek from there
            // (Can't currently seek to end - save the terminal state?)
        }

        this.seekToInternal(tgt);
    }

    private seekToInternal(tgt: number) {
        while (tgt > this.currentDeltaIndex) this.apply();
        while (tgt < this.currentDeltaIndex) this.rollback();
    }

    apply(): IDelta|undefined {
        if (this.currentDeltaIndex === this.deltas.length) return undefined;
        this.deltas[this.currentDeltaIndex].apply(this);
        return this.deltas[this.currentDeltaIndex++];
    }

    applyUntil(maxSteps: number, complexity: EComplexity): IDelta[] {
        const result: IDelta[] = [];
        for (let step = 0; maxSteps === -1 || step < maxSteps; step++) {
            const stepResult = this.apply();
            if (stepResult === undefined) return result;
            result.push(stepResult);
            if (stepResult.complexity >= complexity)  return result;
        }
        return result;
    }

    rollback(): IDelta|undefined {
        if (this.currentDeltaIndex === 0) return undefined;
        this.deltas[--this.currentDeltaIndex].rollback(this);
        return this.deltas[this.currentDeltaIndex];
    }

    rollbackUntil(maxSteps: number, complexity: EComplexity): IDelta[] {
        const result: IDelta[] = [];
        for (let step = 0; maxSteps === -1 || step < maxSteps; step++) {
            const stepResult = this.rollback();
            if (stepResult === undefined) return result;
            result.push(stepResult);
            if (stepResult.complexity >= complexity)  return result;
        }
        return result;
    }

    getArray(index: number): SortArray {
        return this.arrays[index];
    }

    createArray(): SortArray {
        const newArr = new SortArray(this, this.nextArrayId++, []);
        this.arrays.push(newArr);
        this.deltas.push(new CreateSubArray(newArr, 0, 0));
        return newArr;
    }

    deleteArray(arr: SortArray) {
        this.deltas.push(arr.getDeleteDelta());
        this.internalRemoveArray(arr);
    }

    internalCreateArray(arr: SortArray) {
        this.arrays.push(arr);
    }

    internalRemoveArray(arr: SortArray) {
        for (let i = 0; i < this.arrays.length; i++) {
            if (this.arrays[i] === arr) {
                this.arrays.splice(i, 1);
                return;
            }
        }
    }
}