import { IIterativeFunction } from './IIterativeFunction';
import { Complex } from '../../common';

export class Mandelbrot implements IIterativeFunction {
    Iterate(rolling: Complex, original: Complex): Complex {
        rolling.multiplyWith(rolling);
        rolling.addWith(original);
        return rolling;
    }

    MaxAbsSq(): number {
        return 2;
    }
}
