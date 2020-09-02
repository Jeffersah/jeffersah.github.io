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
import { pathCubeOutside } from './canvas/renderHelper';

export interface IChess3dDisplayProps extends IGeneralProps {
    width: number;
    height: number;
    angle: number;
}

function paintCanvas(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D, props: IChess3dDisplayProps) {
    ctx.beginPath();
    pathCubeOutside(ctx, props.width / 2, props.height / 2, props.width / 4, .3, props.height / 2, props.angle);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.fill();
}

function Chess3dDisplay(props: IChess3dDisplayProps) {

    const ref = useCanvas((canvas, ctx) => {
        // Do repaint here
        if (canvas.width !== props.width || canvas.height !== props.height) {
            canvas.width = props.width;
            canvas.height = props.height;
        }
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, props.width, props.height);
        paintCanvas(canvas, ctx, props);
    }, [props]);

    return <canvas ref={ref} style={{ width: '100%', height: '100%' }}></canvas>;
}

export default withResizeDetector(Chess3dDisplay);