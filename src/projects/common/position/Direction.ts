import Point from './Point';

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

export type ECardinalDirection = Direction.Up | Direction.Right | Direction.Down | Direction.Left;
export type EDiagonalDirection = Direction.UpRight | Direction.DownRight | Direction.DownLeft | Direction.UpLeft;

export const directionValues: Point[] = [
    new Point(0, -1),
    new Point(1, -1),
    new Point(1, 0),
    new Point(1, 1),
    new Point(0, 1),
    new Point(-1, 1),
    new Point(-1, 0),
    new Point(-1, -1),
];

export const allDirections: Direction[] = [
    Direction.Up,
    Direction.UpRight,
    Direction.Right,
    Direction.DownRight,
    Direction.Down,
    Direction.DownLeft,
    Direction.Left,
    Direction.UpLeft,
];
export const cardinalDirections: ECardinalDirection[] = [
    Direction.Up,
    Direction.Right,
    Direction.Down,
    Direction.Left
];
export const diagonalDirections: EDiagonalDirection[] = [
    Direction.UpRight,
    Direction.DownRight,
    Direction.DownLeft,
    Direction.UpLeft,
];

export function ToPoint(direction: Direction): Point {
    return directionValues[direction];
}