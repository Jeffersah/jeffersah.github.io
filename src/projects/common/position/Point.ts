export default class Point {
    constructor(public x: number, public y: number) {

    }

    public LengthSq(): number {
        return Point.Dot(this, this);
    }

    public Length(): number {
        return Math.sqrt(this.LengthSq());
    }

    public Clone(): Point {
        return new Point(this.x, this.y);
    }

    public Negate(): Point {
        return new Point(-this.x, -this.y);
    }

    public NegateInPlace(): this {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    public static Dot(p1: Point, p2: Point): number {
        return p1.x * p2.x + p1.y * p2.y;
    }

    public DotWith(other: Point): number {
        return Point.Dot(this, other);
    }


    public Direction(): number {
        return Math.atan2(this.y, this.x);
    }

    public AddWith(x: number, y: number): this;
    public AddWith(other: Point): this;
    public AddWith(other: number|Point, y?: number): this {
        const nx = y === undefined ? (other as Point).x : other as number;
        const ny = y === undefined ? (other as Point).y : y;
        this.x += nx;
        this.y += ny;
        return this;
    }

    public MultWith(x: number, y: number): this;
    public MultWith(other: Point): this;
    public MultWith(other: number|Point, y?: number): this {
        const nx = y === undefined ? (other as Point).x : other as number;
        const ny = y === undefined ? (other as Point).y : y;
        this.x *= nx;
        this.y *= ny;
        return this;
    }

    public SubtractWith(x: number, y: number): this;
    public SubtractWith(other: Point): this;
    public SubtractWith(other: number|Point, y?: number): this {
        const nx = y === undefined ? (other as Point).x : other as number;
        const ny = y === undefined ? (other as Point).y : y;
        this.x -= nx;
        this.y -= ny;
        return this;
    }

    public DivideWith(x: number, y: number): this;
    public DivideWith(other: Point): this;
    public DivideWith(other: number|Point, y?: number): this {
        const nx = y === undefined ? (other as Point).x : other as number;
        const ny = y === undefined ? (other as Point).y : y;
        this.x /= nx;
        this.y /= ny;
        return this;
    }

    public Equals(other: Point): boolean {
        return this.x === other.x && this.y === other.y;
    }

    static Add(a: Point, b: Point): Point {
        return new Point(a.x + b.x, a.y + b.y);
    }

    static Multiply(a: Point, s: number, sy?: number): Point;
    static Multiply(a: Point, b: Point): Point;
    static Multiply(a: Point, b: Point|number, sy ?: number): Point {
        if (sy !== undefined) {
            return new Point(a.x * (b as number), a.y * sy);
        }
        else if ((b as any).x !== undefined) {
            return new Point(a.x * (b as Point).x, a.y * (b as Point).y);
        } else {
            return new Point(a.x * (b as number), a.y * (b as number));
        }
    }
}