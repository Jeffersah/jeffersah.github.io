import Complex3d, { add, conjugate, multiply } from "../geom/Complex3d";
import { IFractal } from "./IFractal";

class Tricorn implements IFractal
{
    Name: string = 'Tricorn';
    ShaderCode: string = `vec4 j = c_conj(z); return c_mult(j, j) + c;`;

    MaxAmplitude: number = 2;

    Iterate(z: Complex3d, c: Complex3d): Complex3d
    {
        let j = conjugate(z);
        return add(multiply(j, j), c);
    }
}

const tricorn = new Tricorn();
export default tricorn;