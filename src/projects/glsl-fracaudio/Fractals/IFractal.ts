import { Complex } from "../../common/Complex";

export interface IFractal {
    ShaderCode: string;
    MaxAmplitude: number;
    Name: string;
    Init(coords:Complex): Complex;
    Iterate(rolling: Complex, coords: Complex): Complex;
}