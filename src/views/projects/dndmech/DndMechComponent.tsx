import * as React from 'react';
import Run, { ForceResizeCheck } from '../../../projects/dndmech';
import useWindowSize from '../../../hooks/useWindowSize';

export function DndMechComponent() {

    React.useEffect(() => {
        Run();
    }, []);

    React.useEffect(ForceResizeCheck);

    const { width, height } = useWindowSize();

    return <div className='full_body' style={{ display: 'flex', height: height + 'px' }}>
        <div style={{ flexGrow: 0 }}>MECH STATUS</div>
        <div className='center' style={{ flexGrow: 1, height: '100%' }}>
            <canvas id='canvas'></canvas>
        </div>
    </div>;
}