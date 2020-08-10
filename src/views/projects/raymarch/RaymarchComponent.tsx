import * as React from 'react';
import main from '../../../projects/raymarch';

export function RaymarchComponent() {
    React.useEffect(() => main());
    return <div className='conway conway_body full_body'>
        <canvas id='canvas'></canvas>
    </div>;
}