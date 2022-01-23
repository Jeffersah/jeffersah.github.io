export default class Point {

    static zero(): Point  {
        return new Point(0,0);
    }

    constructor(public x: number, public y: number) {

    }

    public static fromAngle(angle: number, distance?: number) : Point {
        return new Point(Math.cos(angle) * (distance ?? 1), Math.sin(angle) * (distance ?? 1));
    }

    public lengthSq(): number {
        return Point.dot(this, this);
    }

    public length(): number {
        return Math.sqrt(this.lengthSq());
    }

    public clone(): Point {
        return new Point(this.x, this.y);
    }

    public negate(): Point {
        return new Point(-this.x, -this.y);
    }

    public negateInPlace(): this {
        this.x = -this.x;
        this.y = -this.y;
        return this;
    }

    public static dot(p1: Point, p2: Point): number {
        return p1.x * p2.x + p1.y * p2.y;
    }

    public dotWith(other: Point): number {
        return Point.dot(this, other);
    }

    public normalize(): Point {
        let len = this.length();
        return Point.multiply(this, 1 / len);
    }

    public direction(): number {
        return Math.atan2(this.y, this.x);
    }

    public truncate(): Point {
        return new Point(Math.trunc(this.x), Math.trunc(this.y));
    }

    public addWith(x: number, y: number): this;
    public addWith(other: Point): this;
    public addWith(other: number|Point, y?: number): this {
        const {x: nx, y: ny} = splitArgs(other, y);
        this.x += nx;
        this.y += ny;
        return this;
    }

    public multWith(s: number): this;
    public multWith(x: number, y: number): this;
    public multWith(other: Point): this;
    public multWith(other: number|Point, y?: number): this {
        const {x: nx, y: ny} = splitArgsOrSingle(other, y);
        this.x *= nx;
        this.y *= ny;
        return this;
    }

    public subtractWith(x: number, y: number): this;
    public subtractWith(other: Point): this;
    public subtractWith(other: number|Point, y?: number): this {
        const {x: nx, y: ny} = splitArgs(other, y);
        this.x -= nx;
        this.y -= ny;
        return this;
    }

    public divideWith(x: number, y: number): this;
    public divideWith(other: Point): this;
    public divideWith(other: number|Point, y?: number): this {
        const {x: nx, y: ny} = splitArgs(other, y);
        this.x /= nx;
        this.y /= ny;
        return this;
    }

    public equals(other: Point): boolean {
        return this.x === other.x && this.y === other.y;
    }

    
    static add(src: Point, x: number, y: number): Point;
    static add(src: Point, other: Point): Point;
    static add(src: Point, other: number|Point, y?: number): Point {
        const {x: nx, y: ny} = splitArgs(other, y);
        return new Point(src.x + nx, src.y + ny);
    }

    static subtract(src: Point, x: number, y: number): Point;
    static subtract(src: Point, other: Point): Point;
    static subtract(src: Point, other: number|Point, y?: number): Point {
        const {x: nx, y: ny} = splitArgs(other, y);
        return new Point(src.x - nx, src.y - ny);
    }

    static multiply(a: Point, s: number, sy?: number): Point;
    static multiply(a: Point, b: Point): Point;
    static multiply(a: Point, b: Point|number, sy ?: number): Point {
        if (sy !== undefined) {
            return new Point(a.x * (b as number), a.y * sy);
        }
        else if ((b as any).x !== undefined) {
            return new Point(a.x * (b as Point).x, a.y * (b as Point).y);
        } else {
            return new Point(a.x * (b as number), a.y * (b as number));
        }
    }

    static interpolate(a: Point, b: Point, p: number): Point {
        if(p === 0) return a;
        if(p === 1) return b;
        return new Point(a.x + (b.x - a.x) * p, a.y + (b.y - a.y) * p);
    }

    static componentMin(a: Point, b: Point): Point {
        if(a.x <= b.x && a.y <= b.y) return a;
        if(b.x <= a.x && b.y <= a.y) return b;
        return new Point(Math.min(a.x, b.x), Math.min(a.y, b.y));
    }
    
    static componentMax(a: Point, b: Point): Point {
        if(a.x >= b.x && a.y >= b.y) return a;
        if(b.x >= a.x && b.y >= a.y) return b;
        return new Point(Math.max(a.x, b.x), Math.max(a.y, b.y));
    }

    static Bezier(pts: Point[], t: number): Point {
        if(pts.length === 1) return pts[0];
        else if(pts.length === 2) return Point.add(Point.multiply(pts[1], t), Point.multiply(pts[0], 1-t));
        return Point.add(
            Point.multiply(Point.Bezier(pts.slice(1), t), t),
            Point.multiply(Point.Bezier(pts.slice(0, pts.length - 1), t), 1-t));
    }

    rotate(theta: number): Point {
        const angle = Math.atan2(this.y, this.x);
        const len = this.length();
        return Point.fromAngle(angle + theta, len);
    }
}

function splitArgs(x: Point|number, y ?: number): {x: number, y: number} {
    if(y === undefined) return { x: (<Point>x).x, y: (<Point>x).y };
    return {x: <number>x, y};
}

function splitArgsOrSingle(x: Point|number, y ?: number): {x: number, y: number} {
    if(y === undefined)
    {
        if((x as Point).x !== undefined) {
            return { x: (<Point>x).x, y: (<Point>x).y };
        }
        return { x: x as number, y: x as number };
    } 
    return {x: <number>x, y};
}