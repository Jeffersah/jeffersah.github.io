import * as React from 'react';
import Run from '../../../projects/qtree-conway';

export function QTreeConwayComponent() {
    React.useEffect(() => {
        Run();
    }, []);
    return <div className='conway conway_body full_body'>
        <canvas id='mainCanvas'></canvas>
    </div>;
}