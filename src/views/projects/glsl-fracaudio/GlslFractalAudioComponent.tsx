import * as React from 'react';
import AllAmplitudeFunctions, { IAmplitudeFunction } from '../../../projects/glsl-fracaudio/AmplitudeMode';
import fireColor from '../../../projects/glsl-fracaudio/ColorFunctions/FireColor';
import grayscaleColor from '../../../projects/glsl-fracaudio/ColorFunctions/GrayscaleColor';
import hueColor from '../../../projects/glsl-fracaudio/ColorFunctions/HueColor';
import paperColor from '../../../projects/glsl-fracaudio/ColorFunctions/PaperColor';
import { IColorFunction } from '../../../projects/glsl-fracaudio/ColorFunctions/IColorFunction';
import FractalAudioPlayer from '../../../projects/glsl-fracaudio/FractalAudioPlayer';
import burningShip from '../../../projects/glsl-fracaudio/Fractals/BurningShip';
import featherFractal from '../../../projects/glsl-fracaudio/Fractals/Feather';
import { IFractal } from '../../../projects/glsl-fracaudio/Fractals/IFractal';
import mandelbrot from '../../../projects/glsl-fracaudio/Fractals/Mandelbrot';
import squareFractal from '../../../projects/glsl-fracaudio/Fractals/Square';
import RendererWrapperComponent from '../../../projects/glsl-fracaudio/RendererWrapperComponent';
import { ObjDropdownComponent } from '../../common/ObjDropdownComponent';

const fractals: IFractal[] = [
    mandelbrot,
    burningShip,
    featherFractal,
    squareFractal
];
const colors: IColorFunction[] = [
    grayscaleColor,
    fireColor,
    hueColor,
    paperColor
];

export default function GlslFractalAudioComponent() {
    const canvas = React.useRef<HTMLCanvasElement>();
    const overlayCanvas = React.useRef<HTMLCanvasElement>();
    const [frac, setFrac] = React.useState<IFractal>(mandelbrot);
    const [amplitude, setAmplitude] = React.useState<IAmplitudeFunction>(AllAmplitudeFunctions[0]);
    const [color, setColor] = React.useState<IColorFunction>(fireColor);

    React.useEffect(() => {
        const audio = new FractalAudioPlayer(overlayCanvas.current, amplitude);
        const renderer = new RendererWrapperComponent(canvas.current, frac, color, audio);
        return () => 
        {
            renderer.cleanup();
            audio.Cleanup();
        }
    }, [canvas, frac, amplitude, color]);


    return <div className='conway conway_body full_body'>
        <div style={{ width: '80%', height: '100%', position: 'absolute' }}>
            <canvas ref={canvas} style={{ position: 'absolute', width: '100%', height: '100%', top:0, left:0 }}></canvas>
            <canvas ref={overlayCanvas} style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', top:0, left:0}}></canvas>
        </div>
        <div style={{ width: '20%', height: '100%', background: '#333', position: 'absolute', left: '80%' }}>
            <label>Fractal:</label>
            <ObjDropdownComponent options={fractals} value={frac} getName={f => f.Name} onChange={f => setFrac(f)} />
            <label>Color:</label>
            <ObjDropdownComponent options={colors} value={color} getName={c => c.Name} onChange={c => setColor(c)} />
            <label>Amplitude Function:</label>
            <ObjDropdownComponent options={AllAmplitudeFunctions} value={amplitude} getName={a => a.Name} onChange={a => setAmplitude(a)} />

            <div style={{ bottom: 0, position: 'absolute', color: '#999', textAlign: 'center', width: '100%' }}>Inspired by <a href='https://www.youtube.com/watch?v=GiAj9WW1OfQ'>this video</a></div>
        </div>
    </div>;
}