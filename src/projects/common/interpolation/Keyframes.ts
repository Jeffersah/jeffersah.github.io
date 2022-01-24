import { Color } from "../Color";
import { fastColorInterpolator, InterpolationFunction, numberInterpolator } from "./InterpolationFunction";

export function EvenlySpacedKeyframes<T>(...args: T[]): Keyframes<T>;
export function EvenlySpacedKeyframes<T>(interpolator: InterpolationFunction<T>, ...args: T[]): Keyframes<T>;
export function EvenlySpacedKeyframes<T>(interpolator?: InterpolationFunction<T>, ...args: T[]): Keyframes<T> {
    if(typeof(interpolator) !== 'function') {
        args.splice(0, 0, <T><any>interpolator);
        interpolator = undefined;
    }

    let numFrames = args.length - 1;
    let percPer = 1 / numFrames;
    let keyframes = new Keyframes<T>(args[0], interpolator);
    for(let i = 1; i < args.length; i++) {
        keyframes.addKeyFrame(percPer * i, args[i]);
    }
    return keyframes;
}

export class Keyframes<T> 
{
    private interpolator: InterpolationFunction<T>;
    private keys: {time: number, value: T}[];

    constructor(start: T, interpolator?: InterpolationFunction<T>)
    {
        if(interpolator === undefined) {
            if(typeof(start) === "number") {
                this.interpolator = <any>numberInterpolator;
            } else if((<Color><unknown>start).r !== undefined) {
                // Assume this is color
                this.interpolator = <any>fastColorInterpolator;
            }
            else {
                throw 'No default interpolator found';
            }
        } else {
            this.interpolator = interpolator;
        }
        this.keys = [{time: 0, value: start}];
    }

    public addKeyFrame(time: number, value: T) {
        for(let i = 0; i < this.keys.length; i++)
        {
            if(time < this.keys[i].time) {
                this.keys.splice(i, 0, {time, value});
                return;
            }
        }
        this.keys.push({time, value});
    }

    public sample(p: number): T {
        if(this.keys.length === 1) return this.keys[0].value;

        var keyIndex = 0;
        while(this.keys[keyIndex + 1].time < p && keyIndex + 2 < this.keys.length) {
            keyIndex ++;
        }

        let sampleRange = this.keys[keyIndex + 1].time - this.keys[keyIndex].time;
        let samplePerc = (p - this.keys[keyIndex].time) / sampleRange;

        return this.interpolator(this.keys[keyIndex].value, this.keys[keyIndex + 1].value, samplePerc);
    }
}