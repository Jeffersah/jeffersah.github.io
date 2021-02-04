import KeyboardManager from "../common/input/KeyboardManager";
import { ETeam } from "./ETeam";
import GameState from "./GameState";

export default interface IEntity {
    
    /**
     * Update an entity
     * @returns whether this entity is still alive
     */
    tick(keys: KeyboardManager, gameState: GameState): boolean;
    render(ctx: CanvasRenderingContext2D): void;

    getTeam(): ETeam;
}