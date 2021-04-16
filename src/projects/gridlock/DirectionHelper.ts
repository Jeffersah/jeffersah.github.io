import { ERANGE } from "constants";
import { Direction, ECardinalDirection } from "../common/position/Direction";

export default class DirectionHelper {
    static directionToNumber(dir: ECardinalDirection): number {
        switch(dir){
            case Direction.Right:
                return 0;
            case Direction.Down:
                return 1;
            case Direction.Left:
                return 2;
            case Direction.Up:
                return 3;
            default: return -1;
        }
    }

    static numberToDirection(dir: number): ECardinalDirection {
        switch(dir){
            case 0:
                return Direction.Right;
            case 1:
                return Direction.Down;
            case 2:
                return Direction.Left;
            case 3:
                return Direction.Up;
            default: throw "Expected 0-3";
        }
    }

    static directionToRotation(dir: ECardinalDirection) {
        return Math.PI * DirectionHelper.directionToNumber(dir) / 2;
    }
}