import * as React from 'react';
import Map from '../../../projects/diplo/Map';
import mapJson from '../../../projects/diplo/assets/map.json';
import IMapDataJson from '../../../projects/diplo/assets/IMapDataJson';

const map = new Map(mapJson as IMapDataJson);

export default function DiploComponent() {
    const [selProvince, setSelection] = React.useState<string|undefined>(undefined);

    return <div className='conway conway_body full_body'>
        <svg viewBox='0 0 1024 1024' fill='#888'>
            {Object.keys(map.provinces).map(key => 
            {
                let province = map.provinces[key];
                return <g key={key}>
                    <path 
                        fill={
                            key === selProvince ? '#ffff00' :
                            province.type == 'impassable' ? '#888' :
                            province.type == 'coast' ? '#00aa00' :
                            province.type == 'land' ? '#00ff00' : '#0000ff'} 
                        stroke='black'
                        d={province.svgData}
                        onClick={()=>setSelection(key)}
                    />
                    <text fontSize='10' fill='black' x={province.midpoint.x} y={province.midpoint.y} style={{ pointerEvents: 'none' }}>{province.abbr}</text>
                </g>;
            })}
            <g>
                {Object.keys(map.provinces).map(key => {
                    let province = map.provinces[key];
                    let fromPt = province.midpoint;
                    return <g key={key}>
                        {province.neighbors.map(n => 
                            <line key={province.abbr + '-' + n.abbr} x1={fromPt.x} y1={fromPt.y} x2={n.midpoint.x} y2={n.midpoint.y} stroke='red' />)}
                    </g>
                })}
            </g>
        </svg>
    </div>;
}