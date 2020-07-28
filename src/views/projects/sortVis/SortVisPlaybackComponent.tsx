import * as React from 'react';
import Dropdown from 'react-dropdown';
import SortState from '../../../projects/sortVis/SortState';
import { ResizeCanvas } from '../../../projects/common/CanvasHelpers';
import IDelta from '../../../projects/sortVis/delta/IDelta';
import BarDisplay from '../../../projects/sortVis/paints/BarDisplay';
import useUpdateState from '../../../hooks/useUpdateState';
import { first } from '../../../LinqLike';
import IPaint from '../../../projects/sortVis/paints/IPaint';
import EComplexity from '../../../projects/sortVis/delta/EComplexity';
import useAutoplayHook from './useAutoplay';

const allPainters: IPaint[] = [
    new BarDisplay(),
];

const MaxUpdatesPerTick = 20;

const CVS_WIDTH = 1024;
const CVS_HEIGHT = 800;

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;


export default function SortVisPlaybackComponent(props: { state: SortState }) {
    const [deltaIndex, setDeltaIndex] = React.useState(props.state.deltaIndex());
    const [painter, setCurrentPainter] = useUpdateState<IPaint>(allPainters[0], (nv) => repaint(props.state, [], nv));
    const [autoplaying, setAutoplaying] = React.useState(false);
    const [currentSpeed, setCurrentSpeed] = React.useState(0);

    React.useEffect(() => {
        const cvs = document.getElementById('canvas') as HTMLCanvasElement;
        ResizeCanvas(cvs, CVS_WIDTH, CVS_HEIGHT);
        canvas = cvs;
        ctx = cvs.getContext('2d');
        repaint(props.state, [], painter);
    }, []);

    React.useEffect(() => {
        repaint(props.state, [], painter);
    }, [ props.state ]);

    // Autoplay effect
    useAutoplayHook(() => {
        if (currentSpeed <= 0.5) {
            const deltas = props.state.applyUntil(10, EComplexity.Compare);
            updateDeltaIndex();
            repaint(props.state, deltas, painter);
        }
        else {
            const speedPerc = (currentSpeed - 0.5) * 2;
            const numTicks = Math.floor(speedPerc * MaxUpdatesPerTick);
            const allDeltas = [];
            for (let i = 0; i < numTicks; i++) {
                allDeltas.push(...props.state.applyUntil(-1, EComplexity.Compare));
            }
            updateDeltaIndex();
            repaint(props.state, allDeltas, painter);
        }
        if (props.state.remainingStepsFwd() === 0) setAutoplaying(false);
    }, autoplaying, currentSpeed);

    function updateDeltaIndex() {
        setDeltaIndex(props.state.deltaIndex());
    }

    function repaint(state: SortState, deltas: IDelta[], p: IPaint) {
        // Not ready to paint yet, do nothing
        if (canvas === undefined || ctx === undefined || p === undefined) return;
        p.repaint(canvas, ctx, state, deltas);
    }

    return <div className='flex-row'>
        <canvas id='canvas'></canvas>
        <div className='flex-col'>
            <div className='flex-row'> Display:<Dropdown
                    options={allPainters.map(algo => algo.name)}
                    value={painter.name}
                    onChange={ch => setCurrentPainter(first(allPainters, algo => algo.name === ch.value))} />
            </div>
            <input type='range' min={0} max={props.state.totalDeltas()} value={deltaIndex} onChange={ev => {
                props.state.seekTo(ev.target.valueAsNumber);
                updateDeltaIndex();
                repaint(props.state, [], painter);
            }} />
            <span>Step {deltaIndex} / {props.state.totalDeltas()}</span>
            <div className='flex-row'>
                <button onClick={() => { props.state.seekTo(0); updateDeltaIndex(); repaint(props.state, [], painter); }}>&lt;&lt;&lt;</button>
                <button onClick={() => { const deltas = props.state.rollbackUntil(-1, EComplexity.Swap); updateDeltaIndex(); repaint(props.state, deltas, painter); }}>&lt;&lt;</button>
                <button onClick={() => { const deltas = [props.state.rollback()]; updateDeltaIndex(); repaint(props.state, deltas, painter); }}>&lt;</button>
                <button onClick={() => { const deltas = [props.state.apply()]; updateDeltaIndex(); repaint(props.state, deltas, painter); }}>&gt;</button>
                <button onClick={() => { const deltas = props.state.applyUntil(-1, EComplexity.Swap); updateDeltaIndex(); repaint(props.state, deltas, painter); }}>&gt;&gt;</button>
                <button onClick={() => { props.state.seekTo(props.state.totalDeltas()); updateDeltaIndex(); repaint(props.state, [], painter); }}>&gt;&gt;&gt;</button>
            </div>
            <span>Autoplay:</span>
            <div className='flex-row'>
                <span>Speed: </span>
                <input type='range' min={0} max={1} step={0.01} value={currentSpeed} onChange={ev => setCurrentSpeed(ev.target.valueAsNumber)} />
                <button onClick={() => setAutoplaying(!autoplaying)}>{autoplaying ? 'Pause' : 'Play'}</button>
            </div>
        </div>
    </div>;
}