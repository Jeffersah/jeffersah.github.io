import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';
import * as React from 'react';

export default class InsertionSort implements ISort {
    public name = 'InsertionSort';

    sort(state: SortState, arr: SortArray): void {
        for (let nextIndex = 2; nextIndex < arr.length(); nextIndex++) {
            for(let slideBack = nextIndex - 1; slideBack >= 0; slideBack--) {
                if(arr.get(slideBack).compare(arr.get(slideBack+1)) < 0) break;
                arr.swap(slideBack, slideBack + 1);
            }
        }
    }
}

export function getInsertionSortDescription(): JSX.Element {
    return <div>
        <h2>Insertion Sort</h2>
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
        <p>Insertion sort is one of the basic sorting algorithms. It's probably one of the first solutions you'd think of to solve this problem.</p>
        <p>Insertion sort grows a sorted array from left-to-right by shifting the next unsorted element left until it's in the right place.</p>
        <p>Insertion sort is quick for very small numbers of elements, but quickly becomes very slow as you sort larger arrays. For this reason, some algorithms will switch to insertion sort for very small input lists, but otherwise, you're better off with a different algorithm</p>
        <p style={{color:'#aaa'}}>Ok, technically, as implemented here, this is a "Gnome sort" and not an insertion sort. Real insertion sorts don't shift one element at a time, but rather binary search and then insert the sorted element at the correct location.</p>
        <p style={{color:'#888'}}>However, this implies you're inserting elements into a list which can grow as you push elements to it. In reality, inserting an element to the middle of the list will USUALLY result in the rest of the items being shifted right, one at a time.</p>
        <p style={{color:'#666'}}>So, a "real" insertion sort would faster than as implemented here, but only measuring by number of comparisons, not swaps, and the way it is now I can write it in like, five lines of code, and I think that's neat.</p>
        <p style={{color:'#444'}}>And also, it's easier to follow what's happening without a binary search making things tricky. But anyway, this is getting pedantic, so I'm going to accelerate this fade out so you don't have to read any more</p>
    </div>
}