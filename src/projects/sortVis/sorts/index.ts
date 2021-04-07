import ISort from './ISort';
import SelectionSort from './selectionSort';
import CycleSort from './CycleSort';
import HeapSort from './heapSorts/heapSort';
import QuickSort from './quickSort';
import QuickDualPivot from './quickDualPivot';
import MergeSort from './mergeSort';
import WeakHeapSort from './heapSorts/weakHeapSort';
import SmoothSort from './heapSorts/smoothSort';
import InsertionSort from './insertionSort';
import BinaryMSDRadixSort from './radixSorts/BinaryMSDRadixSort';
import HexMSDRadixSort from './radixSorts/HexMSDRadixSort';

const allSortingAlgorithms: ISort[] = [
    new SelectionSort(),
    new InsertionSort(),
    new CycleSort(),
    new HeapSort(),
    new WeakHeapSort(),
    new SmoothSort(),
    new QuickSort(),
    new QuickDualPivot(),
    new MergeSort(),
    new BinaryMSDRadixSort(),
    new HexMSDRadixSort()
];

export default allSortingAlgorithms;