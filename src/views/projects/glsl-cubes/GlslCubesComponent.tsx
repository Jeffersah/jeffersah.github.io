import * as React from 'react';
import GlslCubesRunner from '../../../projects/glsl-cubes/GlslCubesRunner';

export default function GlslCubesComponent() {
    const canvas = React.useRef<HTMLCanvasElement>();

    React.useEffect(() => {
        const renderer = new GlslCubesRunner(canvas.current);
        return () => renderer.cleanup();
    }, [canvas]);

    return <div className='conway conway_body full_body'>
        <canvas id='canvas' ref={canvas}></canvas>
    </div>;
}