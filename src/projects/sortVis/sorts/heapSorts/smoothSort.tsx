import ISort from '../ISort';
import SortState from '../../SortState';
import SortArray from '../../SortArray';
import * as React from 'react';

export default class SmoothSort implements ISort {
    public name = 'SmoothSort';
    private heapChildDist: number[];
    private heapPrevDist: number[];

    constructor() {
        this.heapChildDist = [0, 0, 2];
        this.heapPrevDist = [1, 1];
    }

    sort(state: SortState, arr: SortArray): void {
        const orders: number[] = [];
        for (let i = 0; i < arr.length(); i++) {
            this.growHeap(arr, orders, i);
        }

        for (let i = arr.length() - 1; i >= 1; i--) {
            this.shrinkHeap(arr, orders, i);
        }
    }

    growHeap(array: SortArray, orders: number[], index: number) {
        if (orders.length >= 2 && orders[orders.length - 2] === orders[orders.length - 1] + 1) {
            const newSize = orders[orders.length - 2] + 1;
            orders.pop();
            orders.pop();
            orders.push(newSize);
        }
        else if (orders.length > 0 && orders[orders.length - 1] === 1) {
            orders.push(0);
        }
        else {
            orders.push(1);
        }
        this.trinkle(array, orders, index, orders.length - 1);
    }

    shrinkHeap(array: SortArray, orders: number[], index: number) {
        const order = orders.pop();
        if (!this.hasChildren(order)) {
            return;
        }
        orders.push(order - 1);
        orders.push(order - 2);
        this.trinkle(array, orders, this.leftChildIndex(index, order), orders.length - 2);
        this.trinkle(array, orders, index - 1, orders.length - 1);
    }

    trinkle(array: SortArray, orders: number[], index: number, orderIndex: number) {
        if (orderIndex !== 0) {
            let selfValue = this.trinkleMax(array, index, orders[orderIndex]);
            for (let swapTo = orderIndex - 1; swapTo >= 0; swapTo--) {
                const tgtHead = this.previousHeapIndex(index, orders[orderIndex]);
                if (array.get(tgtHead).compare(selfValue) > 0) {
                    array.swap(tgtHead, index);
                    index = tgtHead;
                    orderIndex = swapTo;
                    selfValue = this.trinkleMax(array, index, orders[orderIndex]);
                } else {
                    break;
                }
            }
        }
        this.heapDown(array, index, orders[orderIndex]);
    }

    trinkleMax(array: SortArray, index: number, order: number) {
        if (this.hasChildren(order)) {
            let max = array.get(index);
            const c1 = array.get(index - 1);
            max = max.compare(c1) >= 0 ? max : c1;
            const c2 = array.get(this.leftChildIndex(index, order));
            max = max.compare(c2) >= 0 ? max : c2;
            return max;
        }
        return array.get(index);
    }

    heapDown(array: SortArray, index: number, order: number) {
        if (!this.hasChildren(order)) return;
        const leftChildIdx = this.leftChildIndex(index, order);
        const rightChildIdx = index - 1;
        const leftChildOrder = order - 1;
        const rightChildOrder = order - 2;
        if (array.get(leftChildIdx).compare(array.get(rightChildIdx)) > 0) {
            this.heapDownCompare(array, index, leftChildIdx, leftChildOrder);
        }
        else {
            this.heapDownCompare(array, index, rightChildIdx, rightChildOrder);
        }
    }

    heapDownCompare(array: SortArray, index: number, childIndex: number, childOrder: number) {
        if (array.get(childIndex).compare(array.get(index)) > 0) {
            array.swap(index, childIndex);
            this.heapDown(array, childIndex, childOrder);
        }
    }

    hasChildren(order: number) {
        return order > 1;
    }

    leftChildIndex(index: number, order: number): number {
        return index - this.getHeapChildDist(order);
    }

    previousHeapIndex(index: number, order: number): number {
        return index - this.getHeapPrevDist(order);
    }
    
    getHeapChildDist(order: number): number {
        while (order >= this.heapChildDist.length) {
            this.heapChildDist.push(
                this.heapChildDist[this.heapChildDist.length - 1]
                + this.heapChildDist[this.heapChildDist.length - 2]);
        }
        return this.heapChildDist[order];
    }

    getHeapPrevDist(order: number): number {
        while (order >= this.heapPrevDist.length) {
            this.heapPrevDist.push(
                this.heapPrevDist[this.heapPrevDist.length - 1]
                + this.heapPrevDist[this.heapPrevDist.length - 2]
                + 1);
        }
        return this.heapPrevDist[order];
    }
}

export function getSmoothSortDescription(): JSX.Element {
    return <div>
        <h2>Smooth Sort</h2>
        <table className='sortAttributeTable'>
            <tbody>
                <tr>
                    <td>Stable</td>
                    <td>No</td>
                    <td>In-Place</td>
                    {/* TODO: Check if it's in-place */}
                    <td>Yes</td>
                </tr>
            </tbody>
        </table>
        <hr />
        <p>Smoothsort is a very fast heap-like sorting algorithm which uses a fibonacci heap instead of a typical binary heap to speed up heap construction</p>
        <p style={{color:'#aaa'}}><i>TODO: Actually write out a good description for smooth sort</i></p>
    </div>;
}