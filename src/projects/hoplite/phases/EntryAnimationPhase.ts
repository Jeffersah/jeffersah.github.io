import GameState from "../GameState";
import IGamePhase from "./IGamePhase";
import * as C from '../Constants';
import PlayerTurnGamePhase from "./PlayerTurnGamePhase";

const ENTRY_ANIMATION_TIME = 120;

export default class EntryAnimationPhase implements IGamePhase {
    animationTime = 0;

    constructor() {

    }

    tick(state: GameState): IGamePhase {
        this.animationTime++;
        if(this.animationTime >= ENTRY_ANIMATION_TIME) { 
            return new PlayerTurnGamePhase();
        }
        else {
            return this;
        }
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        state.draw(ctx);
        ctx.fillStyle = '#000000';
        if(this.animationTime <= ENTRY_ANIMATION_TIME) {
            ctx.globalAlpha = 1 - this.animationTime / ENTRY_ANIMATION_TIME;
            ctx.fillRect( 0, 0, C.MAP_PIXEL_SIZE, C.MAP_PIXEL_SIZE);
            ctx.globalAlpha = 1;
        }
        state.player.draw(ctx);
    }
}