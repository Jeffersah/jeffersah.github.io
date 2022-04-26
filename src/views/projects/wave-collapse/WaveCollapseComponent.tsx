import * as React from 'react';
import Run from '../../../projects/wave-collapse';

export default function WaveCollapseComponent() {
    React.useEffect(() => Run());
    return <div style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute'}}>
        <canvas id='canvas' style={{ top: 0, bottom: 0, left: 0, right: 0, position: 'absolute'}}></canvas>
    </div>;
}