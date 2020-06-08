import { IIterativeFunction } from './IIterativeFunction';
import { Complex } from '../../common';

export class Mandelbrot implements IIterativeFunction {
    Iterate(rolling: Complex, original: Complex): Complex {
        rolling.MultiplyWith(rolling);
        rolling.AddWith(original);
        return rolling;
    }

    MaxAbsSq(): number {
        return 2;
    }
}
