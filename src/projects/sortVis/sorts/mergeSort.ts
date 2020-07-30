import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';

export default class MergeSort implements ISort {
    public name = 'MergeSort';

    sort(state: SortState, arr: SortArray): void {
        this.recurse(state, arr, 0, arr.length());
    }

    recurse(state: SortState, arr: SortArray, min: number, max: number) {
        if (max - min <= 1) return;

        // Use the ceiling, so that the left-side is always larger or equal.
        // Then we only need to allocate for the left-side
        const midp = min + Math.ceil((max - min) / 2);
        this.recurse(state, arr, min, midp);
        this.recurse(state, arr, midp, max);

        const sortedArr = state.createArray(max - min, min);
        let lp = min;
        let rp = midp;
        let tp = 0;
        while (lp < midp && rp < max) {
            if (arr.get(lp).compare(arr.get(rp)) <= 0) {
                sortedArr.set(tp, arr.get(lp));
                lp++;
                tp++;
            } else {
                sortedArr.set(tp, arr.get(rp));
                rp++;
                tp++;
            }
        }
        while (lp < midp) {
            sortedArr.set(tp, arr.get(lp));
            lp++;
            tp++;
        }
        while (rp < max) {
            sortedArr.set(tp, arr.get(rp));
            rp++;
            tp++;
        }

        // Copy sorted array back over this array
        for (let i = 0; i < max - min; i++) {
            arr.set(i + min, sortedArr.get(i));
        }

        state.deleteArray(sortedArr);
    }
}