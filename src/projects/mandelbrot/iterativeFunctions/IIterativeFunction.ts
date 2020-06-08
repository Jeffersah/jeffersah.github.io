import { Complex } from '../../common';

export interface IIterativeFunction {
    Iterate(rolling: Complex, original: Complex): Complex;
    MaxAbsSq(): number;
}
