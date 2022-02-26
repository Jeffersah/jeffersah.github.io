import Point from "../../common/position/Point";
import IRenderable from "../../common/rendering/IRenderable";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import OffsetRenderable from '../../common/rendering/OffsetRenderable';
import Assets from "../Assets";
import IAttackInfo from "../attackInfos/IAttackInfo";
import TileAttackInfo from "../attackInfos/TileAttackInfo";
import * as C from "../Constants";
import { AllDirections, Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import { GetRing, HexLength } from "../Hex";
import Enemy from "./Enemy";

const MAX_RANGE = 5;

export default class StoneDisc extends Enemy {
    static sprite: IRenderable;
    static readySprite: IRenderable;
    static impactAnimation: IRenderableSource;

    static onAssetsLoaded(assets:Assets) {
        StoneDisc.sprite = assets.getAsset('stone_disc').getRenderable();
        StoneDisc.readySprite = assets.getAsset('stone_disc_ready').getRenderable();
        StoneDisc.impactAnimation = assets.getAsset('impact_fire');
    }

    isReadyToFire: boolean;
    constructor(position: Point) {
        super(position);
        this.hp = this.maxHp = 5;
        this.isFlying = true;
        this.isReadyToFire = false;

        this.goldValue = 8;
    }

    getAttacks(state: GameState): IAttackInfo[] {
        if(this.isReadyToFire) {
            const points: Point[] = [];
            for(const dir of AllDirections){
                const delta = DirectionHelper.ToPoint(dir);
                let pt = Point.add(this.position, delta);
                for(let i = 0; i < MAX_RANGE && state.tiles.isInBounds(pt.x, pt.y); i++) {
                    points.push(pt);
                    pt = Point.add(pt, delta);
                }
            }
            this.isReadyToFire = false;
            return [new TileAttackInfo(this.position, [{damage: 1, positions: points}], 4, StoneDisc.impactAnimation)];
        }

        const playerLocation = state.player.position;
        const len = HexLength(Point.subtract(playerLocation, this.position));
        if(len <= MAX_RANGE) {
            let ray = DirectionHelper.FromPoint(Point.subtract(playerLocation, this.position));
            if(ray !== undefined) this.isReadyToFire = true;
        }
        return [];
    }

    getMove(state: GameState, attack: IAttackInfo[], disallowed: Point[]): Point {
        if(attack.length > 0 || this.isReadyToFire) {
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
        return minMoves[Math.floor(Math.random() * minMoves.length)];
    }

    override getRenderable(): IRenderable {
        if(this.isReadyToFire) {
            return StoneDisc.readySprite;
        }
        return StoneDisc.sprite;
    }
}