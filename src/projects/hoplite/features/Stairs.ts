import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../assets";
import GameState from "../GameState";
import IGamePhase from "../phases/IGamePhase";
import IFeature, { SimpleFeature } from "./IFeature";
import * as C from '../Constants';
import FloorTransitionPhase from "../phases/FloorTransitionPhase";

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

    static onAssetsLoaded(assets:Assets) {
        LockedStairs.sprite = assets.getAsset('down_stairs_locked') as Sprite;
    }

    constructor() { 
        super(LockedStairs.sprite, 'LockedStairs');
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(state.enemies.length === 0 && Object.keys(state.brokenGems).length === 0) {
            // TODO: Some kind of unlock animation?
            state.features.set(new Stairs(), x, y);
            return undefined;
        }
    }
}