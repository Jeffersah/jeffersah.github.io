import KeyboardManager from "../../common/input/KeyboardManager";
import GameState from "../GameState";
import IGamePhase from "./IGamePhase";
import * as C from '../Constants';
import { MapGenerators } from "../mapGen/IMapGen";
import EntryAnimationPhase from "./EntryAnimationPhase";
import Point from "../../common/position/Point";

const FADE_OUT_ANIM_TIME = 30;
const PLAYER_MOVE_TIME = 30;

export default class FloorTransitionPhase implements IGamePhase {

    time = 0;

    init(state: GameState): void {
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        this.time++;
        if (this.time >= FADE_OUT_ANIM_TIME) {
            return new FloorTransitionPlayerMovePhase();
        } else {
            return this;
        }

    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        state.draw(ctx);
        ctx.fillStyle = '#000000';
        ctx.globalAlpha = this.time / FADE_OUT_ANIM_TIME;
        ctx.fillRect(0, 0, C.MAP_PIXEL_SIZE, C.MAP_PIXEL_SIZE);
        ctx.globalAlpha = 1;
        state.player.draw(ctx);
    }

}

class FloorTransitionPlayerMovePhase implements IGamePhase {

    time = 0;
    playerStartPoint: Point;

    init(state: GameState): void {
        const floor = state.currentFloor + 1;
        const generator = MapGenerators.filter(g => floor >= g.range[0] && (g.range[1] === -1 || floor < g.range[1]))[0].gen;
        this.playerStartPoint = state.player.position;
        state.changeFloor(floor, generator);
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        this.time++;
        if (this.time >= PLAYER_MOVE_TIME) {
            state.player.position = C.PLAYER_START_POSITION.clone();
            return new EntryAnimationPhase();
        } else {
            return this;
        }
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        const lerp = this.time / PLAYER_MOVE_TIME;
        const tgt = Point.interpolate(this.playerStartPoint, C.PLAYER_START_POSITION, lerp);
        state.player.position = tgt;
        state.player.draw(ctx);
    }

}