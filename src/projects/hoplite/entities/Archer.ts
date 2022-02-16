import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderable from "../../common/rendering/IRenderable";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import IAttackInfo from "../attackInfos/IAttackInfo";
import * as C from "../Constants";
import GameState from "../GameState";
import { GetRing, HexLength } from "../Hex";
import Enemy from "./Enemy";

const MAX_RANGE = 5;

export default class Archer extends Enemy {
    static sprite: IRenderable;
    static projectileSprite: Sprite;
    static impactAnimation: IRenderableSource;

    static onAssetsLoaded(assets:Assets) {
        Archer.sprite = new Sprite(
            assets.tiles.image,
            new Rect(C.TILE_WIDTH, 10 * C.TILE_HEIGHT, C.TILE_WIDTH, C.TILE_HEIGHT),
        );

        Archer.projectileSprite = new Sprite(
            assets.tiles.image,
            new Rect(178, 96, 14, 4),
            new Point(7, 2),
        );

        Archer.impactAnimation = assets.getImpactAnimation(1);
    }

    constructor(position: Point) {
        super(position);
        this.hp = this.maxHp = 1;
        this.isFlying = false;
        
        this.goldValue = 3;
    }

    getAttacks(state: GameState): IAttackInfo[] {
        const playerLocation = state.player.position;
        const len = HexLength(Point.subtract(playerLocation, this.position));
        if(len > 1 && len <= MAX_RANGE) {
            let ray = Point.subtract(playerLocation, this.position);
            if(ray.x === 0 || ray.y === 0 || ray.x === -ray.y) {
                let delta = new Point(Math.sign(ray.x), Math.sign(ray.y));
                let nextPt = Point.add(delta, this.position);
                while(!nextPt.equals(playerLocation)) {
                    if(state.entityAt(nextPt) !== undefined) {
                        return []; // Can't shoot through entities
                    }
                    nextPt = Point.add(delta, nextPt);
                }
                return [AttackInfo.projectileAttack(this, state.player, 1, Archer.projectileSprite, Archer.impactAnimation)];
            }
        }
        return [];
    }

    getMove(state: GameState, attack: IAttackInfo[], disallowed: Point[]): Point {
        if(attack.length > 0) {
            // Don't move if you've attacked.
            return this.position;
        }

        let deltaPlayer = Point.subtract(state.player.position, this.position);
        if(HexLength(deltaPlayer) === 1) {
            // If you're one away from the player, always run directly away from the player.
            let targetPosition = Point.subtract(this.position, deltaPlayer);
            if(state.isValidMoveIgnoreEnemies(targetPosition, false) && !disallowed.some(p => p.equals(targetPosition))) {
                return targetPosition;
            }
            // If you can't, don't move.
            // This makes it much easier to catch archers, as otherwise you have to trap them in a corner.
            return this.position;
        }

        const possibleMoves = GetRing(1).map(rp => Point.add(this.position, rp));
        let minMoves: Point[] = [];
        let minMoveDist = 99;
        for(let i = 0; i < possibleMoves.length; i++) {
            if(!state.isValidMoveIgnoreEnemies(possibleMoves[i], false)) 
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

        if(minMoves.length === 0) return this.position;
        return minMoves[Math.floor(Math.random() * minMoves.length)];
    }

    override getRenderable(): IRenderable {
        return Archer.sprite;
    }
}