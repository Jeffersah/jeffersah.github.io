import * as React from 'react';
import useWindowSize from '../../../hooks/useWindowSize';

export function CoreWarComponent() {
    const { width, height } = useWindowSize();

    return <div className='flex row'>
        <div className='flex col'>
            <canvas id='canvas'></canvas>
        </div>
    </div>;
}