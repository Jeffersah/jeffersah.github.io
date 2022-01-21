import Point from './Point';
import { Direction, ECardinalDirection, EDiagonalDirection } from './Direction';

export default class Rect {
    constructor(public x: number, public y: number, public w: number, public h: number) { }

    shift(x: number, y: number): Rect;
    shift(p: Point): Rect;
    shift(xp: number | Point, y?: number): Rect {
        if (y === undefined) {
            return new Rect(this.x + (xp as Point).x, this.y + (xp as Point).y, this.w, this.h);
        }
        return new Rect(this.x + (xp as number), this.y + y, this.w, this.h);
    }

    shiftBy(x: number, y: number): void;
    shiftBy(p: Point): void;
    shiftBy(xp: number | Point, y?: number): void {
        if (y === undefined) {
            this.x += (xp as Point).x;
            this.y += (xp as Point).y;
        } else {
            this.x += (xp as number);
            this.y += y;
        }
    }

    edge(direction: ECardinalDirection): number {
        switch (direction) {
            case Direction.Up: return this.y;
            case Direction.Down: return this.y + this.h;
            case Direction.Left: return this.x;
            case Direction.Right: return this.x + this.w;
        }
    }

    corner(direction: EDiagonalDirection): Point {
        switch (direction) {
            case Direction.UpRight: return new Point(this.x, this.y);
            case Direction.DownRight: return new Point(this.x, this.y);
            case Direction.DownLeft: return new Point(this.x, this.y);
            case Direction.UpLeft: return new Point(this.x, this.y);
        }
    }

    equals(r: Rect) {
        return r.x === this.x && r.y === this.y && r.w === this.w && r.h === this.h;
    }
}