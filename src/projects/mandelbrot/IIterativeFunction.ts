import { Complex } from "../common";

export interface IIterativeFunction {
    Iterate(rolling: Complex, original: Complex): Complex;
    MaxAbsSq(): number;
}

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

export class Julia implements IIterativeFunction {

    private Radius: number;
    constructor(private c: Complex) {
        this.Radius = (Math.sqrt(4*c.Abs()+1)+1)/2
    }

    Iterate(rolling: Complex, original: Complex): Complex {
        rolling.MultiplyWith(rolling);
        rolling.AddWith(this.c);
        return rolling;
    }

    MaxAbsSq(): number {
        return this.Radius;
    }
}