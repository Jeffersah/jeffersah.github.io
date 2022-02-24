import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../assets";
import GameState from "../GameState";
import IGamePhase from "../phases/IGamePhase";
import IFeature, { SimpleFeature } from "./IFeature";
import * as C from '../Constants';
import FloorTransitionPhase from "../phases/FloorTransitionPhase";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import { HexToPixel } from "../Hex";
import IRenderable from "../../common/rendering/IRenderable";
import Rect from "../../common/position/Rectangle";

export default class Portal implements IFeature {
    static closedSprite: Sprite;
    static openSprites: Sprite[];
    static openAnimation: IRenderable;

    static onAssetsLoaded(assets:Assets) {
        Portal.closedSprite = assets.getAsset('portal_closed') as Sprite;
        Portal.openSprites = [];
        let sprite: IRenderableSource;
        for(let i = 0; (sprite = assets.getAsset('portal_open_' + i, true)) !== undefined; i++) {
            this.openSprites.push(sprite as Sprite);
        }

        Portal.openAnimation = assets.getAsset('portal_open_anim').getRenderable();
    }
    
    isOpen: boolean;
    name: string;

    constructor() { 
        this.isOpen = false;
        this.name = 'Portal';
    }

    afterEnemyTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        return undefined;
    }
    
    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(state.enemies.length === 0 && !this.isOpen) {
            this.isOpen = true;
        }

        if(x === state.player.position.x && y === state.player.position.y && this.isOpen) {
            // TODO: GAME OVER
            return () => new FloorTransitionPhase();
        }

        return undefined;
    }

    
    draw(ctx: CanvasRenderingContext2D, world: GameState, pt: Point): void {
        const tgt = HexToPixel(pt);
        const dest = new Rect(tgt.x, tgt.y, C.TILE_WIDTH, C.TILE_HEIGHT);
        if(this.isOpen){
            Portal.openAnimation.tick();
            Portal.openAnimation.draw(ctx, dest, 0);
        }
        else{
            Portal.closedSprite.draw(ctx, dest, 0);
        }
    }
}