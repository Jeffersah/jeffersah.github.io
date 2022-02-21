import * as React from 'react';
import HopliteProgram from '../../../projects/hoplite/index';

export default function HopliteComponent() {
    React.useEffect(()=>HopliteProgram.run());
    return <div className='rpgt rpgt_body full_body center' style={{background: "black"}}>
        <canvas id="mainCanvas"></canvas>
    </div>;
}
