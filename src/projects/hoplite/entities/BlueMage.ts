import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderable from "../../common/rendering/IRenderable";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import IAttackInfo from "../attackInfos/IAttackInfo";
import SpawnEnemyAttackInfo from "../attackInfos/SpawnEnemyAttackInfo";
import * as C from "../Constants";
import GameState from "../GameState";
import { GetRing, HexLength } from "../Hex";
import BlueBurstDisc from "./BlueBurstDisc";
import Enemy from "./Enemy";

const MAX_RANGE = 5;

export default class BlueMage extends Enemy {
    static sprite: IRenderable;
    static cooldownsprite: IRenderable;
    static projectileSprite: Sprite;
    static spawnAnimation: IRenderableSource;

    static onAssetsLoaded(assets:Assets) {
        BlueMage.sprite = assets.getAsset('blue_mage') as Sprite;
        BlueMage.cooldownsprite = assets.getAsset('blue_mage_cooldown') as Sprite;
        BlueMage.spawnAnimation = assets.getAsset('impact_blue_magic_backwards') as Sprite;
    }

    attackOnCooldown: boolean;

    constructor(position: Point) {
        super(position);
        this.hp = this.maxHp = 3;
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
            let ring = GetRing(1);

            ring = ring.map(pt => Point.add(playerLocation, pt)).filter(pt => state.isValidMove(pt, true));

            const tgt = ring[Math.floor(Math.random() * ring.length)];
            this.attackOnCooldown = true;
            return [
                new SpawnEnemyAttackInfo(tgt, new BlueBurstDisc(tgt), BlueMage.spawnAnimation)
            ];
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
            if(len === 1) {
                continue;
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
        if(this.attackOnCooldown) return BlueMage.cooldownsprite;
        return BlueMage.sprite;
    }
}