import KeyboardManager from "../../common/input/KeyboardManager";
import IAnimation from "../animation/IAnimation";
import GameState from "../GameState";
import IGamePhase from "./IGamePhase";

export default class AnimationPhase implements IGamePhase {

    constructor(private animations: IAnimation[], private onFinish: (gs: GameState) => IGamePhase) {
    }

    init(state: GameState): void {
        
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        for(let i = this.animations.length - 1; i >= 0; i--) {
            if(this.animations[i].tick()) {
                this.animations.splice(i, 1);
            }
        }
        if(this.animations.length === 0) {
            return this.onFinish(state);
        }
        return this;
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        state.draw(ctx);
        for(const animation of this.animations) { 
            animation.draw(ctx);
        }
    }

}