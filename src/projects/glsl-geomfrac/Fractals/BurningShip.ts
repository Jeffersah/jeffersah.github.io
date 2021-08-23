import { Complex } from "../../common";
import Complex3d, { add, multiply } from "../geom/Complex3d";
import { IFractal } from "./IFractal";

class BurningShip implements IFractal
{
    Name: string = 'Burning Ship';
    ShaderCode: string = `
        vec4 zabs = abs(z);
        return c_mult(zabs, zabs) + c;
    `;

    MaxAmplitude: number = 16;

    Iterate(z: Complex3d, c: Complex3d): Complex3d
    {
        let zabs = z.map(Math.abs) as Complex3d;
        return add(multiply(zabs, zabs), c);
    }
}

const burningShip = new BurningShip();
export default burningShip;