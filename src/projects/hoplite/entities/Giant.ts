import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import { DeltaRenderable } from "../../common/rendering/DeltaRenderable";
import IRenderable from "../../common/rendering/IRenderable";
import IRenderableSource from "../../common/rendering/IRenderableSource";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import AttackInfo from "../attackInfos/AttackInfo";
import IAttackInfo from "../attackInfos/IAttackInfo";
import RadialAreaAttackInfo from "../attackInfos/RadialAreaAttackInfo";
import * as C from "../Constants";
import GameState from "../GameState";
import { GetRing, HexLength } from "../Hex";
import Enemy from "./Enemy";

const MAX_RANGE = 5;

export default class Giant extends Enemy {
    static renderable: IRenderable;
    static bigAttackPrepImage: IRenderable;
    static radialSmashAnimation: IRenderableSource;

    static turnSequence: ('move'|'skip'|'smashPrep'|'smash')[] = [
        'move', 'move', 'skip', 'move', 'smashPrep', 'smash'
    ];

    static onAssetsLoaded(assets:Assets) {
        Giant.renderable = new DeltaRenderable(new Sprite(
            assets.tiles.image,
            new Rect(7 * C.TILE_WIDTH, 10 * C.TILE_HEIGHT, C.TILE_WIDTH, C.TILE_HEIGHT * 2),
        ), new Rect(0, -1, 1, 2));

        Giant.bigAttackPrepImage = new DeltaRenderable(new Sprite(
            assets.tiles.image,
            new Rect(8 * C.TILE_WIDTH, 10 * C.TILE_HEIGHT, C.TILE_WIDTH, C.TILE_HEIGHT * 2),
        ), new Rect(0, -1, 1, 2));

        this.radialSmashAnimation = assets.getImpactAnimation(3);
    }

    turnSequenceIndex: number;
    lastTurn: ('move'|'skip'|'smashPrep'|'smash');

    constructor(position: Point) {
        super(position);
        this.hp = this.maxHp = 12;
        this.isFlying = false;
        this.turnSequenceIndex = Math.floor(Math.random() * Giant.turnSequence.length);
        this.lastTurn = Giant.turnSequence[this.turnSequenceIndex === 0 ? Giant.turnSequence.length - 1 : this.turnSequenceIndex - 1];
    }

    getAttacks(state: GameState): IAttackInfo[] {
        const turn = Giant.turnSequence[this.turnSequenceIndex];
        switch(turn) {
            case 'move':
                const playerLocation = state.player.position;
                const len = HexLength(Point.subtract(playerLocation, this.position));
                if(len === 1) {
                    return [AttackInfo.basicAttack(this, state.player, 3)];
                }
                return [];
            case 'skip':
            case 'smashPrep':
                return [];
            case 'smash':
                return [new RadialAreaAttackInfo(this.position, [{radius: 1, damage: 3}, {radius: 2, damage: 1}], 8, Giant.radialSmashAnimation, true)];
            default: return [];
        }
    }

    getMove(state: GameState, attack: IAttackInfo[], disallowed: Point[]): Point {
        const turn = Giant.turnSequence[this.turnSequenceIndex];
        this.turnSequenceIndex = (this.turnSequenceIndex + 1) % Giant.turnSequence.length;
        this.lastTurn = turn;

        switch(turn) {
            case 'move':
                if(attack.length > 0) return this.position;
                return this.internalGetMove(state, disallowed);
            case 'smash':
                // The giant is allowed to move immediately after the smash attack.
                return this.internalGetMove(state, disallowed);
            default:
                return this.position;
        }

    }

    private internalGetMove(state: GameState, disallowed: Point[]): Point {
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
        return this.lastTurn === 'smashPrep' ? Giant.bigAttackPrepImage : Giant.renderable;
    }
}