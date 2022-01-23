import KeyboardManager from "../../common/input/KeyboardManager";
import Point from "../../common/position/Point";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import IGamePhase from "./IGamePhase";
import PlayerMoveAnimPhase from "./PlayerMoveAnimPhase";

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
]

export default class PlayerTurnGamePhase implements IGamePhase {
    init(state: GameState): void {
        
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        const dir = this.tryGetDirection(keys);
        if(dir !== undefined) {
            const destination = Point.add(state.player.position, DirectionHelper.ToPoint(dir));

            if(!state.tiles.isInBounds(destination.x, destination.y))
                return this;
            if(!state.tiles.get(destination).isPathable)
                return this;
            if(state.entities.get(destination) !== null)
                return this;

            return new PlayerMoveAnimPhase(state.player.position, destination);
        }
        return this;
    }

    tryGetDirection(keys: KeyboardManager): Direction | undefined {
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