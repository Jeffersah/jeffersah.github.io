import IRenderable from "../common/rendering/IRenderable";
import GameState from "./GameState";

export default class Entity {
    isFlying: boolean;
    maxHp: number;
    hp: number;

    constructor(protected renderable: IRenderable) {

    }
    
    getRenderable(): IRenderable {
        return this.renderable;
    }
    
    TakeDamage(dmg: number) {

    }

    tick(state: GameState) {

    }
}