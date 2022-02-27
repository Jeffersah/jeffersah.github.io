import Player from "../entities/Player";
import IRenderable from "../../common/rendering/IRenderable";
import GameState from "../GameState";

export default interface ISaleItem {
    name: string;
    price: number;
    description: string;
    icon: IRenderable;

    onBuy(state: GameState, player: Player): { replaceItem?: ISaleItem } | void;
}