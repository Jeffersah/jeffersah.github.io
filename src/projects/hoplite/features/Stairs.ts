import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../assets";
import GameState from "../GameState";
import IGamePhase from "../phases/IGamePhase";
import IFeature, { SimpleFeature } from "./IFeature";
import * as C from '../Constants';
import FloorTransitionPhase from "../phases/FloorTransitionPhase";
import IRenderableSource from "../../common/rendering/IRenderableSource";

export default class Stairs extends SimpleFeature {
    static sprite: Sprite;

    static onAssetsLoaded(assets:Assets) {
        Stairs.sprite = assets.getAsset('down_stairs') as Sprite;
    }

    constructor() { 
        super(Stairs.sprite, 'Stairs');
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(x === state.player.position.x && y === state.player.position.y) {
            return () => new FloorTransitionPhase();
        }
        return undefined;
    }
}

export class LockedStairs extends SimpleFeature {
    static sprite: Sprite;
    static unlockAnimation: IRenderableSource;

    static onAssetsLoaded(assets:Assets) {
        LockedStairs.sprite = assets.getAsset('down_stairs_locked') as Sprite;
        LockedStairs.unlockAnimation = assets.getAsset('down_stairs_unlock_animation');
    }

    hasPlayedAnimation: boolean;
    isPlayingAnimation: boolean;

    constructor() { 
        super(LockedStairs.sprite, 'LockedStairs');
        this.hasPlayedAnimation = this.isPlayingAnimation = false;
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(state.enemies.length === 0 && Object.keys(state.brokenGems).length === 0 && !this.isPlayingAnimation) {
            this.isPlayingAnimation = true;
            this.sprite = LockedStairs.unlockAnimation.getRenderable();
        }
        else if(this.hasPlayedAnimation && x === state.player.position.x && y === state.player.position.y){
            return () => new FloorTransitionPhase();
        }
        return undefined;
    }

    draw(ctx: CanvasRenderingContext2D, world: GameState, pt: Point): void {
        if(this.sprite.tick()) {
            this.hasPlayedAnimation = true;
            this.sprite = Stairs.sprite;
        }
        super.draw(ctx, world, pt);
    }
}