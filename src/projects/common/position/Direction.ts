import Point from "./Point";

export enum Direction {
    Up = 0,
    UpRight,
    Right,
    DownRight,
    Down,
    DownLeft,
    Left,
    UpLeft,
}
export const DirectionValues: Point[] = [
    new Point(0, -1),
    new Point(1, -1),
    new Point(1, 0),
    new Point(1, 1),
    new Point(0, 1),
    new Point(-1, 1),
    new Point(-1, 0),
    new Point(-1, -1),
];

export const AllDirections: Direction[] = [
    Direction.Up,
    Direction.UpRight,
    Direction.Right,
    Direction.DownRight,
    Direction.Down,
    Direction.DownLeft,
    Direction.Left,
    Direction.UpLeft,
];
export const CardinalDirections: Direction[] = [
    Direction.Up,
    Direction.Right,
    Direction.Down,
    Direction.Left
];
export const DiagonalDirections: Direction[] = [
    Direction.UpRight,
    Direction.DownRight,
    Direction.DownLeft,
    Direction.UpLeft,
];

export function ToPoint(direction: Direction): Point
{
    return DirectionValues[direction];
}