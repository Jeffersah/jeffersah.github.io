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
import Lava from "../tiles/Lava";
import Enemy from "./Enemy";

const MAX_RANGE = 5;

export default class Archer extends Enemy {
    static sprite: IRenderable;
    static fearsprite: IRenderable;
    static projectileSprite: Sprite;
    static impactAnimation: IRenderableSource;

    static onAssetsLoaded(assets:Assets) {
        Archer.sprite = new Sprite(
            assets.tiles.image,
            new Rect(C.TILE_WIDTH, 10 * C.TILE_HEIGHT, C.TILE_WIDTH, C.TILE_HEIGHT),
        );

        Archer.fearsprite = new Sprite(
            assets.tiles.image,
            new Rect(C.TILE_WIDTH, 11 * C.TILE_HEIGHT, C.TILE_WIDTH, C.TILE_HEIGHT),
        );

        Archer.projectileSprite = new Sprite(
            assets.tiles.image,
            new Rect(178, 96, 14, 4),
            new Point(7, 2),
        );

        Archer.impactAnimation = assets.getImpactAnimation(1);
    }


    isAfraid: boolean;

    constructor(position: Point) {
        super(position);
        this.hp = this.maxHp = 1;
        this.isFlying = false;
        this.isAfraid = false;
        
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
            this.isAfraid = false;
            return this.position;
        }

        let deltaPlayer = Point.subtract(state.player.position, this.position);
        // IF the player is one hex away, the archer will become "Afraid" and run directly away.
        // If they can't move away, they won't move. This makes them easier to catch.
        // You can also scare them into lava, which is unhealthy.
        if(HexLength(deltaPlayer) === 1) {
            this.isAfraid = true;
            
            let targetPosition = Point.subtract(this.position, deltaPlayer);
            const tile = state.tiles.isInBounds(targetPosition.x, targetPosition.y) ? state.tiles.get(targetPosition) : undefined;
            if(tile === undefined || targetPosition.equals(state.player.position)) { 
                return this.position; 
            }
            if(!tile.isPathable && tile.typeId !== Lava.TypeID) {
                 // If the tile isn't pathable don't move
                 // We DO allow archers to run into lava if they're afraid.
                return this.position;
            }
            if(disallowed.some(p => p.equals(targetPosition))) {
                return this.position;
            }

            return targetPosition;
        } else {
            this.isAfraid = false;
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
        if(this.isAfraid) {
            return Archer.fearsprite;
        }
        return Archer.sprite;
    }
}