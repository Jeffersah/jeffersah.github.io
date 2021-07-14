import { Complex } from "../../common";
import { IFractal } from "./IFractal";

class Mandelbrot implements IFractal
{
    Name: string = 'Mandelbrot';
    ShaderCode: string = `
    vec2 init_fractal(vec2 coords) {
        return coords;
    }

    vec2 step_fractal(vec2 v, vec2 c) {
        return cplx_mult(v, v) + c;
    }
    `;

    MaxAmplitude: number = 2;

    Init (c: Complex):Complex{
        return c;
    }

    Iterate(z: Complex, c: Complex): Complex
    {
        return Complex.mult(z, z).addWith(c);
    }
}

const mandelbrot = new Mandelbrot();
export default mandelbrot;