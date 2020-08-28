import * as React from 'react';

export function Chess3dComponent() {
    React.useEffect(() => {
        import(
            /* webpackChunkName: "chess3d" */
            /* webpackMode: "lazy" */
            '../../../projects/chess3d').then(({ default: run }) => {
            run();
        });
    }, []);
    return <div className='flex col align-center'>
        <canvas id='canvas'></canvas>
    </div>;
}