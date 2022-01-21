import Angle from "../../common/Angle";
import { AnimationControl } from "../../common/assets/AnimationControl";
import { ISpriteAnimationArgs, SpriteAnimation } from "../../common/assets/SpriteAnimation";
import { AtlasSprite } from "../../common/assets/SpriteAtlas";
import Point from "../../common/position/Point";
import { IJsonEffect } from "../data/IJsonEffect";
import EffectControl from "../Effects/EffectControl";
import GameState from "../GameState";
import { Ship } from "../Ship";
import { ShipDefinition } from "../ShipDefinitions/ShipDefinition";

export interface IWeaponArgs {
    offset: Point;
    sprite?: AtlasSprite;
    shootAnimation?: ISpriteAnimationArgs;
    shootEffect?: IJsonEffect;

    rotation: number;

    turret?: {
        maxAngle: number;
        turnRate: number;
    }

    acquisitionAngle: number;
    minRange?: number;
    range: number;
}

export class Weapon {
    turretAngle: number;
    actualAnchor: Point;
    imgControl ?: AnimationControl;
    effects: EffectControl;

    constructor(public args: IWeaponArgs, shipDef: ShipDefinition) {
        this.turretAngle = 0;
        this.actualAnchor = this.args.offset.clone();
        this.actualAnchor.subtractWith(Point.multiply(shipDef.origin, shipDef.size));
        if(args.sprite !== undefined) {
            this.imgControl = new AnimationControl(args.sprite);
        }
        this.effects = new EffectControl();
    }

    getWeaponLocation(ship: Ship): Point {
        const result = this.actualAnchor.rotate(ship.rotation);
        result.addWith(ship.position);
        return result;
    }
    getWeaponAnchorAngle(ship: Ship) {
        return this.args.rotation + ship.rotation;
    }
    getWeaponCurrentAngle(ship: Ship) {
        return this.turretAngle + this.getWeaponAnchorAngle(ship);
    }

    /**
     * @returns Returns a point if the turret is ready to fire on a provided possibleTarget (other than reload times) and null otherwise.
     */
    tick(self: Ship, possibleTargets: Point[]): Point | null {

        this.effects.tick();
        this.imgControl?.tick();

        const location = this.getWeaponLocation(self);

        // Filter down targets to those in range
        possibleTargets = possibleTargets.filter(p => {
            const pDist = Point.subtract(p, location).lengthSq();
            return (
                (this.args.minRange === undefined || 
                    (pDist > this.args.minRange * this.args.minRange)
                ) &&
                (pDist < this.args.range * this.args.range)
            );
        });

        if(this.args.turret === undefined) {
            if(possibleTargets.length === 0) return null; // No target in range.
            const anchorAngle = this.getWeaponAnchorAngle(self);

            // I have no turret, fire if anyone is in spray range
            for(let i = 0; i < possibleTargets.length; i++) {
                // Find absolute direction to target
                const angleToTarget = Point.subtract(possibleTargets[i], self.position).direction();
                // Find angle to target relative to turret anchor angle
                const turretRelAngle = Angle.accuteAngle(anchorAngle, angleToTarget);
                // Check if relAngle is less than the spray angle (he's in range)
                if(Math.abs(turretRelAngle) < this.args.acquisitionAngle)
                    return possibleTargets[i];
            }
            return null;
        }
        else {
            if(possibleTargets.length === 0) {
                // No targets. Return to angle 0.
                if(this.turretAngle > 0) this.turretAngle -= Math.min(this.turretAngle, this.args.turret.turnRate);
                else if(this.turretAngle < 0) this.turretAngle += Math.min(Math.abs(this.turretAngle), this.args.turret.turnRate);
                return null;
            }

            const anchorAngle = this.getWeaponAnchorAngle(self);
            const angle = this.getWeaponCurrentAngle(self);

            let target: Point | null = null;
            let targetAngle: number = 0;
            let targetTurretAngle: number = 0;
            let targetAbsoluteAngle: number = 0;

            // Choose the target closest to anchor angle
            for(let i = 0; i < possibleTargets.length; i++) {
                const angleToTarget = Point.subtract(possibleTargets[i], self.position).direction();
                const turretRelAngle = Angle.accuteAngle(anchorAngle, angleToTarget);
                if(target === null || Math.abs(turretRelAngle) < Math.abs(targetAngle)) {
                    target = possibleTargets[i];
                    targetAngle = turretRelAngle;
                    if(Math.abs(turretRelAngle) > this.args.turret.maxAngle) {
                        // Target is outside of firing arc, we'll need to aim as close as possible
                        targetTurretAngle = this.args.turret.maxAngle * Math.sign(turretRelAngle);
                        targetAbsoluteAngle = angleToTarget;
                    } else {
                        // If we choose this target, we'll aim right at them
                        targetTurretAngle = targetAbsoluteAngle = angleToTarget;
                    }
                }
            }
            // target is not null. If it was, we'd've exited earlier.
            // Turn gun towards target
            const turretRelAngle = Angle.accuteAngle(angle, targetTurretAngle);
            if(Math.abs(turretRelAngle) < this.args.turret.turnRate) {
                this.turretAngle += turretRelAngle;
            }

            const finalTurretAngle = this.getWeaponCurrentAngle(self);
            const finalRelAngle = Angle.accuteAngle(finalTurretAngle, targetAbsoluteAngle);

            if(Math.abs(finalRelAngle) < this.args.acquisitionAngle) return target;
            else return null;
        }
    }

    /** TODO: SHOOT */
    shoot(gs: GameState, self: Ship) {
        // Play the shoot animation, if necessary
        if(this.imgControl !== undefined && this.args.shootAnimation !== undefined) {
            this.imgControl.enqueue(this.args.shootAnimation.animation.play(this.args.shootAnimation));
            this.imgControl.enqueue(this.args.sprite);
        }
        if(this.args.shootEffect !== undefined) this.effects.spawnEffect(this.args.shootEffect, this.getWeaponLocation(self), this.getWeaponCurrentAngle(self));
    }

    render(ctx: CanvasRenderingContext2D, ship: Ship) {
        if(this.imgControl === undefined) return;
        const realPoint = this.getWeaponLocation(ship);
        let realRot = this.getWeaponCurrentAngle(ship);
        this.imgControl.render(ctx, realPoint, realRot);
        this.effects.draw(ctx);
    }
}