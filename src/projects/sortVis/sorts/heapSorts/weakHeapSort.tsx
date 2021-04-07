import ISort from '../ISort';
import SortState from '../../SortState';
import SortArray from '../../SortArray';
import * as React from 'react';

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



export function getWeakHeapSortDescription(): JSX.Element {
    return <div>
        <h2>Weak Heap Sort</h2>
        <table className='sortAttributeTable'>
            <tbody>
                <tr>
                    <td>Stable</td>
                    <td>No</td>
                    <td>In-Place</td>
                    <td>No</td>
                </tr>
            </tbody>
        </table>
        <hr />
        <p>Weak heap sort is a very fast, but somewhat complicated and non-in-place, variant of a heap sort. Instead of building a regular heap, it builds a "weak heap", which is a heap where every element in only the right child must be smaller than the parent, and where the root only has a right child.</p>
        <p>Weak heaps can still be implmemented implicitly with an array (with one small exception, see "memory use" below) but the method by which this is achieved is different from a regular heap sort.</p>
        <p>Like a regular heap sort, Weak Heap Sort first performs a bunch of "Upheap" operations to build a heap, and then repeatedly swaps the root and "Downheaps" to sort the array.</p>
        <p style={{color:'#aaa'}}><i>TODO: Actually write out a good description for weak heap sort</i></p>
        <h4>Memory Use</h4>
        <p>Weak Heap Sort is no longer In-Place (Even Loosely), as it requires <i>one additional bit</i> per item being sorted. That's not a <i>lot</i> of memory, but it does violate in-placeness</p>
        <p>These extra bits are used as flags per-element, which are used to simulate flipping an items left and right children without actually needing to rearrange the items in the array</p>
    </div>;
}