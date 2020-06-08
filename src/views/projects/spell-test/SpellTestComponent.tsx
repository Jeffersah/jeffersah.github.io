import * as React from 'react';
import Run from '../../../projects/spell-test';

export function SpellTestComponent() {
    React.useEffect(() => {
        Run();
    }, []);
    return <div className='full_body center'>
        <canvas id='canvas'></canvas>
    </div>;
}