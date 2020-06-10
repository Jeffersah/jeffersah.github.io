export enum EArrow {
    Up = 0,
    Right = 1,
    Down = 2,
    Left = 3,
    UpDown = 4,
    LeftRight = 5,
    Any,
    Stop
}

export function Matches(arr: EArrow, pattern: EArrow): boolean {
    if (pattern === EArrow.Any) return true;
    if (pattern === EArrow.Stop) return arr === EArrow.Stop;
    if (arr === pattern) return true;
    if (pattern >= 4 && arr <= 3) return (arr % 2) === (pattern % 2);
    return false;
}

export enum ERepeat {
    None,
    Optional,
    Repeatable
}