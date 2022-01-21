import Point from "../../../../projects/common/position/Point";
import IVisualizer from "./IVisualizer";

export default class DreamcatcherVisualizer implements IVisualizer {

    anchorPoints: Point[];

    constructor(public modulo: number, public series: number[]) {
        this.anchorPoints = [];
        const anglePerAnchor = (Math.PI * 2) / (modulo);
        for(let i = 0; i < this.modulo; i++)
        {
            const angle = i * anglePerAnchor;
            this.anchorPoints.push(Point.fromAngle(angle, 1));
        }
    }

    paintFrame(ctx: CanvasRenderingContext2D, width: number, height: number, animationProgress: number): void {
        const actualRadius = (Math.min(width, height) / 2) - ctx.lineWidth;
        const indexProgress = animationProgress * (this.series.length - 1);
        
        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, actualRadius, 0, Math.PI * 2, false);
        ctx.stroke();
        
        ctx.strokeStyle = 'gray';
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.beginPath();
        for(let i = 0; i < this.series.length && i < indexProgress; i++){
            let coords = this.anchorPoints[this.series[i]].clone();
            coords.multWith(actualRadius, actualRadius);
            coords.addWith(width / 2, height / 2);
            if(i === 0) ctx.moveTo(coords.x, coords.y);
            else ctx.lineTo(coords.x, coords.y);
        }
        const seriesIndex = Math.floor(indexProgress);
        const progress = indexProgress % 1;
        let startPoint = this.anchorPoints[this.series[seriesIndex]];
        let endPoint = this.anchorPoints[this.series[seriesIndex + 1]];

        const tgtPoint = Point.interpolate(startPoint, endPoint, progress);
        tgtPoint.multWith(actualRadius, actualRadius);
        tgtPoint.addWith(width / 2, height / 2);

        ctx.lineTo(tgtPoint.x, tgtPoint.y);
        ctx.stroke();

        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(tgtPoint.x, tgtPoint.y, ctx.lineWidth * 2, 0, Math.PI * 2, false);
        ctx.stroke();
    }

    paintTotal(ctx: CanvasRenderingContext2D, width: number, height: number): void {
        const actualRadius = (Math.min(width, height) / 2) - ctx.lineWidth;

        ctx.strokeStyle = 'white';
        ctx.beginPath();
        ctx.arc(width / 2, height / 2, actualRadius, 0, Math.PI * 2, false);
        ctx.stroke();
        
        ctx.strokeStyle = 'gray';
        ctx.lineJoin = ctx.lineCap = 'round';
        ctx.beginPath();
        for(let i = 0; i < this.series.length; i++){
            let coords = this.anchorPoints[this.series[i]].clone();
            coords.multWith(actualRadius, actualRadius);
            coords.addWith(width / 2, height / 2);
            if(i === 0) ctx.moveTo(coords.x, coords.y);
            else ctx.lineTo(coords.x, coords.y);
        }
        ctx.stroke();
    }
}