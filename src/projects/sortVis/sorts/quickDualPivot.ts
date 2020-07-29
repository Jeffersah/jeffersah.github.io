import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';

export default class QuickDualPivot implements ISort {
    public name = 'QuickDualPivot';

    sort(state: SortState, arr: SortArray): void {
        this.recurse(arr, 0, arr.length());
    }

    recurse(arr: SortArray, min: number, max: number) {
        if (max - min <= 1) return;
        const pivot = arr.get(min);
        let lp = min + 1;
        let mp = min + 1;
        let rp = max - 1;
        while (mp <= rp) {
            switch (arr.get(mp).compare(pivot)) {
                case 0:
                    mp++;
                    break;
                case -1:
                    arr.swap(lp++, mp++);
                    break;
                case 1:
                    arr.swap(mp, rp--);
                    break;
            }
        }
        arr.swap(min, rp);
        this.recurse(arr, min, lp);
        this.recurse(arr, mp, max);
    }
}