import IPaint from './IPaint';
import SortState from '../SortState';
import IDelta from '../delta/IDelta';
import EComplexity from '../delta/EComplexity';
import { Compare, Swap } from '../delta/SimpleOperations';
import { mkdirSync } from 'fs';

export default class RadialDisplay implements IPaint {
    public name = 'Radial';

    repaint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, state: SortState, deltas: IDelta[]): void {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const midX = canvas.width / 2;
        const midY = canvas.height / 2;

        const arr = state.getArray(0);
        const radiansPerX = 2 * Math.PI / arr.length();

        function transformCoords(index: number, value: number) {
            const angle = radiansPerX * index;
            const radius = value / state.maxValue;
            const x = Math.floor(midX + Math.cos(angle) * radius * midX);
            const y = Math.floor(midY + Math.sin(angle) * radius * midY);
            return { x, y };
        }

        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.moveTo(midX, midY);
        const coordsArr = [];
        for (let i = 0; i < arr.length(); i++) {
            const { x, y } = transformCoords(i, arr.internalGet(i).value);
            ctx.lineTo(x, y);
            coordsArr.push({x, y});
        }
        ctx.closePath();
        ctx.fill();


        ctx.fillStyle = 'white';
        for (let i = 0; i < arr.length(); i++) {
            const { x, y } = coordsArr[i];
            ctx.fillRect(x, y, 1, 1);
        }

        ctx.strokeStyle = '#D00';
        ctx.lineWidth = 1;
        for (const delta of deltas.filter(d => d.type === 'compare')) {
            const d = delta as Compare;
            ctx.beginPath();

            const { x, y } = transformCoords(d.index1, d.array1.get(d.index1).value);
            const { x: x2, y: y2 } = transformCoords(d.index2, d.array2.get(d.index2).value);
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
        for (const delta of deltas.filter(d => d.type === 'swap')) {
            const d = delta as Swap;
            ctx.beginPath();

            const { x, y } = transformCoords(d.srcIndex, d.srcArray.get(d.srcIndex).value);
            const { x: x2, y: y2 } = transformCoords(d.tgtIndex, d.tgtArray.get(d.tgtIndex).value);
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
}