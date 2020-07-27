import IPaint from './IPaint';
import SortState from '../SortState';
import IDelta from '../delta/IDelta';

export default class BarDisplay implements IPaint {
    public name = 'Bar';

    repaint(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, state: SortState, deltas: IDelta[]): void {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const arr = state.getArray(0);
        const widthPer = canvas.width / arr.length();
        const heightPer = canvas.height / state.maxValue;

        const dx = Math.max(Math.floor(widthPer), 1);

        ctx.fillStyle = '#333';
        for (let i = 0; i < arr.length(); i++) {
            const x = Math.floor(widthPer * i);
            const height = Math.floor(heightPer * arr.internalGet(i).value);

            ctx.fillRect(x, canvas.height - height, dx, height);
        }

        ctx.fillStyle = 'white';
        for (let i = 0; i < arr.length(); i++) {
            const x = Math.floor(widthPer * i);
            const height = Math.floor(heightPer * arr.internalGet(i).value);

            ctx.fillRect(x, canvas.height - height, dx, dx);
        }
    }
}