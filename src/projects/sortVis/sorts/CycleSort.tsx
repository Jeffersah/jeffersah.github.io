import ISort from './ISort';
import SortState from '../SortState';
import SortArray from '../SortArray';
import * as React from 'react';

export default class CycleSort implements ISort {
    public name = 'CycleSort';

    sort(state: SortState, arr: SortArray): void {
        const isInFinalPosition = new Array(arr.length());
        for (let i = 0; i < isInFinalPosition.length; i++) {
            isInFinalPosition[i] = false;
        }
        for (let tgtIndex = 0; tgtIndex < arr.length() - 1;) {
            if (isInFinalPosition[tgtIndex]) {
                tgtIndex++;
                continue;
            }
            const item = arr.get(tgtIndex);
            let index = tgtIndex;
            for (let swapIndex = tgtIndex + 1; swapIndex < arr.length(); swapIndex++) {
                if (arr.get(swapIndex).compare(item) <= 0) index ++;
            }

            while (arr.get(index).compare(item) === 0 && index > tgtIndex) index--;

            if (index === tgtIndex) tgtIndex++;
            else {
                arr.swap(tgtIndex, index);
                isInFinalPosition[index] = true;
            }
        }
    }
}