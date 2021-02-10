import Angle from "../../common/Angle";
import GameState from "../GameState";
import { Ship } from "../Ship";
import { ShipAI } from "./ShipAI";

export default class FigherAI extends ShipAI {
    constructor() {
        super();
    }

    TickAI(gs: GameState, ship: Ship): { tgtVel: number; tgtHeading: number; } {
        const player = gs.Player;
        const tgtHeading = Angle.angleBetween(ship.position, player.position);

        const deltaHeading = Angle.accuteAngle(ship.rotation, tgtHeading);
        const tgtSpeed = 1 - Math.max(0, Math.min(1, Math.abs(deltaHeading) / Math.PI));

        return { tgtVel: tgtSpeed * ship.definition.maxSpeed, tgtHeading: tgtHeading };
    }
}