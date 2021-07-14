import { Complex } from "../../common";
import { IFractal } from "./IFractal";

class SqureFractal implements IFractal
{
    Name: string = 'Square';
    ShaderCode: string = `
    vec2 init_fractal(vec2 coords) {
        return coords;
    }

    vec2 step_fractal(vec2 v, vec2 c) {
        float dotz = dot(v, v);
        vec2 scalarc = scalar_mult(c, c);
        return v * dotz - cplx_mult(v, scalarc);
    }
    `;

    MaxAmplitude: number = 32;

    Init (c: Complex):Complex{
        return c;
    }

    Iterate(z: Complex, c: Complex): Complex
    {
        const dotz = z.absSq();
        const dotc = Complex.scalarMultiply(c, c);
        return Complex.subtract(
            Complex.scalarMultiply(z, dotz, dotz),
            Complex.mult(c, dotc)
        );
    }
}

const squareFractal = new SqureFractal();
export default squareFractal;