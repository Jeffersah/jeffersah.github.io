import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import GameState from "../GameState";
import { HexToPixel } from "../Hex";
import IGamePhase from "../phases/IGamePhase";
import * as C from '../Constants';
import Rect from "../../common/position/Rectangle";

export default interface IFeature {
    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState)=>IGamePhase): undefined | ((gs: GameState)=>IGamePhase);
    afterEnemyTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState)=>IGamePhase): undefined | ((gs: GameState)=>IGamePhase);

    draw(ctx: CanvasRenderingContext2D, world: GameState, pt: Point): void;
}

export class SimpleFeature implements IFeature {

    constructor(protected sprite: Sprite) {
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        return undefined;
    }

    afterEnemyTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        return undefined;
    }
    
    draw(ctx: CanvasRenderingContext2D, world: GameState, pt: Point): void {
        const tgt = HexToPixel(pt);
        this.sprite.draw(ctx, new Rect(tgt.x, tgt.y, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
    }
}