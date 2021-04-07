import ISort from '../ISort';
import SortState from '../../SortState';
import SortArray from '../../SortArray';
import * as React from 'react';
import { RenderArrayState } from '../../sortDescriptors/RenderArrayState';

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


export function getHeapSortDescription(): JSX.Element {
    return <div>
        <h2>Heap Sort</h2>
        <table className='sortAttributeTable'>
            <tbody>
                <tr>
                    <td>Stable</td>
                    <td>No</td>
                    <td>In-Place</td>
                    <td>Yes</td>
                </tr>
            </tbody>
        </table>
        <hr />
        <p>There are many heap-like sorts, but the most basic of which is a heapsort as implemented here. Heap sorts are some of the very few sorting algorithms which are both very fast in the average case and also strictly in-place, requiring no additional memory, even on the stack.</p>
        <p>Heapsort works by building a heap from the array, and then repeatedly popping the root element of the array and moving it to the end of the array, and then trickling the new root down to an appropriate position</p>
        <p style={{color:'#aaa'}}>(Note: For this discussion of heaps, we'll treat our arrays as starting at 1. I know, it sounds blasphemous, but this is one of the very rare circumstances where starting at 1 makes things easier)</p>
        <p>An array can "implicitly" be treated as a heap without too much difficulty. The first item (at index 1) is the "Root" of the heap, and has the maximum value.</p>
        <p>Each item (including the root) at index [n] has two children, one at [2 * n], and one at [2 * n + 1], which must have values less than the parent. We can visualize the links between parents/children like this:</p>
        {RenderArrayState([10, 6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3], undefined, [
            { from: 0, to: 1, color: '#f00', arcHeight: 4 },
            { from: 0, to: 2, color: '#f00', arcHeight: 4 },
            
            { from: 1, to: 3, color: '#f00', arcHeight: -3 },
            { from: 1, to: 4, color: '#f00', arcHeight: -3 },
            { from: 2, to: 5, color: '#0f0', arcHeight: -3 },
            { from: 2, to: 6, color: '#0f0', arcHeight: -3 },
            
            { from: 3, to: 7, color: '#f00', arcHeight: 2 },
            { from: 3, to: 8, color: '#f00', arcHeight: 2 },
            { from: 4, to: 9, color: '#0f0', arcHeight: 2 },
            { from: 4, to: 10, color: '#0f0', arcHeight: 2 },
            { from: 5, to: 11, color: '#00f', arcHeight: 2 },
            { from: 5, to: 12, color: '#00f', arcHeight: 2 },
            { from: 6, to: 13, color: '#ff0', arcHeight: 2 },
            { from: 6, to: 14, color: '#ff0', arcHeight: 2 },
        ])}
        <hr />
        <h4>Upheap:</h4>
        <p>Since each item has a value smaller than it's parent, the maximum value is always the root. First, we turn our input array into a heap by taking each element one at a time and performing an "Upheap" operation</p>
        <p>To "Upheap" an item, we compare it with it's parent. If it's smaller, we're done. Otherwise, we swap it with it's parent and then try to upheap again, until either it's smaller than it's parent, or it's the new root, like so:</p>
        {RenderArrayState([6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 10], undefined, [
            { from: 6, to: 14, color: '#0f0', arcHeight: 2 },
        ])}
        {RenderArrayState([6, 6, 5, 5, 5, 5, 10, 3, 3, 3, 3, 3, 3, 3, 3], undefined, [
            { from: 2, to: 6, color: '#0f0', arcHeight: 2 },
        ])}
        {RenderArrayState([6, 6, 10, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3], undefined, [
            { from: 0, to: 2, color: '#0f0', arcHeight: 2 },
        ])}
        {RenderArrayState([10, 6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3])}
        <p>Or like this:</p>
        {RenderArrayState([10, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 6], undefined, [
            { from: 6, to: 14, color: '#0f0', arcHeight: 2 },
        ])}
        {RenderArrayState([10, 6, 5, 5, 5, 5, 6, 3, 3, 3, 3, 3, 3, 3, 3], undefined, [
            { from: 2, to: 6, color: '#0f0', arcHeight: 2 },
        ])}
        {RenderArrayState([10, 6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3], undefined, [
            { from: 0, to: 2, color: '#f00', arcHeight: 2 },
        ])}
        {RenderArrayState([10, 6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3])}
        <p>Now we have a valid heap, which we'll use to sort the array.</p>
        <hr />
        <h4>Downheap</h4>
        <p>Since the max item is the first item, we swap it to the end (where it belongs). We'll never look at that element again, and we treat the array as one-element smaller. Now the heap is invalid, as the root is too small, so we "Downheap" it to move it to a valid position, like this:</p>
        <p>First, if it has no children, we're done. If it does have children, we look for a child greater than the parent item. If there is a greater child, we swap the parent and child, and then downheap the moved parent again</p>
        <p>Using our heap constructed above, we would downheap like this:</p>
        {RenderArrayState([10, 6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3], undefined, [{from: 0, to: 14, color: '#0f0'}])}
        {RenderArrayState([3, 6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 10], undefined, [{from: 0, to: 1, color: '#f00'}, {from: 0, to: 2, color: '#0f0'}], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#131'])}
        <p style={{color:'#aaa'}}>(Note: we prioritize the right-child so that we hit the end of the array faster.)</p>
        {RenderArrayState([6, 6, 3, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 10], undefined, [{from: 2, to: 5, color: '#f00'}, {from: 2, to: 6, color: '#0f0'}], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#131'])}
        {RenderArrayState([6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 10], undefined, [{from: 6, to: 13, color: '#f00'}, {from: 6, to: 14, color: '#555'}], [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#131'])}
        <p style={{color:'#aaa'}}>(Note: At this point, this node only has one child. It's "other child" is already a correct value, so we count it as out-of-range)</p>
        {RenderArrayState([6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 10], undefined, undefined, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#131'])}

        <p>Now, we have a valid heap, except that the last element is in it's correct position. We can just swap and downheap again, shrinking the heap by another 1, so on and so forth. Each time we finish downheaping, we get closer to a sorted array, with a valid heap in front:</p>
        {RenderArrayState([6, 6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 10], undefined, undefined, [null, null, null, null, null, null, null, null, null, null, null, null, null, null, '#131'])}
        {RenderArrayState([6, 5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 6, 10], undefined, undefined, [null, null, null, null, null, null, null, null, null, null, null, null, null, '#131', '#131'])}
        {RenderArrayState([5, 5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 6, 6, 10], undefined, undefined, [null, null, null, null, null, null, null, null, null, null, null, null, '#131', '#131', '#131'])}
        {RenderArrayState([5, 5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 5, 6, 6, 10], undefined, undefined, [null, null, null, null, null, null, null, null, null, null, null, '#131', '#131', '#131', '#131'])}
        {RenderArrayState([5, 5, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 6, 6, 10], undefined, undefined, [null, null, null, null, null, null, null, null, null, null, '#131', '#131', '#131', '#131', '#131'])}
        {RenderArrayState([5, 3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 6, 6, 10], undefined, undefined, [null, null, null, null, null, null, null, null, null, '#131', '#131', '#131', '#131', '#131', '#131'])}
        {RenderArrayState([3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 6, 6, 10], undefined, undefined, [null, null, null, null, null, null, null, null, '#131', '#131', '#131', '#131', '#131', '#131', '#131'])}
        
        <p>And once the heap has only one element, you're done!</p>
        {RenderArrayState([3, 3, 3, 3, 3, 3, 3, 3, 5, 5, 5, 5, 6, 6, 10], undefined, undefined, ['#131', '#131', '#131', '#131', '#131', '#131', '#131', '#131', '#131', '#131', '#131', '#131', '#131', '#131', '#131'])}

        <hr />
        <h4>The bad part</h4>
        <p>While heapsort does work quite well on most data, it does have a problem in that building a heap can be slow if the data you're sorting is already nearly sorted. Heapsort doesn't take advantage of runs in the data, and ends up un-sorting the nearly-sorted data during the heap construction</p>
    </div>;
}