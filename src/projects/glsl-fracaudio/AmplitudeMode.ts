import { Complex } from "../common";
import { IFractal } from "./Fractals/IFractal";

export interface IAmplitudeFunction {
    Name: string;
    GetAmplitude(min: Complex, max: Complex, fractal: IFractal): { min: Complex, max: Complex };
}

class DefaultAmplitudeFunction implements IAmplitudeFunction {
    Name: string = 'Fill';
    GetAmplitude(min: Complex, max: Complex, fractal: IFractal): {min: Complex, max: Complex}
    {
        return {min, max};
    }
}

class FixedAspectAmplitudeFunction implements IAmplitudeFunction {
    Name: string = 'Square';
    GetAmplitude(min: Complex, max: Complex, fractal: IFractal): {min: Complex, max: Complex}
    {
        const range = Complex.subtract(max, min);
        if(range.real === range.imaginary) return {min, max};
        if(range.real > range.imaginary) {
            var deltaSize = (range.real - range.imaginary)/2;
            var delta = new Complex(0, deltaSize);

            return { min: Complex.subtract(min, delta), max: Complex.add(max, delta) };
        }
        else {
            var deltaSize = (range.imaginary - range.real)/2;
            var delta = new Complex(deltaSize, 0);

            return { min: Complex.subtract(min, delta), max: Complex.add(max, delta) };
        }
    }
}

class AbsoluteAmplitudeFunction implements IAmplitudeFunction {
    Name: string = 'Absolute';
    GetAmplitude(min: Complex, max: Complex, fractal: IFractal): {min: Complex, max: Complex}
    {
        return {
            min: new Complex(-fractal.MaxAmplitude, -fractal.MaxAmplitude),
            max: new Complex(fractal.MaxAmplitude, fractal.MaxAmplitude)
        };
    }
}

const AllAspectFunctions = [ new DefaultAmplitudeFunction(), new FixedAspectAmplitudeFunction(), new AbsoluteAmplitudeFunction() ];
export default AllAspectFunctions;