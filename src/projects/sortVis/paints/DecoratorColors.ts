import { Color } from '../../common/Color';

export function getDecoratorColor(index: number): Color {
    // Choose a value [n] such that [n]*100 is coprime to 100
    // Then multiply by index, mod 1, to get h value. This makes a deterministic set of 100 "distinct" colors
    const n = 0.43;
    return Color.hsv((n * index) % 1, 1, 1);
}