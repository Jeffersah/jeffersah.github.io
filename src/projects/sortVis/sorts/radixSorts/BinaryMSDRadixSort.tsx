import ISort from '../ISort';
import SortState from '../../SortState';
import SortArray from '../../SortArray';
import * as React from 'react';
import { RenderArrayState } from '../../sortDescriptors/RenderArrayState';

export default class BinaryMSDRadixSort implements ISort {
    public name = 'MSD Radix (Binary)';

    sort(state: SortState, arr: SortArray): void {
        let radixFlag = 1;
        for(let i = 0; i < arr.length(); i++) {
            const arrV = arr.get(i).value;
            while(radixFlag <= arrV) {
                radixFlag <<= 1;
            }
        }
        radixFlag >>= 1;
        this.bmsdrx_recurse(arr, 0, arr.length(), radixFlag);
    }

    private bmsdrx_recurse(arr: SortArray, start: number, length: number, radix: number) {
        if(radix === 0 || length < 2) return;
        let lp = start, rp = start;
        while(rp < start + length) {
            if((arr.get(rp).value & radix) === 0) {
                if(lp !== rp) arr.swap(lp, rp);
                lp++;
                rp++;
            }
            else {
                rp++;
            }
        }

        this.bmsdrx_recurse(arr, start, lp-start, radix >> 1);
        this.bmsdrx_recurse(arr, lp, rp-lp, radix >> 1);
    }
}


export function getBinaryMSDRadixDescription(): JSX.Element {
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
        <p>There are many radix sorts.</p>
    </div>;
}