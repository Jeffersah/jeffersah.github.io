import Complex3d from "../geom/Complex3d";

export interface IFractal {
    ShaderCode: string;
    MaxAmplitude: number;
    Name: string;
    Iterate(z: Complex3d, c: Complex3d): Complex3d;
}