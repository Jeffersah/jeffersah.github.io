import Point from "../../common/position/Point";
import MapObstruction from "./MapObstruction";

export class MapInfo {
    constructor(public recursePosition: { center: Point, scale: number, rotation: number }, public obstructions: MapObstruction[]) {
    }
}

const defaultMap = new MapInfo(
    { center: new Point(400, 300), scale: 0.25, rotation: 0},
    [
        new MapObstruction([new Point(0, 0), new Point(100, 0), new Point(100, 600), new Point(0, 600)], true, true),
        new MapObstruction([new Point(700, 0), new Point(800, 0), new Point(800, 600), new Point(700, 600)], true, true),
    ]
);
export default defaultMap;