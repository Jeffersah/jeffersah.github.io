import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderable from "../../common/rendering/IRenderable";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import OffsetRenderable from '../../common/rendering/OffsetRenderable';
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import IAttackInfo from "../attackInfos/IAttackInfo";
import TileAttackInfo from "../attackInfos/TileAttackInfo";
import * as C from "../Constants";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import { GetRing, HexLength } from "../Hex";
import Enemy from "./Enemy";

const MAX_RANGE = 5;

export default class StoneEye extends Enemy {
    static sprites: IRenderable[];
    static readySprite: IRenderable;
    static impactAnimation: IRenderableSource;

    static onAssetsLoaded(assets:Assets) {
        StoneEye.sprites = [
            assets.getAsset('stone_eye_0').getRenderable(),
            assets.getAsset('stone_eye_1').getRenderable(),
            assets.getAsset('stone_eye_2').getRenderable()
        ]
        StoneEye.readySprite = assets.getAsset('stone_eye_ready').getRenderable()

        StoneEye.impactAnimation = assets.getAsset('impact_fire');
    }

    prepFire: Direction|undefined;
    randart: number;
    constructor(position: Point) {
        super(position);
        this.hp = this.maxHp = 3;
        this.isFlying = true;
        this.prepFire = undefined;

        this.goldValue = 5;
        this.randart = 0;
    }

    getAttacks(state: GameState): IAttackInfo[] {
        if(this.prepFire !== undefined) {
            const points: Point[] = [];
            const delta = DirectionHelper.ToPoint(this.prepFire);
            let pt = Point.add(this.position, delta);
            for(let i = 0; i < MAX_RANGE && state.tiles.isInBounds(pt.x, pt.y); i++) {
                points.push(pt);
                pt = Point.add(pt, delta);
            }
            this.prepFire = undefined;
            return [new TileAttackInfo(this.position, [{damage: 1, positions: points}], 4, StoneEye.impactAnimation)];
        }

        const playerLocation = state.player.position;
        const len = HexLength(Point.subtract(playerLocation, this.position));
        if(len <= MAX_RANGE) {
            let ray = Point.subtract(playerLocation, this.position);
            this.prepFire = DirectionHelper.FromPoint(ray);
        }
        return [];
    }

    getMove(state: GameState, attack: IAttackInfo[], disallowed: Point[]): Point {

        this.randart = Math.floor(Math.random() * StoneEye.sprites.length);

        if(attack.length > 0 || (this.prepFire !== undefined)) {
            // Don't move if you've attacked.
            return this.position;
        }

        const possibleMoves = GetRing(1).map(rp => Point.add(this.position, rp));
        let minMoves: Point[] = [];
        let minMoveDist = 99;
        for(let i = 0; i < possibleMoves.length; i++) {
            if(!state.isValidMoveIgnoreEnemies(possibleMoves[i], true)) 
                continue;
            if(disallowed.some(p => p.equals(possibleMoves[i])))
                continue;

            const ray = Point.subtract(state.player.position, possibleMoves[i]);
            const len = HexLength(ray);
            if(len === 1) {
                continue; // Dont move within 1 of the player if you can avoid it.
            }
            if(len < minMoveDist) { 
                minMoveDist = len;
                minMoves = [possibleMoves[i]];
            }
            else if(len === minMoveDist) {
                minMoves.push(possibleMoves[i]);
            }
        }

        // Don't retreat
        if(minMoveDist > HexLength(Point.subtract(state.player.position, this.position))) {
            return this.position;
        }

        if(minMoves.length === 0) return this.position;
        const moveTarget = minMoves[Math.floor(Math.random() * minMoves.length)];
        

        const playerLocation = state.player.position;
        const len = HexLength(Point.subtract(playerLocation, moveTarget));
        if(len <= MAX_RANGE) {
            let ray = Point.subtract(playerLocation, moveTarget);
            this.prepFire = DirectionHelper.FromPoint(ray);
        }
        return moveTarget;
    }

    override getRenderable(): IRenderable {
        if(this.prepFire !== undefined) {
            return new OffsetRenderable(StoneEye.readySprite, new Point(C.TILE_WIDTH/2, C.TILE_HEIGHT/2), DirectionHelper.ToAngle(this.prepFire));
        }

        // The origin of the eye sprite is the center (to support rotation), so we need to offset it
        return new OffsetRenderable(StoneEye.sprites[this.randart], new Point(C.TILE_WIDTH/2, C.TILE_HEIGHT/2));
    }
}