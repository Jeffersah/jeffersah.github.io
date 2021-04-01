import * as React from 'react';
import GlslMandelbrotRunner from '../../../projects/glsl-mandelbrot/GlslMandelbrotRunner';

export default function GlslMandelbrotComponent() {
    const canvas = React.useRef<HTMLCanvasElement>();
    const jcanvas = React.useRef<HTMLCanvasElement>();

    React.useEffect(() => {
        const renderer = new GlslMandelbrotRunner(canvas.current, jcanvas.current);
        return () => renderer.cleanup();
    }, [canvas]);

    return <div className='conway conway_body full_body'>
        <canvas id='canvas' ref={canvas}></canvas>
        <canvas id='jcanvas' ref={jcanvas}></canvas>
    </div>;
}