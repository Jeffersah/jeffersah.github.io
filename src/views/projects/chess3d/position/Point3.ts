export default class Point3 {
    constructor(public x: number, public y: number, public z: number) { }

    public lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }

    public length() {
        return Math.sqrt(this.lengthSq());
    }

    public static Add(a: Point3, b: Point3): Point3;
    public static Add(a: Point3, x: number, y: number, z: number): Point3;
    public static Add(a: Point3, b: Point3 | number, y?: number, z?: number): Point3 {
        const [mx, my, mz] = Point3.destructureArgs(b, y, z);
        return new Point3(a.x + mx, a.y + my, a.z + mz);
    }

    public static Mult(a: Point3, s: number | Point3): Point3;
    public static Mult(a: Point3, x: number, y: number, z: number): Point3;
    public static Mult(a: Point3, b: Point3 | number, y?: number, z?: number): Point3 {
        const [mx, my, mz] = Point3.destructureArgs(b, y, z);
        return new Point3(a.x * mx, a.y * my, a.z * mz);
    }

    private static destructureArgs(b: Point3|number, y?: number, z?: number): [number, number, number] {
        if (isPoint(b)) {
            return [b.x, b.y, b.z];
        } else if (y === undefined || z === undefined) {
            return [b, b, b];
        } else {
            return [b, y, z];
        }
    }

    public toString() {
        return `${this.x}, ${this.y}, ${this.z}`;
    }

    public equals(p: Point3) {
        if (p === undefined) return false;
        return p.x === this.x && p.y === this.y && p.z === this.z;
    }
}

function isPoint(arg: Point3 | number): arg is Point3 {
    return (arg as Point3).lengthSq !== undefined;
}

export const cardinalPoints = [
    new Point3(1, 0, 0),
    new Point3(-1, 0, 0),
    new Point3(0, 1, 0),
    new Point3(0, -1, 0),
    new Point3(0, 0, 1),
    new Point3(0, 0, -1),
];

export const diagonalPoints = [
    new Point3(1, 1, 0),
    new Point3(1, 0, 1),
    new Point3(1, 0, -1),
    new Point3(1, -1, 0),
    new Point3(0, 1, 1),
    new Point3(0, 1, -1),
    new Point3(0, -1, 1),
    new Point3(0, -1, -1),
    new Point3(-1, 1, 0),
    new Point3(-1, 0, 1),
    new Point3(-1, 0, -1),
    new Point3(-1, -1, 0),
];

export const triagonalPoints = [
    new Point3(1, 1, 1),

    new Point3(-1, 1, 1),
    new Point3(1, -1, 1),
    new Point3(1, 1, -1),

    new Point3(1, -1, -1),
    new Point3(-1, 1, -1),
    new Point3(-1, -1, 1),

    new Point3(-1, -1, -1),
];