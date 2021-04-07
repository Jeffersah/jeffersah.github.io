import * as React from 'react';
import Dropdown from 'react-dropdown';
import ISort from '../../../projects/sortVis/sorts/ISort';
import SortState from '../../../projects/sortVis/SortState';
import { first } from '../../../LinqLike';
import SortVisPlaybackComponent from './SortVisPlaybackComponent';
import IDataGenerator from '../../../projects/sortVis/dataGenerator/IDataGenerator';
import allSortingAlgorithms from '../../../projects/sortVis/sorts';
import allDataGenerators from '../../../projects/sortVis/dataGenerator';
import SortVisTreeListComponent from './SortVisTreeListComponent';

export default function SortVisComponent() {
    const [arrLen, setArrLen] = React.useState(1024);
    const [arrMax, setArrMax] = React.useState(1000);
    const [currentAlgo, setCurrentAlgo] = React.useState<ISort | undefined>(undefined);
    const [runningSortState, setSortState] = React.useState<SortState | undefined>(undefined);
    const [currentDataGen, setDataGen] = React.useState<IDataGenerator>(allDataGenerators[0]);

    function runState() {
        const initialValues = new Array(arrLen);
        for (let i = 0; i < initialValues.length; i++) {
            initialValues[i] = Math.floor(currentDataGen.generate(i, initialValues.length) * arrMax);
        }
        const sortState = new SortState(initialValues);
        currentAlgo.sort(sortState, sortState.getArray(0));
        sortState.seekTo(0);
        setSortState(sortState);
    }

    return <div style={{top: 0, left: 0, bottom: 0, right: 0, position: 'absolute'}}>
        <SortVisTreeListComponent sortChosen={sort => setCurrentAlgo(sort)}>
            <>
                <div className='flex col align-center'>
                    <div className='flex col align-stretch'>
                        <div className='flex row justify-space-between'>
                            <span>Array Length:</span>
                            <input type='number' value={arrLen} onChange={ch => setArrLen(ch.target.valueAsNumber)} />
                        </div>
                        <div className='flex row justify-space-between'>
                            <span>Array Max:</span>
                            <input type='number' value={arrMax} onChange={ch => setArrMax(ch.target.valueAsNumber)} />
                        </div>
                        <div>
                            <span>Data: </span>
                            <Dropdown
                                options={allDataGenerators.map(item => item.name)}
                                value={currentDataGen.name}
                                onChange={ch => setDataGen(first(allDataGenerators, algo => algo.name === ch.value))}
                                />
                        </div>
                        <div>Algorithm: <Dropdown
                            options={allSortingAlgorithms.map(algo => algo.name)}
                            value={currentAlgo === undefined ? undefined : currentAlgo.name}
                            onChange={ch => setCurrentAlgo(first(allSortingAlgorithms, algo => algo.name === ch.value))} /></div>
                        <button disabled={arrLen <= 0 || arrMax <= 0 || currentAlgo === undefined} onClick={runState}>Go!</button>
                    </div>
                </div>
                {runningSortState === undefined ? <></> : <>
                    <hr />
                    <SortVisPlaybackComponent state={runningSortState} />
                </>}
            </>
        </SortVisTreeListComponent>
    </div>;
}
