import { type } from "os";

export type IJsonEffect = IJsonExplosionEffect;

export interface IJsonExplosionEffect {
    type: 'explosion',
    burstXVariance: [number, number],
    burstYVariance: [number, number],
    numBursts: [number, number],
    burstDelay: number,
    burstLifetime: [number, number],
    burstOuterRadius: [number, number],
}