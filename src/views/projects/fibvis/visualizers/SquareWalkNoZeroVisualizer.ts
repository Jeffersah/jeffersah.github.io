import Point from "../../../../projects/common/position/Point";
import CoreState from "../../../../projects/corewar/CoreState";
import IVisualizer from "./IVisualizer";

const MARGIN = 0.1;
const dirs = [
    new Point(1, 0),
    new Point(0, 1),
    new Point(-1, 0),
    new Point(0, -1),
]

export default class SquareWalkNoZeroVisualizer implements IVisualizer {

    pts: Point[];
    minExtent: Point;
    maxExtent: Point;

    constructor(public modulo: number, public series: number[]) {
        const currentPoint = new Point(0,0);
        this.pts = [currentPoint.clone()];
        this.minExtent = currentPoint.clone();
        this.maxExtent = currentPoint.clone();
        let dir = 0;

        for(let i = 0; i < series.length; i++) {
            dir = series[i] % 2 == 0 ? dir + 1
                : dir-1;
            dir += dirs.length;
            dir %= dirs.length;
            currentPoint.addWith(dirs[dir]);
            var pt = currentPoint.clone();
            this.minExtent = Point.componentMin(this.minExtent, pt);
            this.maxExtent = Point.componentMax(this.maxExtent, pt);
            this.pts.push(pt);
        }
        if(this.minExtent.x === this.maxExtent.x){
            this.minExtent.x = -1;
            this.maxExtent.x = 1;
        }
        if(this.minExtent.y === this.maxExtent.y){
            this.minExtent.y = -1;
            this.maxExtent.y = 1;
        }
        // Normalize all points to [0, 1]
        for(let i = 0; i < this.pts.length; i++) {
            this.pts[i] = new Point(
                (this.pts[i].x - this.minExtent.x) / (this.maxExtent.x - this.minExtent.x),
                (this.pts[i].y - this.minExtent.y) / (this.maxExtent.y - this.minExtent.y)
            );
        }
    }

    paintFrame(ctx: CanvasRenderingContext2D, width: number, height: number, animationProgress: number): void {
        ctx.save();
        ctx.translate(width * MARGIN / 2, height * MARGIN / 2);
        ctx.scale(1-MARGIN, 1-MARGIN);
        ctx.strokeStyle = 'gray';
        ctx.lineJoin = ctx.lineCap = 'round';

        const indexProgress = animationProgress * (this.pts.length - 1);
        const seriesIndex = Math.floor(indexProgress);
        const progress = indexProgress % 1;


        ctx.beginPath();
        ctx.moveTo(this.pts[0].x * width, this.pts[0].y * height);
        for(let i = 1; i < this.pts.length && i < indexProgress; i++){
            ctx.lineTo(this.pts[i].x * width, this.pts[i].y * height)
        }
        let startPoint = this.pts[seriesIndex];
        let endPoint = this.pts[seriesIndex + 1];
        const tgtPoint = Point.interpolate(startPoint, endPoint, progress);
        tgtPoint.multWith(width, height);
        ctx.lineTo(tgtPoint.x, tgtPoint.y)
        ctx.stroke();

        ctx.strokeStyle = 'red';
        ctx.beginPath();
        ctx.arc(tgtPoint.x, tgtPoint.y, ctx.lineWidth * 2, 0, Math.PI * 2, false);
        ctx.stroke();
        ctx.restore();
    }

    paintTotal(ctx: CanvasRenderingContext2D, width: number, height: number): void {
        ctx.save();
        ctx.translate(width * MARGIN / 2, height * MARGIN / 2);
        ctx.scale(1-MARGIN, 1-MARGIN);
        ctx.strokeStyle = 'gray';
        ctx.lineJoin = ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(this.pts[0].x * width, this.pts[0].y * height);
        for(let i = 1; i < this.pts.length; i++){
            ctx.lineTo(this.pts[i].x * width, this.pts[i].y * height)
        }
        ctx.stroke();
        ctx.restore();
    }
}