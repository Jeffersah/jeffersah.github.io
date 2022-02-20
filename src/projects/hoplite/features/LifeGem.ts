import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../assets";
import GameState from "../GameState";
import IGamePhase from "../phases/IGamePhase";
import IFeature, { SimpleFeature } from "./IFeature";
import * as C from '../Constants';

export default class LifeGem extends SimpleFeature {
    static sprite: Sprite;
    static brokenSprite: Sprite;

    static onAssetsLoaded(assets:Assets) {
        LifeGem.sprite = assets.tiles.getSprite(7, 0, C.TILE_WIDTH, C.TILE_HEIGHT);
        LifeGem.brokenSprite = assets.tiles.getSprite(7, 1, C.TILE_WIDTH, C.TILE_HEIGHT);
    }

    isBroken: boolean;

    constructor() { 
        super(LifeGem.sprite);
        this.isBroken = false;
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(x === state.player.position.x && y === state.player.position.y && !this.isBroken) {
            this.isBroken = true;
            state.player.hp += 1;
            state.player.maxHp += 1;
            this.sprite = LifeGem.brokenSprite;
        }
        return nextPhase;
    }
}