import * as React from 'react';
import { CoreWarInfoComponent } from './CoreWarInfo';

export function CoreWarRendererComponent() {

    return <div className='flex row'>
        <div className='flex col'>
            <span>CORE:</span>
            <canvas id='canvas'></canvas>
        </div>
        <CoreWarInfoComponent></CoreWarInfoComponent>
    </div>;
}