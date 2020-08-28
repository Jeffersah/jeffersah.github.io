import AspectRatioScalingHelper from '../common/AspectRatioScalingHelper';
import { Complex } from '../common';
import { pathCubeOutside } from './renderHelpers';
import { Board } from './engine/board';

const cellColor1 = '#888888';
const cellColor2 = '#444444';

export default function Run() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx  = canvas.getContext('2d');
    const helper = new AspectRatioScalingHelper(canvas, ctx, 3, 2, true, () => { });
    const board = new Board(5);

    function renderLoop() {
        repaintBoard(ctx, board, helper);
        requestAnimationFrame(() => renderLoop());
    }
    renderLoop();
}

let boardRotation = 0;
const sqrt2 = Math.SQRT2;
const invsqrt2 = 1 / sqrt2;

function repaintBoard(ctx: CanvasRenderingContext2D, board: Board, scaleHelper: AspectRatioScalingHelper) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, 3, 2);
    const sidebarSize = 2 / (board.size);

    ctx.fillStyle = 'Gray';
    ctx.save();
    ctx.scale(sidebarSize, sidebarSize);
    // Left side bar
    paintFlatBoards(ctx, board, boardRotation, 0, (x, y, l) => ({x, y, z: l}));
    ctx.restore();

    ctx.save();
    ctx.translate(3 - sidebarSize, 0);
    ctx.scale(sidebarSize, sidebarSize);
    // Paint right-side boards
    paintFlatBoards(ctx, board, boardRotation, 0, (x, y, l) => ({x, y, z: l}));
    ctx.restore();

    ctx.beginPath();
    pathCubeOutside(ctx, 1.5, 1, invsqrt2, 0.4, 1, boardRotation);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.fill();

    boardRotation += Math.PI / 240;
}

// During this call, ctx is effectively 1xN, where N is the number of boards.
function paintFlatBoards(ctx: CanvasRenderingContext2D, board: Board, rotation: number, translationPerLayer: number, coordFunc: (x: number, y: number, l: number) => ({x: number, y: number, z: number })) {
    for (let layer = 0; layer < board.size; layer++) {
        ctx.save();
        ctx.translate(0, layer);

        ctx.scale(invsqrt2, invsqrt2);

        ctx.translate((sqrt2 - 1) / 2, (sqrt2 - 1) / 2);

        ctx.translate(0.5, 0.5);
        ctx.rotate(rotation);
        ctx.translate(-0.5, -0.5);

        const cellSize = 1 / board.size;
        for (let x = 0; x < board.size; x++) {
            for (let y = 0; y < board.size; y++) {
                ctx.fillStyle = (x + y + layer) % 2 === 0 ? cellColor1 : cellColor2;
                ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
        }
        ctx.restore();
    }
}