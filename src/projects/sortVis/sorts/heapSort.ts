import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';

export default class HeapSort implements ISort {
    public name = 'HeapSort';

    sort(state: SortState, arr: SortArray): void {
        for (let i = 0; i < arr.length(); i++) {
            this.upHeap(arr, i);
        }

        for (let i = arr.length() - 1; i > 0; i--) {
            arr.swap(0, i);
            this.downHeap(arr, i);
        }
    }

    upHeap(arr: SortArray, index: number) {
        while (index > 0) {
            const val = arr.get(index);
            const parentIndex = this.parentIndex(index);
            const pval = arr.get(parentIndex);
            if (val.compare(pval) > 0) {
                arr.swap(index, parentIndex);
                index = parentIndex;
            }
            else {
                break;
            }
        }
    }

    downHeap(arr: SortArray, length: number) {
        let idx = 0;
        while (idx < length) {
            const cidx = this.childIndex(idx);
            // no children in range - done!
            if (cidx >= length) return;
            // Find my max child index
            let maxChildIdx = cidx;
            if (cidx + 1 < length) {
                if (arr.get(maxChildIdx).compare(arr.get(maxChildIdx + 1)) <= 0) {
                    maxChildIdx++;
                }
            }

            if (arr.get(idx).compare(arr.get(maxChildIdx)) < 0) {
                // I'm smaller - swap down and continue
                arr.swap(idx, maxChildIdx);
                idx = maxChildIdx;
            } else {
                return;
            }
        }
    }

    parentIndex(index: number) {
        return Math.floor((index - 1) / 2);
    }

    childIndex(index: number) {
        return index * 2 + 1;
    }
}