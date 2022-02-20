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
        Stairs.sprite = assets.tiles.getSprite(5, 0, C.TILE_WIDTH, C.TILE_HEIGHT);
    }

    constructor() { 
        super(Stairs.sprite);
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(x === state.player.position.x && y === state.player.position.y) {
            return () => new FloorTransitionPhase();
        }
        return undefined;
    }
}