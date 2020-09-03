import * as React from 'react';
import BoardStackRendererComponent from './BoardStackRendererComponent';
import Board, { populateDefaultLayout } from './models/IBoard';
import { IState } from './models/State';
import Update from './update/Update';
import useAnimationFrame from '../../../hooks/useAnimationFrame';
import { IGeneralProps } from './Chess3dComponent';
import { withResizeDetector } from 'react-resize-detector';
import useCanvas from '../../../hooks/useCanvas';
import { ResizeCanvas } from '../../../projects/common/CanvasHelpers';
import { pathCubeOutside, findCubeCenter } from './canvas/renderHelper';
import { Complex } from '../../../projects/common';
import { board } from './css/singleBoard.css';
import Point3 from './position/Point3';

const axiesByRotation: [Point3, Point3][] = [
    [new Point3(1, 0, 0), new Point3(0, 1, 0)],
    [new Point3(0, 1, 0), new Point3(-1, 0, 0)],
    [new Point3(-1, 0, 0), new Point3(0, -1, 0)],
    [new Point3(0, -1, 0), new Point3(1, 0, 0)],
];

const spinAmt = 0.1;

export interface IChess3dDisplayProps extends IGeneralProps {
    width: number;
    height: number;
    angle: number;
    addAngularVel: (v: number) => void;
}

function paintCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, props: IChess3dDisplayProps) {
    ctx.save();
    function coordToPercentage(n: number) {
        return (2 * (n + 0.5) - props.state.board.size) / (props.state.board.size);
    }

    function axisToStart(axis: Point3) {
        const value = axis.x === 0 ? axis.y : axis.x;
        if (value > 0) return new Point3(0, 0, 0);
        else {
            return Point3.Mult(axis, -(props.state.board.size - 1));
        }
    }

    let inputAngle = props.angle % (2 * Math.PI);
    if (inputAngle < 0) {
        inputAngle += Math.PI * 2;
    }

    const angle = Complex.expi(inputAngle);
    const quadrant = Math.floor(inputAngle * 2 / Math.PI) % 4;

    const [mainAxis, subAxis] = axiesByRotation[quadrant];
    const [mainAxisStart, subAxisStart] = [
        axisToStart(mainAxis),
        axisToStart(subAxis)
    ];

    // console.log('m: ' + mainAxisStart + ' n' + mainAxis);
    // console.log('s: ' + subAxisStart + ' n' + subAxis);

    ctx.strokeStyle = 'red';
    ctx.beginPath();
    ctx.strokeText('Q: ' + quadrant, 20, 20);
    ctx.stroke();

    for (let x = 0; x < props.state.board.size; x++) {
        for (let y = 0; y < props.state.board.size; y++) {
            for (let z = 0; z < props.state.board.size; z++) {
                let worldPos = Point3.Add(Point3.Mult(mainAxis, x), Point3.Mult(subAxis, y));
                worldPos = Point3.Add(worldPos, mainAxisStart);
                worldPos = Point3.Add(worldPos, subAxisStart);
                worldPos.z = z;
                const screenPos = findCubeCenter(props.width / 2, props.height / 2, coordToPercentage(worldPos.y), coordToPercentage(worldPos.x), coordToPercentage(z), 0.3, props.width / 4, props.height / 3, inputAngle);
                const piece = props.state.board.getPiece(worldPos);
                let size = 2;
                ctx.globalAlpha = 1;
                if (props.state.selected?.equals(worldPos) ?? false) {
                    ctx.fillStyle = 'yellow';
                    size = 6;
                } else if (props.state.board.highlights[worldPos.x][worldPos.y][worldPos.z]) {
                    ctx.fillStyle = 'cyan';
                    size = 4;
                } else if (piece !== undefined) {
                    ctx.fillStyle = piece.team;
                    size = 4;
                } else {
                    ctx.fillStyle = 'transparent';
                }

                if (ctx.fillStyle !== 'transparent') {
                    ctx.strokeStyle = 'black';
                    ctx.beginPath();
                    pathCubeOutside(ctx, screenPos.x, screenPos.y, props.width / 4 / props.state.board.size, 0.3, props.height / 3 / props.state.board.size, inputAngle);
                    ctx.fill();
                    ctx.stroke();
                }
            }
        }
    }

    ctx.restore();
}

function Chess3dDisplay(props: IChess3dDisplayProps) {

    const ref = useCanvas((canvas, ctx) => {
        // Do repaint here
        if (canvas.width !== props.width || canvas.height !== props.height) {
            canvas.width = props.width;
            canvas.height = props.height;
        }
        ctx.clearRect(0, 0, props.width, props.height);
        paintCanvas(canvas, ctx, props);
    }, [props]);

    return <div style={{ width: '100%', height: '100%', position: 'relative' }}>
        <canvas ref={ref} style={{ width: '100%', height: '100%' }} />
        <div className='flex row justify-space-around' style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
            <button onClick={() => props.addAngularVel(-spinAmt)} style={{width: '25%'}}>&lt;</button>
            <button onClick={() => props.addAngularVel(spinAmt)} style={{width: '25%'}}>&gt;</button>
        </div>
    </div>;
}

export default withResizeDetector(Chess3dDisplay);