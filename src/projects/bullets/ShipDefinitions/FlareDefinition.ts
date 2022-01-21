import { PlayingAnimation, SpriteAnimation } from "../../common/assets/SpriteAnimation";
import Point from "../../common/position/Point";
import { Ship } from "../Ship";

export enum EFlareConditions {
    Accel = "accel",
    Deccel = "deccel",
    TurnLeft = "turnLeft",
    TurnRight = "turnRight"
}

export class FlareDefinition {
    private minTrigger: number;
    private rotPerTurn: number;
    private playing: PlayingAnimation;

    private shouldRender: boolean;
    private adjRot: number;

    public conditions: EFlareConditions[];
    
    constructor(
        public animation: SpriteAnimation,
        public offset: Point,
        public rotation: number,
        conditions: EFlareConditions | EFlareConditions[],
        minTrigger?: number,
        rotPerTurn?: number) {
        
        if(typeof(conditions) === "string")
            this.conditions = [<EFlareConditions>conditions];
        else
            this.conditions = <EFlareConditions[]>conditions;

        this.rotPerTurn = rotPerTurn ?? 0;
        this.minTrigger = minTrigger ?? 0
        this.playing = animation.play(30, true);
        this.shouldRender = false;
    }

    clone(): FlareDefinition {
        const result = new FlareDefinition(this.animation, this.offset, this.rotation, this.conditions, this.minTrigger, this.rotPerTurn);
        return result;
    }

    tick(accel: number, turn: number) {
        this.shouldRender = false;
        for(let i = 0; i < this.conditions.length; i++)
        {
            switch(this.conditions[i]) {
                case EFlareConditions.Accel: 
                    this.shouldRender = this.shouldRender || accel > this.minTrigger;
                    break;
                case EFlareConditions.Deccel: 
                    this.shouldRender = this.shouldRender || accel < -this.minTrigger;
                    break;
                case EFlareConditions.TurnLeft:
                    this.shouldRender = this.shouldRender || turn < -this.minTrigger
                    break;
                case EFlareConditions.TurnRight:
                    this.shouldRender = this.shouldRender || turn > this.minTrigger
                    break;
            }
        }
        this.adjRot = turn * this.rotPerTurn;
        if(this.shouldRender) this.playing.tick();
    }

    draw(ctx: CanvasRenderingContext2D, location: Point, shipOrigin: Point, shipSize: Point, rotation: number) {
        if(!this.shouldRender) return;
        let realPoint = this.offset.clone();
        realPoint.subtractWith(Point.multiply(shipOrigin, shipSize));
        realPoint = realPoint.rotate(rotation);
        realPoint.addWith(location);
        let realRot = this.adjRot + this.rotation + rotation;
        this.playing.draw(ctx, realPoint, this.animation.sourceSize, realRot);
    }
}