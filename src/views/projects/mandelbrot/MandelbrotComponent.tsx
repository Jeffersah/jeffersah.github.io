import * as React from 'react';
import Run from '../../../projects/mandelbrot/main'; 

export function MandelbrotComponent() {
    React.useEffect(() => {
        Run();
    }, []);
    return <div className='mandelbrot mandelbrot_body full_body'>
        <canvas id='mainCanvas'></canvas>
        <canvas id='subCanvas'></canvas>
    </div>;
}