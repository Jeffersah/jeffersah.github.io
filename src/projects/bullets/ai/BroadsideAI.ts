import Angle from "../../common/Angle";
import Point from "../../common/position/Point";
import GameState from "../GameState";
import { Ship } from "../Ship";
import { DebugLine, DebugPoint, DebugRay } from "./IDebugMarker";
import { IShipAI } from "./IShipAI";
import { ShipAI } from "./ShipAI";

export interface IBroadsideAiArgs {
    minDistance: number,
    maxDistance: number,
    orbitSpeed: number,
    debug: boolean
}
const defaultArgs = {
    minDistance: 100,
    maxDistance: 500,
    orbitSpeed: 0.5,
    debug: false,
}
export default class BroadsideAI extends ShipAI {
    private args: IBroadsideAiArgs;
    constructor(args: Partial<IBroadsideAiArgs>) {
        super(args);
        this.args = { ...defaultArgs, ...args };
    }

    TickAI(gs: GameState, ship: Ship): { tgtVel: number; tgtHeading: number; } {
        const targetLocation = gs.Player.position;
        const toLocation = Point.subtract(targetLocation, ship.position);
        const currentHeading = ship.rotation;
        const inwardHeading = toLocation.direction();
        const tangentHeadings = [
            Angle.normalize(inwardHeading - (Math.PI / 2)),
            Angle.normalize(inwardHeading + (Math.PI / 2))
        ];

        if(toLocation.lengthSq() < this.args.minDistance * this.args.minDistance) {
            const fleeHeadings = [
                Angle.normalize(inwardHeading - (Math.PI * 5 / 6)),
                Angle.normalize(inwardHeading + (Math.PI * 5 / 6))
            ];
            const orbitDist = this.args.minDistance;
            // Run away, but look for a tangent
            this.debugPoint(targetLocation, 'orange', orbitDist);
            const tgtPoints = fleeHeadings.map(tangent => Point.add(ship.position, Point.fromAngle(tangent, orbitDist)));
            for(let i = 0; i < tgtPoints.length; i++) {
                this.debugLine(ship.position, tgtPoints[i]);
            }
            const tgtHeadings = tgtPoints.map(tgt => Point.subtract(tgt, ship.position).direction());
            const bestHeading = getMinHeading(currentHeading, tgtHeadings); 
            
            return { 
                tgtVel: ship.definition.maxSpeed, 
                tgtHeading: bestHeading
            };
        } else if (toLocation.lengthSq() > this.args.maxDistance * this.args.maxDistance) {
            const orbitDist = (this.args.minDistance + this.args.maxDistance)/2;
            // Close the gap
            this.debugPoint(targetLocation, undefined, orbitDist);
            const tgtPoints = tangentHeadings.map(tangent => Point.add(targetLocation, Point.fromAngle(tangent, orbitDist)));
            for(let i = 0; i < tgtPoints.length; i++) {
                this.debugPoint(tgtPoints[i]);
            }
            const tgtHeadings = tgtPoints.map(tgt => Point.subtract(tgt, ship.position).direction());
            const bestHeading = getMinHeading(currentHeading, tgtHeadings); 
            
            return { 
                tgtVel: ship.definition.maxSpeed, 
                tgtHeading: bestHeading
            };
        } else {
            // Orbit
            this.debugPoint(targetLocation, 'green', this.args.minDistance);
            this.debugPoint(targetLocation, 'yellow', this.args.maxDistance);
            const betterHeading = getMinHeading(currentHeading, tangentHeadings);
            return { 
                tgtVel: ship.definition.maxSpeed * this.args.orbitSpeed, 
                tgtHeading: betterHeading
            };
        }
    }
}

function getMinHeading(selfHeading: number, targetHeadings: number[]): number {
    const relativeHeadings = targetHeadings.map(target => Angle.accuteAngle(selfHeading, target));
    let minHeading = relativeHeadings[0];
    let actualTarget = targetHeadings[0];
    for(let i = 1; i < relativeHeadings.length; i++) {
        if(Math.abs(relativeHeadings[i]) < Math.abs(minHeading)) {
            minHeading = relativeHeadings[i];
            actualTarget = targetHeadings[i];
        }
    }
    return actualTarget;
}