import KeyboardManager from "../../common/input/KeyboardManager";
import Point from "../../common/position/Point";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import { HexToPixel, PixelToHex } from "../Hex";
import HexCell, { DownStairs } from "../HexCell";
import EnemyAttackPhase from "./EnemyAttackPhase";
import FloorTransitionPhase from "./FloorTransitionPhase";
import IGamePhase from "./IGamePhase";
import PlayerTurnGamePhase from "./PlayerTurnGamePhase";


export default class PlayerMoveAnimPhase implements IGamePhase {

    private time: number = 0;
    private duration: number;
    constructor(private playerPos: Point, private playerDest: Point) {
        
    }

    init(state: GameState): void {
        if(state.enemies.length === 0) {
            this.duration = 2;
        }
        else {
            this.duration = 10;
        }
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        this.time++;
        if(this.time === this.duration) { 
            state.player.position = this.playerDest;

            if(state.tiles.get(state.player.position).typeId === DownStairs.TypeID) {
                return new FloorTransitionPhase();
            }

            if(state.enemies.length === 0) {
                return new PlayerTurnGamePhase();
            }
            else {
                return new EnemyAttackPhase();
            }
        }
        return this;
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        const lerp = this.time / this.duration;
        state.draw(ctx, [state.player]);

        state.player.position = Point.interpolate(this.playerPos, this.playerDest, lerp);
        state.player.draw(ctx);
    }

}