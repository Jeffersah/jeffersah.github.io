import Point from "../common/position/Point";

export enum Direction {
    Right = 0,
    DownRight = 1,
    DownLeft = 2,
    Left = 3,
    UpLeft = 4,
    UpRight = 5
}

export class DirectionHelper {
    public ToPoint(direction: Direction): Point {
        switch (direction) {
            case Direction.Right: return new Point(1, 0);
            case Direction.DownRight: return new Point(0, 1);
            case Direction.DownLeft: return new Point(-1, 1);
            case Direction.Left: return new Point(-1, 0);
            case Direction.UpLeft: return new Point(0, -1);
            case Direction.UpRight: return new Point(1, -1);
        }
    }

    public Turn(direction: Direction, amount: number): Direction {
        const result = (direction + amount)%6;
        return (result + 6) % 6;
    }
}