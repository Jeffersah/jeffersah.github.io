import { VERSION } from "@microsoft/signalr";

export default class Vector {
    constructor(public x: number, public y: number, public z: number) {
    }

    dot(other: Vector) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    normalize() {
        return this.multiply(1 / this.lengthSq());
    }
    negate() {
        return new Vector(-this.x, -this.y, -this.z);
    }

    multiply(scale: number): Vector;
    multiply(xscale: number, yscale: number, zscale: number): Vector;
    multiply(scale: Vector): Vector;
    multiply(sx: number | Vector, sy ?: number, sz ?: number): Vector {
        if(!isVector(sx))
        {
            sy = sy ?? <number>sx;
            sz = sz ?? <number>sx;
        }
        var [x, y, z] = Vector.getxyz(sx, sy, sz);
        return new Vector(this.x * x, this.y * y, this.z * z);
    }

    add(dx: number, dy: number, dz: number): Vector;
    add(v: Vector): Vector;
    add(dx: number | Vector, dy ?: number, dz ?: number): Vector {
        var [x, y, z] = Vector.getxyz(dx, dy, dz);
        return new Vector(this.x + x, this.y + y, this.z + z);
    }

    subtract(dx: number, dy: number, dz: number): Vector;
    subtract(v: Vector): Vector;
    subtract(dx: number | Vector, dy ?: number, dz ?: number): Vector {
        var [x, y, z] = Vector.getxyz(dx, dy, dz);
        return new Vector(this.x - x, this.y - y, this.z - z);
    }

    private static getxyz(x: number | Vector, y?: number, z?: number): [number, number, number] {
        if(isVector(x)) {
            return [x.x, x.y, x.z];
        }
        else {
            return [x, y, z];
        }
    }
}

function isVector(x: number | Vector) : x is Vector {
    return (<any>x).x !== undefined;
}