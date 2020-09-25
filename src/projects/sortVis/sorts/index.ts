import ISort from './ISort';
import SelectionSort from './selectionSort';
import CycleSort from './CycleSort';
import HeapSort from './heapSort';
import QuickSort from './quickSort';
import QuickDualPivot from './quickDualPivot';
import MergeSort from './mergeSort';
import WeakHeapSort from './weakHeapSort';

const allSortingAlgorithms: ISort[] = [
    new SelectionSort(),
    new CycleSort(),
    new HeapSort(),
    new WeakHeapSort(),
    new QuickSort(),
    new QuickDualPivot(),
    new MergeSort(),
];

export default allSortingAlgorithms;