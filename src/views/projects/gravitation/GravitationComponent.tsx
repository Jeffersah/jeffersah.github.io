import * as React from 'react';

export function GravitationComponent() {
    React.useEffect(() => {
        import(
            /* webpackChunkName: "mandelbrot" */
            /* webpackMode: "lazy" */
            '../../../projects/gravitation/main').then(({ default: Run }) => {
            Run();
        });
    }, []);
    return <div className='full_body'>
        <canvas id='mainCanvas'></canvas>
    </div>;
}