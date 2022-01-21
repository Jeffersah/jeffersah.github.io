import * as React from 'react';
import Run from '../../../projects/hoplite/index';

export default function HopliteComponent() {
    React.useEffect(()=>Run());
    return <div className='rpgt rpgt_body full_body center'>
        <canvas id="mainCanvas"></canvas>
    </div>;
}
