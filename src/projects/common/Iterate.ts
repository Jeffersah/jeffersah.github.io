
export interface ILoopControl {
    break(): void;
}

export function IterateRange(start: number, end: number, handle: (value: number, control: ILoopControl) => void): void {
    let breakIteration = false;
    const loopControl = {
        break: () => {
            breakIteration = true;
        }
    };

    if (end === start) {
        handle(start, loopControl);
        return;
    }

    const direction = end > start ? 1 : -1;
    const finalValue = end + direction;

    for (let i = start; i !== finalValue && !breakIteration; i += direction) {
        handle(i, loopControl);
    }
}