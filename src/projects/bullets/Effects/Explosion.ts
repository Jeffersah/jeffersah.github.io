import { Color } from "../../common/Color";
import { Interpolated, InterpolationTimer } from "../../common/interpolation/Interpolated";
import Point from "../../common/position/Point";
import { IEffect } from "../IEffect";
import { Range } from '../../common/Range';
import { SingleExplosion } from "./SingleExplosion";
import { EvenlySpacedKeyframes } from "../../common/interpolation/Keyframes";
import { TimingFunctions } from "../../common/interpolation/TimingFunction";
import { any } from "../../../LinqLike";

export class Explosion implements IEffect {

    private explosions: SingleExplosion[];
    private currentBurstDelay = 0;
    private maxExplosionIndex = 0;

    constructor(
        public position: Point,
        public burstXVariance: Range,
        public burstYVariance: Range,
        public numBursts: Range,
        public burstDelay: number,
        public burstLifetime: Range,
        public burstOuterRadius: Range,
        )
    {
        const nb = Math.floor(numBursts.GetValue(Math.random()));
        this.explosions = new Array(nb);
        this.triggerExplosions();
    }

    triggerExplosions() {
        while(this.currentBurstDelay === 0 && this.maxExplosionIndex < this.explosions.length) {
            this.currentBurstDelay = this.burstDelay;
            this.spawnBurst();
        }
    }

    spawnBurst() {
        const bx = this.position.x + this.burstXVariance.GetValue(Math.random());
        const by = this.position.y + this.burstYVariance.GetValue(Math.random());
        const lifetime = this.burstLifetime.GetValue(Math.random());
        const outerRadius = this.burstOuterRadius.GetValue(Math.random());
        const startingOuterRadius = outerRadius / 4;

        this.explosions[this.maxExplosionIndex++] = new SingleExplosion(
            new Point(bx, by),
            new Interpolated<number>(EvenlySpacedKeyframes(startingOuterRadius, outerRadius), TimingFunctions.linear),
            new Interpolated<number>(EvenlySpacedKeyframes(-startingOuterRadius, outerRadius), TimingFunctions.fastOut),
            new Interpolated<Color>(EvenlySpacedKeyframes(Color.rgb(1, 1, 0.5), Color.rgb(1, 0, 0), Color.rgb(0.2, 0.2, 0)), TimingFunctions.linear),
            lifetime
        );
    }

    tick(): boolean {
        let anyStillRunning = false;
        for(let i = 0; i < this.maxExplosionIndex; i++) {
            if(this.explosions[i] !== null && this.explosions[i] !== undefined) {
                if(this.explosions[i].tick()){
                    this.explosions[i] = null;
                } else {
                    anyStillRunning = true;
                }
            }
        }
        this.currentBurstDelay --;
        if(this.currentBurstDelay === 0) this.triggerExplosions();
        return (!anyStillRunning && this.maxExplosionIndex === this.explosions.length);
    }
    draw(ctx: CanvasRenderingContext2D): void {
        for(let i = 0; i < this.maxExplosionIndex; i++) {
            if(this.explosions[i] !== null && this.explosions[i] !== undefined) {
                this.explosions[i].draw(ctx);
            }
        }
    }

}