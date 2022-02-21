import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../assets";
import GameState from "../GameState";
import IGamePhase from "../phases/IGamePhase";
import IFeature, { SimpleFeature } from "./IFeature";
import * as C from '../Constants';

export default class Shrine extends SimpleFeature {
    static sprite: Sprite;

    static onAssetsLoaded(assets:Assets) {
        Shrine.sprite = assets.getAsset('shrine') as Sprite;
    }

    isUsed: boolean;

    constructor() { 
        super(Shrine.sprite, 'Shrine');
        this.isUsed = false;
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(x === state.player.position.x && y === state.player.position.y && !this.isUsed) {
            this.isUsed = true;
            state.player.hp = Math.min(state.player.maxHp, state.player.hp + 3);
        }
        return nextPhase;
    }
}