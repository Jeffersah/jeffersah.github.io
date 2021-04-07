import ISort from '../ISort';
import SortState from '../../SortState';
import SortArray from '../../SortArray';
import * as React from 'react';
import { RenderArrayState } from '../../sortDescriptors/RenderArrayState';

export default class HexMSDRadixSort implements ISort {
    public name = 'MSD Radix (Hex)';

    sort(state: SortState, arr: SortArray): void {
        let radixFlag = 0b1111;
        for(let i = 0; i < arr.length(); i++) {
            const arrV = arr.get(i).value;
            while(radixFlag < arrV) {
                radixFlag <<= 1;
            }
        }
        this.hmsdrx_recurse(state, arr, 0, arr.length(), radixFlag);
    }

    private hmsdrx_recurse(state: SortState, arr: SortArray, start: number, length: number, radix: number) {
        if(radix === 0 || length < 2) return;
        let rightShift = 0;
        while((radix >> rightShift) > 0b1111) rightShift++;
        const subArrs = [];
        for(let i = 0; i < 16; i++)
            subArrs.push(state.createArray());
        for(let ptr = start; ptr < start + length; ptr ++) {
            const record = arr.get(ptr);
            const category = (record.value & radix) >> rightShift;
            subArrs[category].push(record);
        }
        let arrlens = [];
        let offset = 0;
        for(let i = 0; i < 16; i++) {
            arrlens.push(subArrs[i].length())
            for(let j = 0; j < subArrs[i].length(); j++) {
                arr.set(start + (offset++), subArrs[i].get(j));
            }
        }
        for(let i = 0; i < 16; i++) {
            state.deleteArray(subArrs[i]);
        }
        offset = 0;
        for(let i = 0; i < 16; i++) {
            if(arrlens[i] === 0) continue;
            this.hmsdrx_recurse(state, arr, start + offset, arrlens[i], radix >> 4);
            offset += arrlens[i];
        }
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