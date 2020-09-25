import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';

export default class WeakHeapSort implements ISort {
    public name = 'WeakHeapSort';

    sort(state: SortState, arr: SortArray): void {
        const flipChildren: boolean[] = new Array(arr.length()).fill(false);
        for (let i = arr.length() - 1; i > 0; i--) {
            this.fastUpheap(arr, i, flipChildren);
        }

        for (let i = arr.length() - 1; i > 0; i--) {
            arr.swap(0, i);
            this.downHeap(arr, flipChildren, i);
        }
    }

    downHeap(arr: SortArray, flipChildren: boolean[], limit: number) {
        this.downHeapSingle(arr, 1, flipChildren, limit);
    }

    downHeapSingle(arr: SortArray, index: number, flipChildren: boolean[], limit: number) {
        const siblingIndex = flipChildren[index] ? index * 2 + 1 : index * 2;
        if (siblingIndex < limit) {
            this.downHeapSingle(arr, siblingIndex, flipChildren, limit);
        }
        if (arr.get(0).compare(arr.get(index)) < 0) {
            // DA is smaller than this node. Swap and Flip
            flipChildren[index] = !flipChildren[index];
            arr.swap(0, index);
        }
    }

    fastUpheap(arr: SortArray, index: number, flipChildren: boolean[]) {
        const daIndex = this.fastDistinguishedAncestor(index);
        if (arr.get(daIndex).compare(arr.get(index)) < 0) {
            // DA is smaller than this node. Swap and Flip
            flipChildren[index] = !flipChildren[index];
            arr.swap(daIndex, index);
        }
    }

    fastDistinguishedAncestor(index: number) {
        if (index === 0) return 0;
        while (index % 2 === 0) {
            index /= 2;
        }
        return Math.floor(index / 2);
    }

    distinguishedAncestor(index: number, flipChildren: boolean[]): number {
        const parentIndex = Math.floor(index / 2);
        if (flipChildren[parentIndex] === (index % 2 === 0)) {
            return parentIndex;
        }
        else {
            return this.distinguishedAncestor(parentIndex, flipChildren);
        }
    }
}