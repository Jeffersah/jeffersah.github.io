import Vector from './Vector';
import { vec2 } from 'gl-matrix';

export default class Quaternion {
    constructor(public real: number, public i: number, public j: number, public k: number) {
    }

    public inverse(): Quaternion {
        const denom = Quaternion.Dot(this, this);
        return new Quaternion(this.real / denom, -this.i / denom, -this.j / denom, -this.k / denom);
    }

    public static Dot(a: Quaternion, b: Quaternion): number {
        return a.real * b.real + a.i * b.i + a.j * b.j + a.k * b.k;
    }

    public static axisRotation(axis: Vector, radians: number): Quaternion {
        const cos = Math.cos(radians / 2);
        const sin = Math.sin(radians / 2);
        const len = axis.length();

        return new Quaternion(cos, sin * axis.x / len, sin * axis.y / len, sin * axis.z / len);
    }

    public static multiply(a: Quaternion, b: Quaternion) {
        return new Quaternion (
            a.real * b.real - a.i * b.i - a.j * b.j - a.k * b.k,
            a.real * b.i + a.i * b.real + a.j * b.k - a.k * b.j,
            a.real * b.j - a.i * b.k + a.j * b.real + a.k * b.i,
            a.real * b.k + a.i * b.j - a.j * b.i + a.k * b.real
        );
    }

    public applyTransform(point: Quaternion): Quaternion;
    public applyTransform(vec3: Vector): Vector;
    public applyTransform(point: Quaternion|Vector): Quaternion|Vector {
        if ((point as any).real !== undefined) {
            return Quaternion.multiply(this, Quaternion.multiply(point as Quaternion, this.inverse()));
        }
        else {
            const inputQ = new Quaternion(0, (point as Vector).x, (point as Vector).y, (point as Vector).z);
            const qOut = Quaternion.multiply(this, Quaternion.multiply(inputQ, this.inverse()));
            return new Vector(qOut.i, qOut.j, qOut.k);
        }
    }
}