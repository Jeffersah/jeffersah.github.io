import Point from "../common/position/Point";
import { MAP_CENTER_POSITION, PIX_PER_CELL_X, PIX_PER_CELL_Y } from "./Constants";
import { Direction, DirectionHelper } from "./Direction";

export function HexToPixel(point: Point) {
    return Point.add(Point.multiply(PIX_PER_CELL_Y, point.y), point.x * PIX_PER_CELL_X + MAP_CENTER_POSITION.x, MAP_CENTER_POSITION.y);
}

export function PixelToHex(point: Point) {
    let tilesY = point.y / PIX_PER_CELL_Y.y;
    let tilesX = (point.x - (tilesY * PIX_PER_CELL_Y.x)) / PIX_PER_CELL_X;
    return new Point(tilesX, tilesY);
}

export function HexLength(point: Point): number {
    if(Math.sign(point.x) === - Math.sign(point.y)) {
        return Math.max(Math.abs(point.x), Math.abs(point.y));
    }
    else {
        return Math.abs(point.x) + Math.abs(point.y);
    }
}

export function GetRing(radius: number) {
    if(radius === 0) return [new Point(0,0)];

    const result: Point[] = [];
    let pos = new Point(0, -radius);
    
    for(var direction = Direction.Right; direction <= Direction.UpRight; direction++) {
        var dir = DirectionHelper.ToPoint(direction);
        for(var len = 0; len < radius; len++){
            result.push(pos);
            pos = Point.add(pos, dir);
        }
    }

    return result;
}