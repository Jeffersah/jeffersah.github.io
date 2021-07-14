import { Complex } from "../../common";
import { IFractal } from "./IFractal";

class FeatherFractal implements IFractal
{
    Name: string = 'Feather';
    ShaderCode: string = `
    vec2 init_fractal(vec2 coords) {
        return coords;
    }

    vec2 step_fractal(vec2 v, vec2 c) {
        vec2 denom = scalar_mult(v, v);
        denom.x += 1.0;
        vec2 num = cplx_mult(cplx_mult(v, v), v);
        vec2 result = cplx_div(num, denom);
        return result + c;
    }
    `;

    MaxAmplitude: number = 32;

    Init (c: Complex):Complex{
        return c;
    }

    Iterate(z: Complex, c: Complex): Complex
    {
        return Complex.div(
            Complex.mult(z, z).multiplyWith(z),
            Complex.scalarMultiply(z, z).addWith(new Complex(1, 0))
        ).addWith(c);
    }
}

const featherFractal = new FeatherFractal();
export default featherFractal;