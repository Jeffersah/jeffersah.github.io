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

export default class TileAttackInfo implements IAttackInfo {
    constructor(private point: Point, private infos: IAttackDamageInfo[], private delayPerDist: number, private animationSource: IRenderableSource) {
        
    }

    getAffectedTiles(state: GameState): IAttackDamageInfo[] {
        return this.infos;
    }

    toAnimations(state: GameState): IAnimation[] {
        const innerAnimations: IAnimation[] = [];
        const allPts = this.infos.reduce((acc, info) => acc.concat(info.positions), []);

        return [
            new ParallelAnimation(
                allPts.map(pt => {
                    const dist = HexLength(Point.subtract(pt, this.point));
                    const delay = this.delayPerDist * dist;
                    const pix = HexToPixel(pt);
                    return new DelayAnimation(
                        new RenderableAnimation(
                            this.animationSource.getRenderable(),
                            new Rect(pix.x, pix.y, C.TILE_WIDTH, C.TILE_HEIGHT)), 
                        delay);
                })
            )
        ];
    }
}