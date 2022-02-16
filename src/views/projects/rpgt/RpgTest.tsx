import * as React from 'react';

export function RpgTestComponent() {
    React.useEffect(() => {
        import(
            /* webpackChunkName: "rpgt" */
            /* webpackMode: "lazy" */
            '../../../projects/rpgt').then(({ default: Run }) => {
            Run();
        });
    }, []);
    return <div className='rpgt rpgt_body full_body center'>
        <canvas id='mainCanvas'></canvas>
        <canvas style={{display: 'none'}} id='world_prerender'></canvas>
    </div>;
}