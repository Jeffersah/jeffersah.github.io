import { IIterativeFunction } from './IIterativeFunction';
import { Complex } from '../../common';

export class Julia implements IIterativeFunction {

    private radius: number;
    constructor(private c: Complex) {
        this.radius = (Math.sqrt(4 * c.abs() + 1) + 1) / 2;
    }

    Iterate(rolling: Complex, original: Complex): Complex {
        rolling.multiplyWith(rolling);
        rolling.addWith(this.c);
        return rolling;
    }

    MaxAbsSq(): number {
        return this.radius;
    }
}