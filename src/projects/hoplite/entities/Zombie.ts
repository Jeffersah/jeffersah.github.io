import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderable from "../../common/rendering/IRenderable";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import IAttackInfo from "../attackInfos/IAttackInfo";
import * as C from "../Constants";
import GameState from "../GameState";
import { GetRing, HexLength } from "../Hex";
import Enemy from "./Enemy";

export default class Zombie extends Enemy {
    static sprite: IRenderable;
    static onAssetsLoaded(assets:Assets) {
        Zombie.sprite = new Sprite(
            assets.tiles.image,
            new Rect(0, 10 * C.TILE_HEIGHT, C.TILE_WIDTH, C.TILE_HEIGHT),
        )
    }

    constructor(position: Point) {
        super(position);
        this.hp = this.maxHp = 1;
        this.isFlying = false;
        
        this.goldValue = 1;
    }

    getAttacks(state: GameState): IAttackInfo[] {
        const playerLocation = state.player.position;
        const len = HexLength(Point.subtract(playerLocation, this.position));
        if(len === 1) {
            return [AttackInfo.basicAttack(this, state.player, 1)];
        }
        return [];
    }

    getMove(state: GameState, attack: IAttackInfo[], disallowed: Point[]): Point {
        if(attack.length > 0) {
            // Don't move if you've attacked.
            return this.position;
        }

        const possibleMoves = GetRing(1).map(rp => Point.add(this.position, rp));
        let minMoves: Point[] = [];
        let minMoveDist = 99;
        for(let i = 0; i < possibleMoves.length; i++) {
            if(disallowed.some(p => p.equals(possibleMoves[i])))
                continue;
            if(!state.isValidMoveIgnoreEnemies(possibleMoves[i], false)) 
                continue;

            const ray = Point.subtract(state.player.position, possibleMoves[i]);
            const len = HexLength(ray);
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
        return Zombie.sprite;
    }
}