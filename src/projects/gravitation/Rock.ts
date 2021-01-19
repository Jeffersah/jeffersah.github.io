import Vector from "../common/3d/Vector";
import { Color } from "../common/Color";
import * as C from './Constants';

export default class Rock {
    Position: Vector;
    Velocity: Vector;
    Mass: number;
    Color: Color;

    constructor(pos: Vector, vel: Vector, mass: number, color: Color) {
        this.Position = pos;
        this.Velocity = vel;
        this.Mass = mass;
        this.Color = color;
    }

    applyGravitation(other: Rock) {
        let gravVector = other.Position.subtract(this.Position);
        const minlength = (this.Mass + other.Mass) * C.MASS_COLISION_SCALE;
        const lengthSq = Math.max(gravVector.lengthSq() * C.LEN_SCALE_SQ, minlength * minlength);
        let force = gravVector.normalize().multiply(other.Mass).multiply(C.G_CONST / lengthSq);
        let accel = force.multiply(1/this.Mass);
        this.Velocity = this.Velocity.add(accel);
    }

    finishTick() {
        this.Position = this.Position.add(this.Velocity);
    }

    paint(ctx: CanvasRenderingContext2D, project: (v: Vector) => {x: number, y: number, depth: number}) {
        ctx.save();
        const { x, y, depth } = project(this.Position);
        const colorScale = Math.max(Math.min(depth, 1), 0);
        ctx.fillStyle = Color.rgb(this.Color.r() * colorScale, this.Color.g() * colorScale, this.Color.b() * colorScale).toString();
        let size = C.SCALE_PER_MASS * this.Mass * depth;
        size = Math.min(Math.max(size, 1), 100);

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2, false);
        ctx.fill();
        ctx.restore();
    }
}