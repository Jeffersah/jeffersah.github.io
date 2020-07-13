import * as React from 'react';
import Run from '../../../projects/rpgt';

export function RpgTestComponent() {
    React.useEffect(() => {
        Run();
    }, []);
    return <div className='rpgt rpgt_body full_body center'>
        <canvas id='mainCanvas'></canvas>
        <canvas style={{display: 'none'}} id='world_prerender'></canvas>
    </div>;
}