import Point from "../position/Point";

export class Circle {
    constructor(public position: Point, public radius: number) {

    }

    surfaceDepth(other: Circle) {
        return Point.subtract(this.position, other.position).Length() - this.radius - other.radius;
    }

    intersects(other: Circle): boolean {
        return this.surfaceDepth(other) <= 0;
    }
}