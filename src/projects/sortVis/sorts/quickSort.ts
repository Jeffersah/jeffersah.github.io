import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';

export default class QuickSort implements ISort {
    public name = 'Quicksort';

    sort(state: SortState, arr: SortArray): void {
        this.recurse(arr, 0, arr.length());
    }

    recurse(arr: SortArray, min: number, max: number) {
        if (max - min <= 1) return;
        const pivot = arr.get(min);
        let lp = min + 1;
        let rp = max - 1;
        while (lp <= rp) {
            if (arr.get(lp).compare(pivot) < 0) {
                lp++;
            } else {
                arr.swap(lp, rp--);
            }
        }
        arr.swap(min, rp);
        this.recurse(arr, min, rp);
        this.recurse(arr, rp + 1, max);
    }
}