import * as React from 'react';
import Run from '../../../projects/ant-colony/index';
import { IRenderSettings } from '../../../projects/ant-colony/IRenderSettings';

export default function AntColonyComponent() {
    let ref = React.useRef<HTMLCanvasElement>();

    let [state, setState] = React.useState<IRenderSettings>({
        numPts: 100,
        signalDecay: 0.7,
        signalPower: 1.2,
        distancePower: 4,
        delayPerFrame: 6,
        numAnts: 30,
    });

    React.useEffect(() => {
        Run(state, ref.current);
    }, [state, ref]);

    return <div className='flex row'>
        <canvas id='canvas' ref={ref} />
        <div className='flex col'>
            <AntColonyValueSliderComponent label='Number of Points: ' value={state.numPts} onChange={v => setState({...state, numPts: v})} min={3} max={200} step={1} type='number' />
            <AntColonyValueSliderComponent label='Number of Ants: ' value={state.numAnts} onChange={v => setState({...state, numAnts: v})} min={1} max={100} step={1} type='number' />
            <AntColonyValueSliderComponent label='Signal Decay: ' value={state.signalDecay} onChange={v => setState({...state, signalDecay: v})} min={0} max={1} step={0.1} type='float' />
            <AntColonyValueSliderComponent label='Signal Power: ' value={state.signalPower} onChange={v => setState({...state, signalPower: v})} min={1} max={8} step={0.5} type='float' />
            <AntColonyValueSliderComponent label='Distance Power: ' value={state.distancePower} onChange={v => setState({...state, distancePower: v})} min={1} max={8} step={0.5} type='float' />
            <AntColonyValueSliderComponent label='Delay per Frame: ' value={state.delayPerFrame} onChange={v => setState({...state, delayPerFrame: v})} min={6} max={600} step={30} type='number' />
        </div>
    </div>;
}

function AntColonyValueSliderComponent(props: {label: string, value: number, onChange: (value: number) => void, min: number, max: number, step: number, type: 'float' | 'number'}) {
    return <div>
        <label>{props.label}</label>
        <input value={props.value} onChange={ev => props.onChange(ev.target.valueAsNumber)} type='range' min={props.min} max={props.max} step={props.step} />
        <input value={props.value} onChange={ev => props.onChange(ev.target.valueAsNumber)} type={props.type} min={props.min} max={props.max} />
    </div>;
}