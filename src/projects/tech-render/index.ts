import { ResizeCanvas } from '../common/CanvasHelpers';

let ctx: CanvasRenderingContext2D;
let canvas: HTMLCanvasElement;
export default function Run() {
    canvas = document.getElementById('canvas') as HTMLCanvasElement;
    ResizeCanvas(canvas, 500, 500);

    ctx = canvas.getContext('2d');
    paintLoop();
}

function paintLoop() {
    repaint();
    requestAnimationFrame(() => paintLoop());
}

let frame = 0;
function repaint() {
    const vGradient = ctx.createLinearGradient(0, 0, 0, 500);
    const hGradient = ctx.createLinearGradient(0, 0, 500, 0);

    const highPercent = ((frame * 193) % 500) / 500;
    vGradient.addColorStop(0, greenIntensity(0.3));
    vGradient.addColorStop(Math.max(0, highPercent - .03), greenIntensity(0.3));
    vGradient.addColorStop(highPercent, greenIntensity(1));
    vGradient.addColorStop(Math.min(highPercent + .03, 1), greenIntensity(0.3));
    vGradient.addColorStop(1, greenIntensity(0.3));

    ctx.fillStyle = 'black';
    ctx.globalAlpha = 1;
    ctx.fillRect(0, 0, 500, 500);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = vGradient;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(250, 0);
    ctx.lineTo(400, 400);
    ctx.lineTo(100, 400);
    ctx.lineTo(250, 0);
    ctx.stroke();

    // Apply vergence H
    ctx.globalCompositeOperation = 'lighter';
    const segs = 100;
    const sh = (canvas.height / segs);
    for (let i = 0; i < segs; i++) {
        const ys = sh * i;
        const ye = sh * (i + 1);

        const dx = Math.floor((Math.random() - 0.5) * 5);

        ctx.drawImage(canvas, 0, ys, canvas.width, sh, dx, ys, canvas.width, sh);
    }

    // Apply vergence V
    const sw = (canvas.height / segs);
    for (let i = 0; i < segs; i++) {
        const xs = sh * i;
        const xe = sh * (i + 1);

        const dy = Math.floor((Math.random() - 0.5) * 5);

        ctx.drawImage(canvas, xs, 0, sw, canvas.height, xs, dy, sw, canvas.height);
    }
    ctx.globalCompositeOperation = 'source-over';

    frame++;
}

function greenIntensity(amt: number) {
    if (amt <= 0.5) {
        const gAmt = Math.floor(amt * 2 * 255);
        return 'rgb(0, ' + gAmt + ', 0)';
    }
    else  {
        const otherAmt = Math.floor((amt - 0.5) * 2 * 255);
        return 'rgb(' + otherAmt + ', 255, ' + otherAmt + ')';
    }
}