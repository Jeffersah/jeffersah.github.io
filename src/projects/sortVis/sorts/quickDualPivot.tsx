import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';
import * as React from 'react';
import { RenderArrayState } from '../sortDescriptors/RenderArrayState';

export default class QuickDualPivot implements ISort {
    public name = 'QuickDualPivot';

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

export function getQuicksortDualPivotDescription(): JSX.Element {
    return <div>
        <h2>Quicksort (Dual Pivot)</h2>
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
        <p>Dual-Pivot Quicksort is very similar to regular quicksort, but it chooses two pivots and partitions the list into thirds instead of halves.</p>
        <p>For example, one iteration may look like this:</p>
        {RenderArrayState([4, 3, 2, 5, 1, 6, 7, 6, 8, 9, 10], 20, undefined, ['#a22', '#a22', '#a22', '#a22', '#a22', '#cc0', '#2a2', '#2a2', '#cc0', '#22a', '#22a'])}
        <p>The three sections are (&lt;p1) (&gt;=p1 &amp; &lt;p2) (&gt;=p2)</p>
        <p>Each of these sections is then recursively sorted, as in regular quicksort.</p>
        <p style={{color:'#aaa'}}>Quicksort (even dual-pivot) is Loosely-In-Place. While it doesn't allocate any additional memory, its recursive nature leads to growing the stack. This can result in the stack overflowing when sorting a lot of data.</p>
    </div>;
}