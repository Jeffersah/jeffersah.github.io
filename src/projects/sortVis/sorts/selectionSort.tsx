import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';
import * as React from 'react';

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

export function getSelectionSortDescription(): JSX.Element {
    return <div>
        <h2>Selection Sort</h2>
        <table className='sortAttributeTable'>
            <tbody>
                <tr>
                    <td>Stable</td>
                    <td>Yes</td>
                    <td>In-Place</td>
                    <td>Yes</td>
                </tr>
            </tbody>
        </table>
        <hr />
        <p>Selection sort is one of the basic sorting algorithms. It's probably one of the first solutions you'd think of to solve this problem.</p>
        <p>Selection sort finds the minimum element, and moves it to the beginning. Then it finds the next smallest, and moves it to the second index. Then the third smallest, and moves it to the third index, so on and so forth.</p>
        <p>This algorithm is very easy to write and very simple, but unfortunately, it's quite slow. For sorting large numbers of items, selection sort will spend a long time iterating over the whole array over and over again.</p>
    </div>
}