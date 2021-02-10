import Point from "../../common/position/Point";

export interface IDebugMarker {
    draw(ctx: CanvasRenderingContext2D): void;
}

export class DebugPoint implements IDebugMarker {
    constructor(public point: Point, public color?: string, public radius?: number) {

    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.color ?? 'red';
        ctx.beginPath();
        ctx.arc(this.point.x, this.point.y, this.radius ?? 10, 0, Math.PI * 2);
        ctx.stroke();
    }
}

export class DebugCross implements IDebugMarker {
    constructor(public point: Point, public color?: string, public radius?: number) {

    }
    draw(ctx: CanvasRenderingContext2D): void {
        const radius = this.radius ?? 10;
        ctx.strokeStyle = this.color ?? 'red';
        ctx.beginPath();
        ctx.moveTo(this.point.x - radius, this.point.y - radius);
        ctx.lineTo(this.point.x + radius, this.point.y + radius);
        ctx.moveTo(this.point.x + radius, this.point.y - radius);
        ctx.lineTo(this.point.x - radius, this.point.y + radius);
        ctx.stroke();
    }
}

export class DebugPlus implements IDebugMarker {
    constructor(public point: Point, public color?: string, public radius?: number) {

    }
    draw(ctx: CanvasRenderingContext2D): void {
        const radius = this.radius ?? 10;
        ctx.strokeStyle = this.color ?? 'red';
        ctx.beginPath();
        ctx.moveTo(this.point.x, this.point.y - radius);
        ctx.lineTo(this.point.x, this.point.y + radius);
        ctx.moveTo(this.point.x - radius, this.point.y);
        ctx.lineTo(this.point.x + radius, this.point.y);
        ctx.stroke();
    }
}


export class DebugRay implements IDebugMarker {
    constructor(public point: Point, public direction: number, public color?: string, public radius?: number) {

    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.color ?? 'red';
        ctx.beginPath();
        ctx.moveTo(this.point.x, this.point.y);
        const tgt = Point.add(this.point, Point.fromAngle(this.direction, this.radius ?? 50));
        ctx.lineTo(tgt.x, tgt.y)
        ctx.stroke();
    }
}


export class DebugLine implements IDebugMarker {
    constructor(public point: Point, public point2: Point, public color?: string) {

    }
    draw(ctx: CanvasRenderingContext2D): void {
        ctx.strokeStyle = this.color ?? 'red';
        ctx.beginPath();
        ctx.moveTo(this.point.x, this.point.y);
        ctx.lineTo(this.point2.x, this.point2.y)
        ctx.stroke();
    }
}