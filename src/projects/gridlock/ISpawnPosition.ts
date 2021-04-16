import { ECardinalDirection } from "../common/position/Direction";
import Point from "../common/position/Point";
import ECarColor from "./ECarColor";

export default interface ISpawnPosition {
    position: Point;
    color: ECarColor;
    direction?: ECardinalDirection;
}