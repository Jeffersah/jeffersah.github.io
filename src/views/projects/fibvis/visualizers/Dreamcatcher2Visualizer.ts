import Point from "../../../../projects/common/position/Point";
import IVisualizer from "./IVisualizer";

export default class Dreamcatcher2Visualizer implements IVisualizer {

    anchorPoints: Point[];
    anchorArcCenterAngles: number[];

    constructor(public modulo: number, public series: number[], private fixedMinorRadius?: number) {
        this.anchorPoints = [];
        this.anchorArcCenterAngles = [];
        const anglePerAnchor = (Math.PI * 2) / (modulo);
        for(let i = 0; i < this.modulo; i++) {
            const angle = i * anglePerAnchor;
            this.anchorPoints.push(Point.fromAngle(angle, 1));
            this.anchorArcCenterAngles.push((Math.PI + angle) % (Math.PI * 2));
        }
    }

    paintFrame(ctx: CanvasRenderingContext2D, width: number, height: number, animationProgress: number): void {

        const actualRadius = (Math.min(width, height) / 2) - ctx.lineWidth;
        let minorRadius = actualRadius / this.anchorPoints.length;
        if(this.fixedMinorRadius !== undefined) {
            minorRadius = this.fixedMinorRadius * actualRadius;
        }
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
            else if(this.series[i] !== this.series[i - 1]) {
                ctx.lineTo(coords.x, coords.y);
            }
            else {
                let angleTowardsCenter = this.anchorArcCenterAngles[this.series[i]];
                let anchor = Point.multiply(this.anchorPoints[this.series[i]], actualRadius);
                anchor.addWith(width / 2, height / 2);
                anchor.addWith(Point.fromAngle(angleTowardsCenter, minorRadius));
                ctx.arc(anchor.x, anchor.y, minorRadius, angleTowardsCenter + Math.PI, angleTowardsCenter + Math.PI * 3, false);
            }
        }
        const seriesIndex = Math.floor(indexProgress);
        const progress = indexProgress % 1;

        let startPoint = this.anchorPoints[this.series[seriesIndex]];
        let endPoint = this.anchorPoints[this.series[seriesIndex + 1]];

        let tgtPoint = new Point(0,0);

        if(this.series[seriesIndex] !== this.series[seriesIndex + 1]){
            tgtPoint = Point.interpolate(startPoint, endPoint, progress);
            tgtPoint.multWith(actualRadius, actualRadius);
            tgtPoint.addWith(width / 2, height / 2);

            ctx.lineTo(tgtPoint.x, tgtPoint.y);
            ctx.stroke();
        } else {
            let angleTowardsCenter = this.anchorArcCenterAngles[this.series[seriesIndex]];
            let anchor = Point.multiply(startPoint, actualRadius);

            anchor.addWith(width / 2, height / 2);
            anchor.addWith(Point.fromAngle(angleTowardsCenter, minorRadius));

            const endAngle = angleTowardsCenter + Math.PI + (Math.PI * 2 * progress);

            tgtPoint.x = Math.cos(endAngle) * minorRadius + anchor.x;
            tgtPoint.y = Math.sin(endAngle) * minorRadius + anchor.y;

            ctx.arc(anchor.x, anchor.y, minorRadius, angleTowardsCenter + Math.PI, endAngle, false);
            ctx.stroke();
        }

        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(tgtPoint.x, tgtPoint.y, ctx.lineWidth * 2, 0, Math.PI * 2, false);
        ctx.stroke();
    }

    paintTotal(ctx: CanvasRenderingContext2D, width: number, height: number): void {
        const actualRadius = (Math.min(width, height) / 2) - ctx.lineWidth;
        let minorRadius = actualRadius / this.anchorPoints.length;
        if(this.fixedMinorRadius !== undefined) {
            minorRadius = this.fixedMinorRadius * actualRadius;
        }

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
            else if(this.series[i] !== this.series[i - 1]) {
                ctx.lineTo(coords.x, coords.y);
            }
            else {
                let angleTowardsCenter = this.anchorArcCenterAngles[this.series[i]];
                let anchor = Point.multiply(this.anchorPoints[this.series[i]], actualRadius);
                anchor.addWith(width / 2, height / 2);
                anchor.addWith(Point.fromAngle(angleTowardsCenter, minorRadius));
                ctx.arc(anchor.x, anchor.y, minorRadius, angleTowardsCenter + Math.PI, angleTowardsCenter + Math.PI * 3, false);
            }
        }
        ctx.stroke();
    }
}