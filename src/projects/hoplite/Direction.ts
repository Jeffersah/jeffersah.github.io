import Point from "../common/position/Point";

export enum Direction {
    Right = 0,
    DownRight = 1,
    DownLeft = 2,
    Left = 3,
    UpLeft = 4,
    UpRight = 5
}

export const AllDirections: Direction[] = [
    Direction.Right,
    Direction.DownRight,
    Direction.DownLeft,
    Direction.Left,
    Direction.UpLeft,
    Direction.UpRight
];

export class DirectionHelper {

    public static ToAngle(direction: Direction): number {
        return ((Math.PI * direction) / 3) - (Math.PI / 2);
    }

    public static ToPoint(direction: Direction): Point {
        switch (direction) {
            case Direction.Right: return new Point(1, 0);
            case Direction.DownRight: return new Point(0, 1);
            case Direction.DownLeft: return new Point(-1, 1);
            case Direction.Left: return new Point(-1, 0);
            case Direction.UpLeft: return new Point(0, -1);
            case Direction.UpRight: return new Point(1, -1);
        }
    }

    public static FromPoint(pt: Point): Direction {
        if(pt.x > 0 && pt.y === 0) return Direction.Right;
        if(pt.x < 0 && pt.y === 0) return Direction.Left;
        if(pt.x === 0 && pt.y > 0) return Direction.DownRight;
        if(pt.x === 0 && pt.y < 0) return Direction.UpLeft;
        if(pt.x > 0 && pt.x === -pt.y) return Direction.UpRight;
        if(pt.x < 0 && pt.x === -pt.y) return Direction.DownLeft;
        return undefined;
    }

    public static Turn(direction: Direction, amount: number): Direction {
        const result = (direction + amount)%6;
        return (result + 6) % 6;
    }
}