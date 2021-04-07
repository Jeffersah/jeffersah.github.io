import * as React from 'react';
import { max } from '../../../LinqLike';

export function RenderArrayState(data: number[], forceWidth?: number, arc?: {from: number, to: number, color: string, arcHeight?: number}[], color?: string[]) {
    const dataLength = forceWidth ?? data.length;
    const leftPadding = ((forceWidth ?? data.length) - data.length) / 2;
    const maxData = max(data, d => d);
    const maxHeight = Math.floor(dataLength / 2);

    return <svg width='100%' viewBox={(-leftPadding) + ' 0 ' + dataLength + ' ' + maxHeight} style={{ background: '#111' }}>
        {data.map((v, i) => 
        <g key={i}>
            <rect x={i} width={1} y={(1-(v/maxData))*maxHeight} height={(v/maxData)*maxHeight} fill={(color === null || color === undefined) ? '#222' : (color[i] ?? '#222')} /> 
            <rect x={i} width={1} y={(1-(v/maxData))*maxHeight} height={1} fill='#CCC' /> 
        </g>)}
        {arc === null || arc === undefined ? <></> : arc.map((a, i) => {
            const y1 = (1-((data[a.from] - 0.5)/maxData))*maxHeight;
            const y2 = (1-((data[a.to] - 0.5)/maxData))*maxHeight;
            return <path key={i} fill='transparent' strokeWidth='0.1' stroke={a.color} d={`M ${a.from + 0.5} ${y1} C ${a.from + 0.5} ${y1 - (a.arcHeight ?? 2)} ${a.to + 0.5} ${y2 - (a.arcHeight ?? 2)} ${a.to + 0.5} ${y2}`} />
        })}
    </svg>
}