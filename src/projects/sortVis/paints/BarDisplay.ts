import IPaint from './IPaint';
import SortState from '../SortState';
import IDelta from '../delta/IDelta';
import EComplexity from '../delta/EComplexity';
import { Compare, Swap, Copy, Push } from '../delta/SimpleOperations';
import SortArray from '../SortArray';

type GetCoordFunc = (index: number, value: number) => { x: number, y: number, height: number };

function generateCoordFunc(state: SortState, arrLen: number, wx: number, wy: number, ww: number, wh: number): GetCoordFunc {
    const widthPer = ww / arrLen;
    const heightPer = wh / state.maxValue;
    return (index: number, value: number) => {
        const x = wx + Math.floor(widthPer * index);
        const height = Math.floor(heightPer * value);
        const y = wy + wh - height;
        return { x, y, height};
    };
}

export default class BarDisplay implements IPaint {
    public name = 'Bar';

    repaintArr(state: SortState, arr: SortArray, wx: number, wy: number, ww: number, wh: number, ctx: CanvasRenderingContext2D) {
        const widthPer = ww / arr.length();
        const dx = Math.max(Math.floor(widthPer), 1);

        const coordsFrom = generateCoordFunc(state, arr.length(), wx, wy, ww, wh);

        ctx.fillStyle = '#333';
        for (let i = 0; i < arr.length(); i++) {
            const { x, y, height } = coordsFrom(i, arr.internalGet(i).value);
            ctx.fillRect(x, y, dx, height);
        }

        ctx.fillStyle = 'white';
        for (let i = 0; i < arr.length(); i++) {
            const { x, y, height } = coordsFrom(i, arr.internalGet(i).value);
            ctx.fillRect(x, wh + wy - height - dx, dx, dx);
        }
    }

    repaint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, state: SortState, deltas: IDelta[]): void {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const mainArr = state.getArray(0);
        const widthPer = canvas.width / mainArr.length();
        const PERC_WINDOW_FOR_SUBARR = 0.2;

        const coordFuncsByArrayIndex: GetCoordFunc[] = [];
        const arrWindows: { wx: number, wy: number, ww: number, wh: number }[] = [];

        const mainWindow = {
            wx: 0,
            wy: 0,
            ww: canvas.width,
            wh: state.doesRequireMemory() ? Math.floor(canvas.height * (1 - PERC_WINDOW_FOR_SUBARR)) : canvas.height
        };

        let rollingOffset = 0;
        for (const arr of state.allArrayInfo) {

            const actualOffset = arr.offset ?? rollingOffset;
            const realLength = arr.length ?? state.arrays.filter(a => a.arrayId === arr.arrId)[0]?.length() ?? 0;
            if(arr.offset === undefined) {
                rollingOffset += realLength;
            }

            const window = arr.arrId === 0 ? mainWindow : {
                wx: Math.floor(actualOffset * widthPer),
                wy: Math.floor(canvas.height - (canvas.height * PERC_WINDOW_FOR_SUBARR)),
                ww: Math.floor(realLength * widthPer),
                wh: Math.floor(canvas.height * PERC_WINDOW_FOR_SUBARR)
            };
            arrWindows[arr.arrId] = window;
            coordFuncsByArrayIndex[arr.arrId] = generateCoordFunc(state, arr.length, window.wx, window.wy, window.ww, window.wh);
        }


        this.repaintArr(state, mainArr, mainWindow.wx, mainWindow.wy, mainWindow.ww, mainWindow.wh, ctx);
        for (let i = 1; i < state.arrays.length; i++) {
            const window = arrWindows[state.arrays[i].arrayId];
            this.repaintArr(state, state.arrays[i], window.wx, window.wy, window.ww, window.wh, ctx);
        }

        const bezierYAdj = Math.floor(canvas.height / 20);

        function coordsFrom(arrid: number, index: number, value: number) {
            return coordFuncsByArrayIndex[arrid](index, value);
        }

        ctx.strokeStyle = '#D00';
        ctx.lineWidth = 1;
        for (const delta of deltas.filter(d => d.type === 'compare')) {
            const d = delta as Compare;
            ctx.beginPath();

            const { x, y } = coordsFrom(d.array1.arrayId, d.index1, d.array1.get(d.index1).value);
            const { x: x2, y: y2 } = coordsFrom(d.array2.arrayId, d.index2, d.array2.get(d.index2).value);
            const bezierY = Math.min(y, y2) - bezierYAdj;

            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x, bezierY, x2, bezierY, x2, y2);
            // ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        ctx.strokeStyle = '#F80';
        ctx.lineWidth = 1;
        const crossSize = 5;
        ctx.beginPath();
        for (const delta of deltas.filter(d => d.type === 'copy')) {
            const d = delta as Copy;

            const { x, y } = coordsFrom(d.srcArray.arrayId, d.srcIndex, d.srcArray.get(d.srcIndex).value);
            const { x: x2, y: y2 } = coordsFrom(d.tgtArray.arrayId, d.tgtIndex, d.tgtArray.get(d.tgtIndex).value);

            ctx.moveTo(x - crossSize, y - crossSize);
            ctx.lineTo(x + crossSize, y + crossSize);
            ctx.moveTo(x + crossSize, y - crossSize);
            ctx.lineTo(x - crossSize, y + crossSize);
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
        }
        ctx.stroke();

        
        ctx.strokeStyle = '#F80';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (const delta of deltas.filter(d => d.type === 'push')) {
            const d = delta as Push;

            const { x, y } = coordsFrom(d.srcArray.arrayId, d.srcIndex, d.srcArray.get(d.srcIndex).value);
            const { x: x2, y: y2 } = coordsFrom(d.tgtArray.arrayId, d.tgtArray.length()-1, d.tgtArray.get(d.tgtArray.length()-1).value);

            ctx.moveTo(x - crossSize, y - crossSize);
            ctx.lineTo(x + crossSize, y + crossSize);
            ctx.moveTo(x + crossSize, y - crossSize);
            ctx.lineTo(x - crossSize, y + crossSize);
            ctx.moveTo(x, y);
            ctx.lineTo(x2, y2);
        }
        ctx.stroke();

        ctx.strokeStyle = '#0f0';
        ctx.lineWidth = 2;
        for (const delta of deltas.filter(d => d.type === 'swap')) {
            const d = delta as Swap;
            ctx.beginPath();

            const { x, y } = coordsFrom(d.srcArray.arrayId, d.srcIndex, d.srcArray.get(d.srcIndex).value);
            const { x: x2, y: y2 } = coordsFrom(d.tgtArray.arrayId, d.tgtIndex, d.tgtArray.get(d.tgtIndex).value);
            const bezierY = Math.min(y, y2) - bezierYAdj;

            ctx.moveTo(x, y);
            ctx.bezierCurveTo(x, bezierY, x2, bezierY, x2, y2);
            // ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
}