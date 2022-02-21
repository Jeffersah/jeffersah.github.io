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

export default class Mage extends Enemy {
    static sprite: IRenderable;
    static cooldownsprite: IRenderable;
    static projectileSprite: Sprite;
    static impactAnimation: IRenderableSource;

    static onAssetsLoaded(assets:Assets) {
        Mage.sprite = assets.getAsset('mage') as Sprite;

        Mage.cooldownsprite = assets.getAsset('mage_cooldown') as Sprite;

        Mage.projectileSprite = assets.getAsset('projectile_fire') as Sprite;

        Mage.impactAnimation = assets.getAsset('impact_fire');
    }

    attackOnCooldown: boolean;

    constructor(position: Point) {
        super(position);
        this.hp = this.maxHp = 1;
        this.isFlying = false;

        this.goldValue = 5;
    }

    getAttacks(state: GameState): IAttackInfo[] {
        if(this.attackOnCooldown){
            return [];
        }

        const playerLocation = state.player.position;
        const len = HexLength(Point.subtract(playerLocation, this.position));
        if(len <= MAX_RANGE) {
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
                this.attackOnCooldown = true;
                return [AttackInfo.projectileAttack(this, state.player, 1, Mage.projectileSprite, Mage.impactAnimation)];
            }
        }
        return [];
    }

    getMove(state: GameState, attack: IAttackInfo[], disallowed: Point[]): Point {
        if(attack.length > 0) {
            // Don't move if you've attacked.
            return this.position;
        }

        if(this.attackOnCooldown) {
            // Don't move if you're on cooldown
            this.attackOnCooldown = false;
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
            // // Mages COULD be smarter by trying to avoid ending up directly next to the player, but doing so makes them a little bit too strong.
            // if(len === 1) {
            //     continue;
            // }
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
        if(this.attackOnCooldown) return Mage.cooldownsprite;
        return Mage.sprite;
    }
}