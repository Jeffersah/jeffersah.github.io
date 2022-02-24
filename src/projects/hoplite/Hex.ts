import Point from "../common/position/Point";
import { MAP_CENTER_POSITION, PIX_PER_CELL_X, PIX_PER_CELL_Y } from "./Constants";
import { Direction, DirectionHelper } from "./Direction";

export function TurnRight(pt: Point, amt?: number) {
    for(let i = 0; i < (amt ?? 1); i++){
        pt = new Point(-pt.y, pt.x + pt.y);
    }
    return pt;
}

export function TurnLeft(pt: Point, amt?: number) {
    for(let i = 0; i < (amt ?? 1); i++){
        pt = new Point(pt.x + pt.y, -pt.x);
    }
    return pt;
}

// px = 16 * t.y + t.x * 32 + c.x
// py = 24 * t.y + c.y
export function HexToPixel(point: Point) {
    return Point.add(
        Point.multiply(PIX_PER_CELL_Y, point.y), 
        point.x * PIX_PER_CELL_X + MAP_CENTER_POSITION.x, MAP_CENTER_POSITION.y);
}

// (px - c.x - 16 ty) / 32 = t.x
// (py - c.y) / 24 = t.y
export function PixelToHex(point: Point) {
    const tile_y = Math.floor((point.y - MAP_CENTER_POSITION.y) / PIX_PER_CELL_Y.y);
    const tile_x = Math.floor((point.x - MAP_CENTER_POSITION.x - PIX_PER_CELL_Y.x * tile_y) / PIX_PER_CELL_X);
    return new Point(tile_x, tile_y);
}

export function HexLength(point: Point): number {
    if(Math.sign(point.x) === - Math.sign(point.y)) {
        return Math.max(Math.abs(point.x), Math.abs(point.y));
    }
    else {
        return Math.abs(point.x) + Math.abs(point.y);
    }
}

export function IsStraightLine(ray: Point): boolean {
    if(ray.x === 0 || ray.y === 0 || ray.x === -ray.y) return true;
    return false;
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