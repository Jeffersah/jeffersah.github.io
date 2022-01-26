import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import DelayAnimation from "../animation/DelayAnimation";
import IAnimation from "../animation/IAnimation";
import ParallelAnimation from "../animation/ParallelAnimation";
import RenderableAnimation from "../animation/RenderableAnimation";
import GameState from "../GameState";
import { GetRing, HexToPixel } from "../Hex";
import IAttackInfo, { IAttackDamageInfo } from "./IAttackInfo";
import * as C from '../Constants';

export default class RadialAreaAttackInfo implements IAttackInfo {
    constructor(private point: Point, private rings: {radius: number, damage: number}[], private delayPerRadius: number, private animationSource: IRenderableSource, public ignoreEnemies?: boolean, public ignorePlayer?: boolean) {
        
    }

    getAffectedTiles(state: GameState): IAttackDamageInfo[] {
        return this.rings.map(ring => {
            return {
                damage: ring.damage,
                positions: GetRing(ring.radius).map(p => Point.add(p, this.point)).filter(pt => state.tiles.isInBounds(pt.x, pt.y)),
                ignoreEnemies: this.ignoreEnemies,
                ignorePlayer: this.ignorePlayer
            };
        });
    }

    toAnimations(state: GameState): IAnimation[] {
        const innerAnimations: IAnimation[] = [];
        for(const ring of this.rings) {
            const points = GetRing(ring.radius).map(p => Point.add(p, this.point)).filter(pt => state.tiles.isInBounds(pt.x, pt.y))
            innerAnimations.push(
                new DelayAnimation(new ParallelAnimation(
                    points.map(point => new RenderableAnimation(this.animationSource.getRenderable(), new Rect(HexToPixel(point).x, HexToPixel(point).y, C.TILE_WIDTH, C.TILE_HEIGHT))),
                ), ring.radius * this.delayPerRadius)
            );
        }

        return [new ParallelAnimation(innerAnimations)];
    }
}