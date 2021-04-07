import Point from "../../common/position/Point";

export default class MapObstruction {
    constructor(public bounds: Point[], public blockMove: boolean, public blockBullets: boolean) {

    }
}