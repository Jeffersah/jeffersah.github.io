import { TimingFunction } from "./TimingFunction";
import { EvenlySpacedKeyframes, Keyframes } from './Keyframes';
import { InterpolationFunction } from "./InterpolationFunction";

export class Interpolated<T> {
    constructor(public range: Keyframes<T>, public timingFunction: TimingFunction) {

    }

    public static linear<T>(interpolator: InterpolationFunction<T>, ...args: T[]) {
        return new Interpolated<T>(EvenlySpacedKeyframes<T>(interpolator, ...args), (t: number) => t);
    }
}

export class InterpolationTimer {
    public elapsedTime: number;
    constructor(public totalTime: number) {
        this.elapsedTime = 0;
    }
    tick(): boolean {
        this.elapsedTime ++;
        return this.elapsedTime >= this.totalTime;
    }
    sample<T>(animation: Interpolated<T>) {
        return animation.range.sample(animation.timingFunction(this.elapsedTime / this.totalTime));
    }
}

export class LinkedInterpolation<T> {
    constructor(public timer: InterpolationTimer, public interp: Interpolated<T>) {

    }

    sample(): T {
        return this.timer.sample(this.interp);
    }
}