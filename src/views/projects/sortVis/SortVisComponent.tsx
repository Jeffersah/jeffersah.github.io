import * as React from 'react';
import Dropdown from 'react-dropdown';
import ISort from '../../../projects/sortVis/sorts/ISort';
import SelectionSort from '../../../projects/sortVis/sorts/selectionSort';
import SortState from '../../../projects/sortVis/SortState';
import { first } from '../../../LinqLike';
import SortVisPlaybackComponent from './SortVisPlaybackComponent';
import HeapSort from '../../../projects/sortVis/sorts/heapSort';
import QuickSort from '../../../projects/sortVis/sorts/quickSort';
import CycleSort from '../../../projects/sortVis/sorts/CycleSort';
import QuickDualPivot from '../../../projects/sortVis/sorts/quickDualPivot';

const allSortingAlgorithms: ISort[] = [
    new SelectionSort(),
    new CycleSort(),
    new HeapSort(),
    new QuickSort(),
    new QuickDualPivot(),
];

export default function SortVisComponent() {
    const [arrLen, setArrLen] = React.useState(1024);
    const [arrMax, setArrMax] = React.useState(1000);
    const [currentAlgo, setCurrentAlgo] = React.useState<ISort | undefined>(undefined);
    const [runningSortState, setSortState] = React.useState<SortState | undefined>(undefined);

    function runState() {
        const initialValues = new Array(arrLen);
        for (let i = 0; i < initialValues.length; i++) {
            initialValues[i] = Math.floor(Math.random() * arrMax);
        }
        const sortState = new SortState(initialValues);
        currentAlgo.sort(sortState, sortState.getArray(0));
        sortState.seekTo(0);
        setSortState(sortState);
    }

    return <div>
        <div className='center-col'>
            <div>Array Length: <input type='number' value={arrLen} onChange={ch => setArrLen(ch.target.valueAsNumber)} /></div>
            <div>Array Max: <input type='number' value={arrMax} onChange={ch => setArrMax(ch.target.valueAsNumber)} /></div>
            <div>Algorithm: <Dropdown
                options={allSortingAlgorithms.map(algo => algo.name)}
                value={currentAlgo === undefined ? undefined : currentAlgo.name}
                onChange={ch => setCurrentAlgo(first(allSortingAlgorithms, algo => algo.name === ch.value))} /></div>
            <button disabled={arrLen <= 0 || arrMax <= 0 || currentAlgo === undefined} onClick={runState}>Go!</button>
        </div>
        {runningSortState === undefined ? <></> : <>
            <hr />
            <SortVisPlaybackComponent state={runningSortState} />
        </>}
    </div>;
}
