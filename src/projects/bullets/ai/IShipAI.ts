import GameState from "../GameState";
import { Ship } from "../Ship";
import BroadsideAI from "./BroadsideAI";
import FigherAI from "./FighterAI";

export interface IShipAI {
    TickAI(gs: GameState, ship: Ship): {tgtVel: number, tgtHeading: number};
    debugDraw(ctx: CanvasRenderingContext2D, ship: Ship): void;
}

export const AllAIGenerators: {[key: string]: (args?: {[key: string]: any})=>IShipAI} = {
    fighter: (args) => new FigherAI(),
    broadside: (args) => new BroadsideAI(<any>(args ?? {}))
}