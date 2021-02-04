import Angle from "../common/Angle";
import KeyboardManager from "../common/input/KeyboardManager";
import Point from "../common/position/Point";
import { IShipAI } from "./ai/IShipAI";
import { ETeam } from "./ETeam";
import GameState from "./GameState";
import IEntity from "./IEntity";
import { ShipDefinition } from "./ShipDefinition";

export class Ship implements IEntity{
    
    public Velocity: number;
    private lastAccel: number;
    private lastDeccel: number;
    private lastTurn: number;
    private currentHp: number;
    
    constructor(
        public definition: ShipDefinition,
        public position: Point,
        public rotation: number,
        public ai: IShipAI,
        private team: ETeam) {
            this.Velocity = 0;
            this.lastAccel = this.lastDeccel = this.lastTurn = 0;
            this.currentHp = this.definition.maxHp;
    }

    tick(keys: KeyboardManager, gs: GameState): boolean {
        const { tgtVel, tgtHeading } = this.ai.TickAI(gs, this);
        if(tgtVel < this.Velocity && this.definition.maxDeccel > 0) {
            // Try deccel
            var delta = this.Velocity - tgtVel;
            this.lastDeccel = Math.min(1, delta / this.definition.maxDeccel);
            this.Velocity -= this.lastDeccel * this.definition.maxDeccel;
        } else if(tgtVel > this.Velocity) {
            // Try accel
            var delta = tgtVel - this.Velocity;
            this.lastAccel = Math.min(1, delta / this.definition.maxAccel);
            this.Velocity += this.lastAccel * this.definition.maxAccel;
        }

        // Try turn
        var turnAmt = Angle.accuteAngle(this.rotation, tgtHeading);

        var turnDirection = Math.sign(turnAmt);
        turnAmt = Math.abs(turnAmt);
        this.lastTurn = Math.min(turnAmt / this.definition.maxTurnRate, 1) * turnDirection;

        this.rotation += this.lastTurn * this.definition.maxTurnRate;

        if(this.Velocity >= 0) this.Velocity = Math.min(this.Velocity, this.definition.maxSpeed);
        else this.Velocity = Math.max(this.Velocity, - this.definition.maxSpeed);
        
        this.position.AddWith(Point.fromAngle(this.rotation, this.Velocity));
        return this.currentHp > 0;
    }

    render(ctx: CanvasRenderingContext2D) {
        this.definition.sprite.draw(ctx, this.position, this.definition.size, this.rotation);
    }

    getTeam() {
        return this.team;
    }
}