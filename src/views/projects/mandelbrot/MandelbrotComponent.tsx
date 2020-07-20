import * as React from 'react';

export function MandelbrotComponent() {
    React.useEffect(() => {
        import(
            /* webpackChunkName: "mandelbrot" */
            /* webpackMode: "lazy" */
            '../../../projects/mandelbrot/main').then(({ default: Run }) => {
            Run();
        });
    }, []);
    return <div className='mandelbrot mandelbrot_body full_body'>
        <canvas id='mainCanvas'></canvas>
        <canvas id='subCanvas'></canvas>
    </div>;
}