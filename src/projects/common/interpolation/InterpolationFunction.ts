import { Color } from "../Color";

export type InterpolationFunction<T> = (start: T, end: T, percentage: number) => T;

export const numberInterpolator: InterpolationFunction<number> = (a, b, p) => a + (b-a)*p;

export const fastColorInterpolator: InterpolationFunction<Color> = (a,b,p) => 
    Color.rgb(
        numberInterpolator(a.r(), b.r(), p),
        numberInterpolator(a.g(), b.g(), p),
        numberInterpolator(a.b(), b.b(), p));

        
export const trueColorInterpolator: InterpolationFunction<Color> = (a,b,p) => 
    Color.rgb(
        Math.sqrt(numberInterpolator(a.r() * a.r(), b.r() * b.r(), p)),
        Math.sqrt(numberInterpolator(a.g() * a.g(), b.g() * b.g(), p)),
        Math.sqrt(numberInterpolator(a.b() * a.b(), b.b() * b.b(), p)));

        
export const hsvColorInterpolator: InterpolationFunction<Color> = (a,b,p) => 
    Color.hsv(
        numberInterpolator(a.h(), b.h(), p),
        numberInterpolator(a.s(), b.s(), p),
        numberInterpolator(a.v(), b.v(), p));