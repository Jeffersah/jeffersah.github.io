import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../assets";
import GameState from "../GameState";
import IGamePhase from "../phases/IGamePhase";
import IFeature, { SimpleFeature } from "./IFeature";
import * as C from '../Constants';
import IRenderableSource from "../../common/rendering/IRenderableSource";
import { DelaySpriteAnimationInstance, SpriteAnimationInstance } from "../../common/rendering/SpriteAnimation";

export default class LifeGem extends SimpleFeature {
    static sprite: Sprite;
    static brokenSprite: Sprite;

    static onAssetsLoaded(assets:Assets) {
        LifeGem.sprite = assets.getAsset('life_gem') as Sprite;
        LifeGem.brokenSprite = assets.getAsset('life_gem_broken') as Sprite;
    }

    isBroken: boolean;

    constructor() { 
        super(LifeGem.sprite, 'LifeGem');
        this.isBroken = false;
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(x === state.player.position.x && y === state.player.position.y && !this.isBroken) {
            this.isBroken = true;
            state.brokenGems[state.currentFloor] = true;
            state.player.hp += 1;
            state.player.maxHp += 1;
            this.sprite = LifeGem.brokenSprite;
        }
        return nextPhase;
    }
}

export class RunicLifeGem extends SimpleFeature {
    static sprite: Sprite;
    static brokenSprite: Sprite;
    static flashAnimation: IRenderableSource;

    static onAssetsLoaded(assets:Assets) {
        RunicLifeGem.sprite = assets.getAsset('life_gem_runes') as Sprite;
        RunicLifeGem.brokenSprite = assets.getAsset('life_gem_broken_runes') as Sprite;
        RunicLifeGem.flashAnimation = assets.getAsset('life_gem_flash_animation');
    }

    hasFlashed: boolean;

    constructor(public isBroken: boolean, public index: number) { 
        super(isBroken ? RunicLifeGem.brokenSprite : RunicLifeGem.sprite, 'RunicLifeGem');
    }

    afterPlayerTurn(state: GameState, x: number, y: number, nextPhase: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        if(!this.hasFlashed && state.enemies.length === 0 && !this.isBroken){
            this.sprite = new DelaySpriteAnimationInstance(RunicLifeGem.flashAnimation.getRenderable() as SpriteAnimationInstance, this.index * 12);
            this.hasFlashed = true;
        }
        return undefined;
    }

    draw(ctx: CanvasRenderingContext2D, world: GameState, pt: Point): void {
        if(this.sprite.tick()){
            this.sprite = this.isBroken ? RunicLifeGem.brokenSprite : RunicLifeGem.sprite;
        }
        super.draw(ctx, world, pt);
    }
}