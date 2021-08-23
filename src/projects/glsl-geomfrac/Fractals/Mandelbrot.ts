import Complex3d, { add, multiply } from "../geom/Complex3d";
import { IFractal } from "./IFractal";

class Mandelbrot implements IFractal
{
    Name: string = 'Mandelbrot';
    ShaderCode: string = `return c_mult(z, z) + c;`;

    MaxAmplitude: number = 2;

    Iterate(z: Complex3d, c: Complex3d): Complex3d
    {
        return add(multiply(z, z), c);
    }
}

const mandelbrot = new Mandelbrot();
export default mandelbrot;