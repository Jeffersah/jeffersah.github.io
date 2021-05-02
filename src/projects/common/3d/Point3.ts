export default class Point3 {

    static zero(): Point3  {
        return new Point3(0,0,0);
    }

    constructor(public x: number, public y: number, public z: number) {

    }
    public lengthSq(): number {
        return this.dot(this);
    }

    public length(): number {
        return Math.sqrt(this.lengthSq());
    }

    public clone(): Point3 {
        return new Point3(this.x, this.y, this.z);
    }

    public dot(other: Point3): number {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    public normalize(): Point3 {
        let len = this.length();
        return this.div(len);
    }

    public mult(p: Point3): Point3
    public mult(x: number, y: number, z: number): Point3
    public mult(s: number): Point3
    public mult(pxs: Point3 | number, iy?: number, iz?: number): Point3 {
        let {x, y, z} = splitArgs(pxs, iy, iz, true);
        return new Point3(x * this.x, y * this.y, z * this.z);
    }

    
    public div(p: Point3): Point3
    public div(x: number, y: number, z: number): Point3
    public div(s: number): Point3
    public div(pxs: Point3 | number, iy?: number, iz?: number): Point3 {
        let {x, y, z} = splitArgs(pxs, iy, iz, true);
        return new Point3(this.x / x, this.y / y, this.z / z);
    }

    public add(p: Point3): Point3
    public add(x: number, y: number, z: number): Point3
    public add(pxs: Point3 | number, iy?: number, iz?: number): Point3 {
        let {x, y, z} = splitArgs(pxs, iy, iz);
        return new Point3(this.x + x, this.y + y, this.z + z);
    }

    public sub(p: Point3): Point3
    public sub(x: number, y: number, z: number): Point3
    public sub(pxs: Point3 | number, iy?: number, iz?: number): Point3 {
        let {x, y, z} = splitArgs(pxs, iy, iz);
        return new Point3(this.x - x, this.y - y, this.z - z);
    }
}

function splitArgs(pxs: Point3 | number, y?: number, z?: number, allowSingle: boolean = false): {x: number, y: number, z: number} {
    if(y === undefined) {
        if(!allowSingle || (pxs as Point3).x !== undefined) {
            return (pxs as Point3);
        } else {
            return { x: pxs as number, y: pxs as number, z: pxs as number };
        }
    }
    else {
        return { x: pxs as number, y, z };
    }
}