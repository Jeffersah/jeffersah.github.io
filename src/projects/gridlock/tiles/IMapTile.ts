import Point from "../../common/position/Point";

export default interface IMapTile {
    draw(canavs: HTMLCanvasElement, ctx: CanvasRenderingContext2D, position: Point, cars: []): void;
}