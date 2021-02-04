import Point from "../position/Point";

export class Rectangle {
    constructor(public position: Point, public width: number, public height: number) {

    }

    intersects(other: Rectangle) {
        var xIntersects = inRange(this.position.x, other.position.x, other.width) ||
                          inRange(this.position.x + this.width, other.position.x, other.width) ||
                          inRange(other.position.x, this.position.x, this.width);
        var yIntersects = inRange(this.position.y, other.position.y, other.height) ||
                          inRange(this.position.y + this.height, other.position.y, other.height) ||
                          inRange(other.position.y, this.position.y, this.height);
        return xIntersects && yIntersects;
    }
}

function inRange(value: number, min: number, range: number) {
    return value >= min && value < min + range;
}