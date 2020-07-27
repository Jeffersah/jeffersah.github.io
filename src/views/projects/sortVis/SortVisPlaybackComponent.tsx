import * as React from 'react';
import Dropdown from 'react-dropdown';
import SortState from '../../../projects/sortVis/SortState';
import { ResizeCanvas } from '../../../projects/common/CanvasHelpers';
import IDelta from '../../../projects/sortVis/delta/IDelta';
import BarDisplay from '../../../projects/sortVis/paints/BarDisplay';
import useUpdateState from '../../../hooks/useUpdateState';
import { first } from '../../../LinqLike';
import IPaint from '../../../projects/sortVis/paints/IPaint';

const allPainters: IPaint[] = [
    new BarDisplay(),
];


const CVS_WIDTH = 1024;
const CVS_HEIGHT = 800;

let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

export default function SortVisPlaybackComponent(props: { state: SortState }) {
    const [deltaIndex, setDeltaIndex] = React.useState(props.state.deltaIndex());
    const [painter, setCurrentPainter] = useUpdateState<IPaint>(allPainters[0], (nv) => repaint(props.state, [], nv));

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

    function updateDeltaIndex() {
        setDeltaIndex(props.state.deltaIndex());
    }

    function repaint(state: SortState, deltas: IDelta[], p: IPaint) {
        // Not ready to paint yet, do nothing
        if (canvas === undefined || ctx === undefined || p === undefined) return;
        p.repaint(canvas, ctx, state, deltas);
    }

    return <div>
        <canvas id='canvas'></canvas>
        <div>Display: <Dropdown
                options={allPainters.map(algo => algo.name)}
                value={painter.name}
                onChange={ch => setCurrentPainter(first(allPainters, algo => algo.name === ch.value))} /></div>
        <input type='range' min={0} max={props.state.totalDeltas()} value={deltaIndex} onChange={ev => {
            props.state.seekTo(ev.target.valueAsNumber);
            updateDeltaIndex();
            repaint(props.state, [], painter);
        }} />
        <button onClick={() => { const deltas = [props.state.rollback()]; updateDeltaIndex(); repaint(props.state, deltas, painter); }}>&lt;</button>
        <button onClick={() => { const deltas = [props.state.apply()]; updateDeltaIndex(); repaint(props.state, deltas, painter); }}>&gt;</button>
    </div>;
}