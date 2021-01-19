import { VERSION } from '@microsoft/signalr';
import { Range } from '../common';
import Vector from '../common/3d/Vector';
import { ResizeCanvas } from '../common/CanvasHelpers';
import { Color } from '../common/Color';
import { unitRange } from '../common/Range';
import * as Const from './Constants';
import Rock from './rock';

const NUM_ROCKS = 50;

const MIN_POS = -100;
const MAX_POS = 100;
const MAX_V = 0.3;
const MIN_MASS = 1;
const MAX_MASS = 5;

let rocks: Rock[] = [];

function randBetween(min: number, max: number){
    return Math.random() * (max-min) + min;
}

export default function Run() {
    const canvas = document.getElementById('mainCanvas') as HTMLCanvasElement;

    ResizeCanvas(canvas, Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT);

    for(let i = 0; i < NUM_ROCKS; i++){
        rocks.push(new Rock(
            new Vector(randBetween(MIN_POS, MAX_POS), randBetween(MIN_POS, MAX_POS), randBetween(MIN_POS, MAX_POS)),
            new Vector(randBetween(-MAX_V, MAX_V),randBetween(-MAX_V, MAX_V),randBetween(-MAX_V, MAX_V)),
            randBetween(MIN_MASS, MAX_MASS),
            Color.rgb(1, 1, 1)
        ));
    }

    rocks.push(new Rock(new Vector( 0,0,0),
    new Vector(0,0,0),
    MAX_MASS * 5,
    Color.rgb(1, 0, 0)));

    loop(canvas.getContext('2d'));
}

function loop(ctx: CanvasRenderingContext2D) {
    tick(ctx);
    requestAnimationFrame(()=>loop(ctx));
}

function tick(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT);

    for(let i = 0; i < rocks.length; i++) {
        for(let j = 0; j < rocks.length; j++) {
            if(i !== j) { 
                rocks[i].applyGravitation(rocks[j]);
            }
        }
    }

    rocks.forEach(rock => {
        rock.finishTick();
    });
    rocks.sort((a, b) => a.Position.z - b.Position.z);
    rocks.forEach(rock => {
        rock.paint(ctx, projectPosition);
    });
}

const windowRange: Range = new Range(0, Math.min(Const.CANVAS_WIDTH, Const.CANVAS_HEIGHT));
const worldRange: Range = new Range(MIN_POS, MAX_POS);

function projectPosition(v: Vector): {x: number, y: number, depth: number} {
    return {
        x: worldRange.ConvertTo(v.x, windowRange),
        y: worldRange.ConvertTo(v.y, windowRange),
        depth: worldRange.ConvertTo(v.z, unitRange),
    };
}