import IPaint from './IPaint';
import SortState from '../SortState';
import IDelta from '../delta/IDelta';
import EComplexity from '../delta/EComplexity';
import { Compare, Swap } from '../delta/SimpleOperations';

export default class BarDisplay implements IPaint {
    public name = 'Bar';

    repaint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, state: SortState, deltas: IDelta[]): void {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const arr = state.getArray(0);
        const widthPer = canvas.width / arr.length();
        const heightPer = (canvas.height * 0.95) / state.maxValue;
        const bezierYAdj = Math.floor(canvas.height / 20);

        const dx = Math.max(Math.floor(widthPer), 1);

        function coordsFrom(index: number, value: number) {
            const x = Math.floor(widthPer * index);
            const height = Math.floor(heightPer * value);
            const y = canvas.height - height;
            return {x, y, height};
        }

        ctx.fillStyle = '#333';
        for (let i = 0; i < arr.length(); i++) {
            const { x, y, height } = coordsFrom(i, arr.internalGet(i).value);
            ctx.fillRect(x, y, dx, height);
        }

        ctx.fillStyle = 'white';
        for (let i = 0; i < arr.length(); i++) {
            const { x, y, height } = coordsFrom(i, arr.internalGet(i).value);
            ctx.fillRect(x, canvas.height - height - dx, dx, dx);
        }

        ctx.strokeStyle = '#D00';
        ctx.lineWidth = 1;
        for (const delta of deltas.filter(d => d.type === 'compare')) {
            const d = delta as Compare;
            ctx.beginPath();

            const { x, y } = coordsFrom(d.index1, d.array1.get(d.index1).value);
            const { x: x2, y: y2 } = coordsFrom(d.index2, d.array2.get(d.index2).value);
            const bezierY = Math.min(y, y2) - bezierYAdj;

            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x, bezierY, x2, bezierY, x2, y2);
            // ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
        for (const delta of deltas.filter(d => d.type === 'swap')) {
            const d = delta as Swap;
            ctx.beginPath();

            const { x, y } = coordsFrom(d.srcIndex, d.srcArray.get(d.srcIndex).value);
            const { x: x2, y: y2 } = coordsFrom(d.tgtIndex, d.tgtArray.get(d.tgtIndex).value);
            const bezierY = Math.min(y, y2) - bezierYAdj;

            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x, bezierY, x2, bezierY, x2, y2);
            // ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
}