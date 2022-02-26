import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import DelayAnimation from "../animation/DelayAnimation";
import IAnimation from "../animation/IAnimation";
import ParallelAnimation from "../animation/ParallelAnimation";
import RenderableAnimation from "../animation/RenderableAnimation";
import GameState from "../GameState";
import { GetRing, HexLength, HexToPixel } from "../Hex";
import IAttackInfo, { IAttackDamageInfo } from "./IAttackInfo";
import * as C from '../Constants';
import Enemy from "../entities/Enemy";

export default class SpawnEnemyAttackInfo implements IAttackInfo {
    constructor(private point: Point, private enemy: Enemy, private animationSource?: IRenderableSource) {
        
    }

    getAffectedTiles(state: GameState): IAttackDamageInfo[] {
        return [];
    }

    toAnimations(state: GameState): IAnimation[] {
        if(this.animationSource !== undefined) {
            const tgt = HexToPixel(this.point);
            return [
                new RenderableAnimation(
                    this.animationSource.getRenderable(),
                    new Rect(tgt.x, tgt.y, C.TILE_WIDTH, C.TILE_HEIGHT)
                )
            ];
        }

        return [];
    }
    
    applyExtraEffects(state: GameState): void {
        if(state.entityAt(this.point) === undefined) {
            this.enemy.position = this.point;
            state.enemies.push(this.enemy);
        }
    }
}