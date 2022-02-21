import KeyboardManager from "../../common/input/KeyboardManager";
import MouseManager from "../../common/input/MouseManager";
import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import { HexLength, HexToPixel, PixelToHex } from "../Hex";
import IGamePhase from "./IGamePhase";
import PlayerMoveAnimPhase from "./PlayerMoveAnimPhase";
import * as C from '../Constants';
import HopliteProgram from "..";

type Move = Direction | 6 | undefined;

const dirKeys = [
    { key: 'a', dir: Direction.Left },
    { key: '4', dir: Direction.Left },
    
    { key: 'q', dir: Direction.UpLeft },
    { key: '7', dir: Direction.UpLeft },

    { key: 'w', dir: Direction.UpRight },
    { key: '9', dir: Direction.UpRight },

    { key: 'd', dir: Direction.Right },
    { key: '6', dir: Direction.Right },

    { key: 'x', dir: Direction.DownRight },
    { key: '3', dir: Direction.DownRight },

    { key: 'z', dir: Direction.DownLeft },
    { key: '1', dir: Direction.DownLeft },

    { key: 's', dir: 6 },
    { key: '5', dir: 6 },
]

export default class PlayerTurnGamePhase implements IGamePhase {

    static cellHighlightSprite: Sprite;
    static onAssetsLoaded(assets: Assets): void {
        this.cellHighlightSprite = assets.getAsset('select_blue') as Sprite;
    }

    mouseTile: Point;

    init(state: GameState): void {
        this.mouseTile = undefined;
    }

    tick(state: GameState, keys: KeyboardManager, mouse: MouseManager): IGamePhase {
        const dir = this.tryGetDirection(state, keys, mouse);
        if(dir !== undefined) {
            const destination = dir === 6 ? state.player.position : Point.add(state.player.position, DirectionHelper.ToPoint(dir));
            const additionalMoves = [...state.player.primary.enableAdditionalMoves(state, state.player), ...state.player.secondary.enableAdditionalMoves(state, state.player)];

            if(!state.isValidMoveIgnorePlayer(destination, false)) {
                const specialMove = additionalMoves.find(move => move.dest.equals(destination));
                if(specialMove !== undefined){
                    return PlayerMoveAnimPhase(state, state.player.position, destination, specialMove.forceMove);
                }
                return this;
            }

            return PlayerMoveAnimPhase(state, state.player.position, destination, destination);
        }
        return this;
    }

    tryGetDirection(state:GameState, keys: KeyboardManager, mouse: MouseManager): Move {
        for(let i = 0; i < dirKeys.length; i++) {
            if(keys.isKeyPressed(dirKeys[i].key)) {
                return dirKeys[i].dir;
            }
        }

        const mouseClick = mouse.tryGetClick(0);
        if(mouseClick !== undefined) {
            this.mouseTile = PixelToHex(HopliteProgram.scaleHelper.ScreenToPixel(mouseClick.position));

            if(HexLength(Point.subtract(this.mouseTile, state.player.position)) <= 1) {
                if(this.mouseTile.equals(state.player.position)) return 6;
                else return DirectionHelper.FromPoint(Point.subtract(this.mouseTile, state.player.position));
            }
        }

        return undefined;
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        state.draw(ctx);

        if(this.mouseTile !== undefined) {
            const tgt = HexToPixel(this.mouseTile);
            PlayerTurnGamePhase.cellHighlightSprite.draw(ctx, new Rect(tgt.x, tgt.y, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
        }
    }

}