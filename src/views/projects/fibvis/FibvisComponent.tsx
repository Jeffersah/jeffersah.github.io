import * as React from 'react';
import { render } from 'react-dom';
import ReactDropdown from 'react-dropdown';
import Dropdown from 'react-dropdown';
import { ObjDropdownComponent } from '../../common/ObjDropdownComponent';
import { Generators } from './generators';
import IGenerator from './generators/IGenerator';
import RenderStateComponent, { RenderStateComponentProps } from './RenderStateComponent';
import { Visualizers } from './visualizers'; 
import VisualizerDef from './visualizers/VisualizerDef';

type RenderArgs = {seed: number[], modulo: number};
type ArgParseResult = RenderArgs | {seedError?: string, moduloError?: string};

function tryParse(seed: string, modulo: string): ArgParseResult {
    const digits = seed.split(' ').map(v => v.trim()).filter(v => v != '');
    const seedOut = [];
    for(let i = 0; i < digits.length; i++){
        seedOut.push(parseInt(digits[i]))
        if(isNaN(seedOut[i]))
        {
            return { seedError: `Failed to parse seed value ${digits[i]}` };
        }
    }
    if(seedOut.length < 2) return {seedError: `Seed must have a length of at least 2`};

    const modParse = parseInt(modulo);
    if(isNaN(modParse)) return { moduloError: `Failed to parse modulus ${modulo}` };
    return {seed: seedOut, modulo: modParse};
}

function isSuccess(res: ArgParseResult): res is {seed:number[], modulo:number} {
    return (res as any).seed !== undefined;
}

export default function FibvisComponent() {
    let [seed, setSeed] = React.useState('0 1');
    let [modulo, setModulo] = React.useState('3');
    let [animate, setAnimate] = React.useState(true);

    let [RenderState, setRenderState] = React.useState<RenderStateComponentProps | null>(null);
    let [visualizer, setVisualizer] = React.useState(Visualizers[0]);
    let [generator, setGenerator] = React.useState(Generators[0]);
    let [animationTime, setAnimationTime] = React.useState(5);

    let parseResult = tryParse(seed, modulo);
    let parseSucceed = isSuccess(parseResult);

    function goButtonClicked() {
        const modulo = (parseResult as RenderArgs).modulo;
        const series = generator.generateSeries((parseResult as RenderArgs).seed, modulo);
        setRenderState({ animate, visualizer: visualizer.generate(modulo, series), animationDuration: animationTime });
    }

    return <div className='flex col align-center'>
        <div className='flex col' style={{ maxWidth:'800px' }}>
                <div className='flex row justify-space-between' >
                    <label>Seed Values: </label>
                    <input type='text' value={seed} onChange={v => setSeed(v.target.value)} style={{marginLeft: '8px'}} />
                </div>

                <div className='flex row justify-space-between' >
                    <label>Modulo: </label>
                    <input type='number' value={modulo} onChange={v => setModulo(v.target.value)} style={{marginLeft: '8px'}} />
                </div>

                <div className='flex row justify-space-between' >
                    <label>Animation Duration: </label>
                    <div>
                        { animate ? <input type='number' value={animationTime} onChange={v => setAnimationTime(v.target.valueAsNumber)} /> : <></> }
                        <input type='checkbox' checked={animate} onChange={v => setAnimate(v.target.checked)} style={{marginLeft: '8px'}} />
                    </div>
                </div>
                <div className='flex row justify-space-between align-center' >
                    <label>Generator: </label>
                    <ObjDropdownComponent<IGenerator> options={Generators} getName={v => v.name} value={generator} onChange={g => setGenerator(g)} />
                </div>
                
                <div className='flex row justify-space-between align-center' >
                    <label>Visualizer: </label>
                    <ObjDropdownComponent<VisualizerDef> options={Visualizers} getName={(v) => v.name} value={visualizer} onChange={(c) => setVisualizer(c)} />
                </div>

                <button disabled={!parseSucceed} onClick={goButtonClicked}>Go</button>
        </div>
        {RenderState !== null ? <RenderStateComponent {...RenderState} /> : <></>}
        </div>  ;
}