import * as React from 'react';
import Run from '../../../projects/tile-blend-test-1';

export function TileBlendTest1Component() {
    React.useEffect(() => {
        Run();
    }, []);
    return <div className='full_body center'>
        <canvas id='canvas'></canvas>
    </div>;
}