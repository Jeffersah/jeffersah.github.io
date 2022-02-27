import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../assets";
import GameState from "../GameState";
import IGamePhase from "../phases/IGamePhase";
import IFeature, { SimpleFeature } from "./IFeature";
import * as C from '../Constants';
import FloorTransitionPhase from "../phases/FloorTransitionPhase";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import ISaleItem from "../shopItems/ISaleItem";
import ShopPhase from "../phases/ShopPhase";

export default class Shop extends SimpleFeature {
    static sprite: Sprite;

    static onAssetsLoaded(assets:Assets) {
        Shop.sprite = assets.getAsset('shop') as Sprite;
    }

    constructor(private items: ISaleItem[]) { 
        super(Shop.sprite, 'Shop');
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(x === state.player.position.x && y === state.player.position.y) {
            return _ => {
                return new ShopPhase(this.items, nextPhase);
            };
        }
        return undefined;
    }
}