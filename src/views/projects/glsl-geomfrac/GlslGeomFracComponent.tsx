import * as React from 'react';
import ALL_COLORS from '../../../projects/glsl-fracaudio/ColorFunctions';
import ALL_FRACTALS from '../../../projects/glsl-geomfrac/Fractals';
import GeometricFractalControl from '../../../projects/glsl-geomfrac/GeometricFractalControl';

export default function GlslGeomFracComponent() {
    const [fractal, setFractal] = React.useState(ALL_FRACTALS[0]);
    const [color, setColor] = React.useState(ALL_COLORS[0]);

    const canvasRef = React.useRef<HTMLCanvasElement>(null);
    const canvas3dRef = React.useRef<HTMLCanvasElement>(null);
    const controlRef = React.useRef<GeometricFractalControl>(null);

    React.useEffect(() => {
        if(canvasRef.current === null || canvas3dRef.current === null) return;

        const control = new GeometricFractalControl(canvasRef.current, canvas3dRef.current);
        controlRef.current = control;
        control.start(fractal, color);
        
        return () => {controlRef.current = undefined; control.destroy();}

    }, [canvasRef.current, canvas3dRef.current, fractal, color]);


    let clickAnchor: undefined | [number, number] = undefined;
    let zAnchor: number | undefined;

    function handleMouseDown(e: React.MouseEvent<HTMLCanvasElement>) {
        e.preventDefault();
        e.stopPropagation();
        if(e.buttons & 1)
            clickAnchor = [e.clientX, e.clientY];
        if(e.buttons & 4)
            zAnchor = e.clientY;
    }
    
    function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
        e.preventDefault();
        e.stopPropagation();
        let dx = 0, dy = 0, dz = 0;
        if(clickAnchor !== undefined) {
            dx = e.clientX - clickAnchor[0];
            dy = e.clientY - clickAnchor[1];
            clickAnchor = [e.clientX, e.clientY];
        }
        if(zAnchor !== undefined) {
            dz = e.clientY - zAnchor;
            zAnchor = e.clientY;
        }

        controlRef.current.scroll(-dx / (e.target as HTMLCanvasElement).clientWidth, dy  / (e.target as HTMLCanvasElement).clientHeight, dz / (e.target as HTMLCanvasElement).clientHeight);
    }
    
    function handleMouseUp(e: React.MouseEvent<HTMLCanvasElement>) {
        if((e.buttons & 1) === 0)
            clickAnchor = undefined;
        if((e.buttons & 4) === 0)
            zAnchor = undefined;
        e.preventDefault();
        e.stopPropagation();
    }

    function handleScroll(e: React.WheelEvent<HTMLCanvasElement>) {
        e.preventDefault();
        e.stopPropagation();
        let xp = e.clientX / (e.target as HTMLCanvasElement).clientWidth;
        let yp = e.clientY / (e.target as HTMLCanvasElement).clientHeight;
        controlRef.current.zoom(Math.pow(1.1, e.deltaY / Math.abs(e.deltaY)), xp, 1-yp);
    }

    return <div className='flex col align-stretch full_body'>
        <div className='flex row'>
            <select onChange={ev => setFractal(ALL_FRACTALS[ev.target.selectedIndex])}>
                {ALL_FRACTALS.map(f => <option selected={f === fractal} key={f.Name}>{f.Name}</option>)}
            </select>
            <select onChange={ev => setColor(ALL_COLORS[ev.target.selectedIndex])}>
                {ALL_COLORS.map(f => <option selected={f === color} key={f.Name}>{f.Name}</option>)}
            </select>
        </div>
        <div className='flex row grow align-stretch'>
            <div style={{ width: '50%', height: '100%' }}>
                <canvas ref={canvasRef} style={{width: '100%', height:'99%'/* Don't ask.*/}} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} onWheel={handleScroll} onMouseLeave={handleMouseUp} />
            </div>
            <div style={{ width: '50%', height: '100%' }}>
                <canvas ref={canvas3dRef} style={{ width: '100%', height: '99%'}} />
            </div>
        </div>
    </div>;
}