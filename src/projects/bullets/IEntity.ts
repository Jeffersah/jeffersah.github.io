import KeyboardManager from "../common/input/KeyboardManager";
import { ETeam } from "./ETeam";
import GameState from "./GameState";

export default interface IEntity {
    
    tick(keys: KeyboardManager, gameState: GameState): void;
    render(ctx: CanvasRenderingContext2D): void;

    getTeam(): ETeam;
}