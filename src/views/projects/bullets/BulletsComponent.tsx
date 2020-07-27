import * as React from 'react';


export default function BulletsComponent() {
    React.useEffect(() => {
        import(
            /* webpackChunkName: "bullets" */
            /* webpackMode: "lazy" */
            '../../../projects/bullets').then(({ default: Run }) => {
            Run();
        });
    }, []);
    return <div className='center'>
        <canvas id='canvas' />
    </div>;
}