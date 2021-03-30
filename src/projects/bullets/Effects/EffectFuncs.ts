import Point from "../../common/position/Point";
import { IJsonEffect } from "../data/IJsonEffect";
import { parseJsonRange } from "../data/parsing/parsers";
import { IEffect } from "../IEffect";
import { Explosion } from "./Explosion";

export function CreateEffect(effect: IJsonEffect, pt: Point, rot: number): IEffect {
    switch(effect.type) {
        case "explosion":
            return new Explosion(pt, 
                parseJsonRange(effect.burstXVariance),
                parseJsonRange(effect.burstYVariance),
                parseJsonRange(effect.numBursts),
                effect.burstDelay,
                parseJsonRange(effect.burstLifetime),
                parseJsonRange(effect.burstOuterRadius));
    }
}