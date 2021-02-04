import GameState from "../GameState";
import { Ship } from "../Ship";

export interface IShipAI {
    TickAI(gs: GameState, ship: Ship): {tgtVel: number, tgtHeading: number};
}