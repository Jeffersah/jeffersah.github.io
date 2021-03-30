import Point from "../../common/position/Point";
import { IJsonEffect } from "../data/IJsonEffect";
import { IEffect } from "../IEffect";
import { CreateEffect } from "./EffectFuncs";

export default class EffectControl {
    public effects: IEffect[];
    constructor() {
        this.effects = [];
    }

    spawnEffect(effectArgs:IJsonEffect, pt: Point, rot: number) {
        this.effects.push(CreateEffect(effectArgs, pt, rot));
    }

    tick() {
        for(let i = this.effects.length - 1; i >= 0; i --) {
            if(this.effects[i].tick()) this.effects.splice(i, 1);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        for(let i = 0; i < this.effects.length; i++) {
            this.effects[i].draw(ctx);
        }
    }
}