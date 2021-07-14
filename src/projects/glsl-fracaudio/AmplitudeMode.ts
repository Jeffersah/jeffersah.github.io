import { Complex } from "../common";

export interface IAmplitudeFunction {
    Name: string;
    GetAmplitude(min: Complex, max: Complex): { min: Complex, max: Complex };
}

class DefaultAmplitudeFunction implements IAmplitudeFunction {
    Name: string = 'Fill';
    GetAmplitude(min: Complex, max: Complex): {min: Complex, max: Complex}
    {
        return {min, max};
    }
}

class FixedAspectAmplitudeFunction implements IAmplitudeFunction {
    Name: string = 'Square';
    GetAmplitude(min: Complex, max: Complex): {min: Complex, max: Complex}
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

const AllAspectFunctions = [ new DefaultAmplitudeFunction(), new FixedAspectAmplitudeFunction() ];
export default AllAspectFunctions;