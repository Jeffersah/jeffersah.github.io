import { Complex } from "../../common";
import { IFractal } from "./IFractal";

class BurningShip implements IFractal
{
    Name: string = 'Burning Ship';
    ShaderCode: string = `
    vec2 init_fractal(vec2 coords) {
        return vec2(0,0);
    }

    vec2 step_fractal(vec2 v, vec2 c) {
        float tx = v.x * v.x - v.y * v.y - c.x;
        float ty = 2.0 * abs(v.x * v.y) - c.y;
        return vec2(tx, ty);
    }
    `;

    MaxAmplitude: number = 16;

    Init (c: Complex):Complex{
        return c;
    }

    Iterate(z: Complex, c: Complex): Complex
    {
        const tx = z.real * z.real - z.imaginary * z.imaginary - c.real;
        const ty = 2 * Math.abs(z.real * z.imaginary) - c.imaginary;
        return new Complex(tx, ty);
    }
}

const burningShip = new BurningShip();
export default burningShip;