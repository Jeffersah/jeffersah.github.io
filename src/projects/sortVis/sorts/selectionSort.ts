import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';

export default class SelectionSort implements ISort {
    public name = 'SelectionSort';

    sort(state: SortState, arr: SortArray): void {
        for (let tgtIndex = 0; tgtIndex < arr.length(); tgtIndex++) {
            let minV = arr.get(tgtIndex);
            let minI = tgtIndex;
            for (let swpIndex = tgtIndex + 1; swpIndex < arr.length(); swpIndex++) {
                const v = arr.get(swpIndex);
                if (v.compare(minV) < 0) {
                    minV = v;
                    minI = swpIndex;
                }
            }
            if (minI !== tgtIndex) {
                arr.swap(tgtIndex, minI);
            }
        }
    }
}