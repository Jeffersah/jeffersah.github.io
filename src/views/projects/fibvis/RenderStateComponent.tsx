import * as React from 'react';
import { ResizeCanvas } from '../../../projects/common/CanvasHelpers';
import IVisualizer from './visualizers/IVisualizer';
import VisualizerDef from './visualizers/VisualizerDef';

export type RenderStateComponentProps = {animate: boolean, animationDuration: number, visualizer: IVisualizer };
export type RenderStateComponentState = {};
const CVS_SIZE = 500;
const LINE_SIZE = 3;

export default class RenderStateComponent extends React.Component<RenderStateComponentProps, RenderStateComponentState>
{
    canvasRef: React.RefObject<HTMLCanvasElement>;
    animationTick: number;
    animationTimer: number;
    isRunningAnimation: boolean;

    constructor(props : RenderStateComponentProps) {
        super(props);
        this.canvasRef = React.createRef();
        this.animationTick = 0;
        this.animationTimer = 0;
        this.isRunningAnimation = false;
    }

    render() {
        return <canvas ref={this.canvasRef}>

        </canvas>
    }

    componentDidMount() {
        this.startPaint();
    }
    componentDidUpdate(prevProps: RenderStateComponentProps, prevState: RenderStateComponentState) {
        if(prevProps.animate !== this.props.animate || prevProps.visualizer !== this.props.visualizer || prevProps.animationDuration !== this.props.animationDuration)
        {
            this.stopPreviousPaint();
            this.startPaint();
        }
    }

    startPaint() {
        const canvas = this.canvasRef.current;
        ResizeCanvas(canvas, CVS_SIZE, CVS_SIZE);
        const ctx = canvas.getContext('2d');
        ctx.lineWidth = LINE_SIZE;
        this.clearCanvas(ctx);

        if(!this.props.animate)
            this.props.visualizer.paintTotal(ctx, CVS_SIZE, CVS_SIZE);
        else {
            this.animationTick = 0;
            this.isRunningAnimation = true;
            this.animationTimer = requestAnimationFrame(() => this.paintFrame(ctx));
        }
    }

    clearCanvas(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, CVS_SIZE, CVS_SIZE);
    }

    stopPreviousPaint(){
        if(this.isRunningAnimation) {
            cancelAnimationFrame(this.animationTimer);
        }
    }

    paintFrame(ctx: CanvasRenderingContext2D) {
        this.animationTick++;
        this.clearCanvas(ctx);
        if(this.animationTick >= this.props.animationDuration * 60) {
            this.props.visualizer.paintTotal(ctx, CVS_SIZE, CVS_SIZE);
            this.isRunningAnimation = false;
            this.animationTick = this.animationTimer = 0;
        } else {
            this.props.visualizer.paintFrame(ctx, CVS_SIZE, CVS_SIZE, this.animationTick / (this.props.animationDuration * 60));
            this.animationTimer = requestAnimationFrame(() => this.paintFrame(ctx));
        }
    }
}