import { sign } from "crypto";
import Point from "../common/position/Point";
import { PIX_PER_CELL_X, PIX_PER_CELL_Y } from "./Constants";

export function HexToPixel(point: Point) {
    return Point.add(Point.multiply(PIX_PER_CELL_Y, point.y), point.x * PIX_PER_CELL_X, 0);
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