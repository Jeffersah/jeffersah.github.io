import KeyboardManager from "../../common/input/KeyboardManager";
import Point from "../../common/position/Point";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import IGamePhase from "./IGamePhase";
import PlayerMoveAnimPhase from "./PlayerMoveAnimPhase";

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
    init(state: GameState): void {
        
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        const dir = this.tryGetDirection(keys);
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

    tryGetDirection(keys: KeyboardManager): Move {
        for(let i = 0; i < dirKeys.length; i++) {
            if(keys.isKeyPressed(dirKeys[i].key)) {
                return dirKeys[i].dir;
            }
        }
        return undefined;
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        state.draw(ctx);
    }

}