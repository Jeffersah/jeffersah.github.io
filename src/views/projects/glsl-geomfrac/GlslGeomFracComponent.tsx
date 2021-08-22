import * as React from 'react';

export default function GlslGeomFracComponent() {
    return <div className='conway conway_body full_body'>
        <div style={{ width: '80%', height: '100%', position: 'absolute' }}>
            <canvas style={{ position: 'absolute', width: '100%', height: '100%', top:0, left:0 }}></canvas>
            <canvas  style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none', top:0, left:0}}></canvas>
        </div>
    </div>;
}