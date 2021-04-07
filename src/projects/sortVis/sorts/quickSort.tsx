import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';
import * as React from 'react';
import { RenderArrayState } from '../sortDescriptors/RenderArrayState';

export default class QuickSort implements ISort {
    public name = 'Quicksort';

    sort(state: SortState, arr: SortArray): void {
        this.recurse(arr, 0, arr.length());
    }

    recurse(arr: SortArray, min: number, max: number) {
        if (max - min <= 1) return;

        // Use a random-element pivot
        const pivLocation = Math.floor(min + Math.random() * (max - min));
        arr.swap(min, pivLocation);

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


export function getQuicksortDescription(): JSX.Element {
    return <div>
        <h2>Quicksort</h2>
        <table className='sortAttributeTable'>
            <tbody>
                <tr>
                    <td>Stable</td>
                    <td>No</td>
                    <td>In-Place</td>
                    <td>Yes*</td>
                </tr>
            </tbody>
        </table>
        <hr />
        <p>Quicksort, as the name implies, is a quick divide-and-conquer sorting algorithm.</p>
        <p>Quicksort first picks a pivot element. Different algorithms do this in slightly different ways, some pick the first element, some pick the last, some take a median of three elements.</p>
        <p style={{color:'#aaa'}}>The implementation in the visualizer picks a random pivot element. For our example, we'll pick the first element, and mark it in yellow.</p>
        {RenderArrayState([6, 3, 10, 6, 8, 4, 1, 9, 7, 5, 2], 20, undefined, ['#cc0'])}
        <p>Then, each other element is checked against the pivot. If it is less than the pivot, it's moved to the left. Otherwise, it's moved to the right.</p>
        {RenderArrayState([6, 3, 2, 5, 1, 4, 8, 9, 7, 6, 10], 20, undefined, ['#cc0', '#a00', '#a00', '#a00', '#a00', '#a00', '#0a0', '#0a0', '#0a0', '#0a0', '#0a0'])}
        <p>This partitions the data between elements less than the pivot and elements greater than the pivot. The pivot is then swapped to the middle, which will be it's final location</p>
        {RenderArrayState([4, 3, 2, 5, 1, 6, 8, 9, 7, 6, 10], 20, [{ from: 0, to: 5, color: '#0f0'}], ['#a00', '#a00', '#a00', '#a00', '#a00', '#cc0', '#0a0', '#0a0', '#0a0', '#0a0', '#0a0'])}
        <p>Now the array is split into three sections. The left is a smaller, unsorted array. The right is a smaller unsorted array. The middle is a pivot, which won't move again.</p>
        <p>That means we can just run this algorithm again, twice! We recursively quicksort the left side, then the right side. Each side will pick a pivot, split the list again, and then recurse.</p>
        <p>The list will keep subdividing and subdividing until each sub-list is 1 element long, at which point the list is sorted.</p>
        <hr />
        <p>While quicksort is usually reasonably fast in the average case, it's not guaranteed to be fast in all cases. Bad choices of pivot can degrade the speed of quicksort down to the point of the trivial-slow algorithms, like Insertion and Selection sort.</p>
        <p>Also, quicksort can spend a lot of time recursively sorting small, nearly-sorted lists at the "bottom" of the recursion. For this reason, Quicksort is often implemented as a hybrid algorithm which may switch to insertion sort when the list being sorted gets small enough.</p>
        <p style={{color:'#aaa'}}>Quicksort is Loosely-In-Place. While it doesn't allocate any additional memory, its recursive nature leads to growing the stack. This can result in the stack overflowing when sorting a lot of data.</p>
    </div>;
}