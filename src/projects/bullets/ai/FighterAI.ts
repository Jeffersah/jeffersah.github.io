import Angle from "../../common/Angle";
import { ETeam } from "../ETeam";
import GameState from "../GameState";
import { Ship } from "../Ship";
import { ShipAI } from "./ShipAI";

export default class FigherAI extends ShipAI {
    constructor() {
        super();
    }

    TickAI(gs: GameState, ship: Ship): { tgtVel: number; tgtHeading: number; } {
        var nearest = gs.findNearestShips(ship.position, ship.getTeam() === ETeam.enemy ? ETeam.ally : ETeam.enemy);
        var target = nearest[0];

        if(target === undefined) {
            // Nothing to do, no ships.
            return {tgtHeading: 0, tgtVel: 0};
        }

        const tgtHeading = Angle.angleBetween(ship.position, target.position);

        const deltaHeading = Angle.accuteAngle(ship.rotation, tgtHeading);
        const tgtSpeed = 1 - Math.max(0, Math.min(1, Math.abs(deltaHeading) / Math.PI));

        return { tgtVel: tgtSpeed * ship.definition.maxSpeed, tgtHeading: tgtHeading };
    }
}