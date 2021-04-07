import HeapSort, { getHeapSortDescription } from "../sorts/heapSorts/heapSort";
import InsertionSort, { getInsertionSortDescription } from "../sorts/insertionSort";
import QuickDualPivot, { getQuicksortDualPivotDescription } from "../sorts/quickDualPivot";
import QuickSort, { getQuicksortDescription } from "../sorts/quickSort";
import SelectionSort, { getSelectionSortDescription } from "../sorts/selectionSort";
import SmoothSort, { getSmoothSortDescription } from "../sorts/heapSorts/smoothSort";
import WeakHeapSort, { getWeakHeapSortDescription } from "../sorts/heapSorts/weakHeapSort";
import ISortDescriptor from "./ISortDescriptor";
import MainSortDescriptor from "./SortingAlgorithm";

export interface IDescriptorTree {
    descriptor: ISortDescriptor;
    children?: IDescriptorTree[];
}

const descriptorTree: IDescriptorTree = {
    descriptor: MainSortDescriptor,
    children: [
        { descriptor: { displayName: 'Selection Sort', algorithm: new SelectionSort(), getDescription: getSelectionSortDescription } },
        { descriptor: { displayName: 'Insertion Sort', algorithm: new InsertionSort(), getDescription: getInsertionSortDescription } },
        { descriptor: { displayName: 'Heap Sort', algorithm: new HeapSort(), getDescription: getHeapSortDescription },
          children: [
            { descriptor: { displayName: 'Weak Heap Sort', algorithm: new WeakHeapSort(), getDescription: getWeakHeapSortDescription } },
            { descriptor: { displayName: 'Smooth Sort', algorithm: new SmoothSort(), getDescription: getSmoothSortDescription } }
        ]},
        { descriptor: { displayName: 'Quicksort', algorithm: new QuickSort(), getDescription: getQuicksortDescription },
          children: [
            { descriptor: { displayName: 'Quicksort (Dual Pivot)', algorithm: new QuickDualPivot(), getDescription: getQuicksortDualPivotDescription } },
        ]},
    ]
}

export default descriptorTree;