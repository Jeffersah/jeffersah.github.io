import IRenderable from "../../common/rendering/IRenderable";
import Assets from "../assets";
import Player from "../entities/Player";
import GameState from "../GameState";
import PlayerWeapon from "../weapons/PlayerWeapon";
import ISaleItem from "./ISaleItem";

export default class FullHealItem implements ISaleItem {
    
    name: string;
    description: string;
    icon: IRenderable;

    constructor(public price: number, assets: Assets) 
    {
        this.name = 'HP + 1';
        this.description = 'Heal to full health, and increase your max HP by 1';
        this.icon = assets.getAsset('shop_heart+1_icon').getRenderable();
    }

    onBuy(state: GameState, player: Player): void {
        player.maxHp ++;
        player.hp = player.maxHp;
    }
}