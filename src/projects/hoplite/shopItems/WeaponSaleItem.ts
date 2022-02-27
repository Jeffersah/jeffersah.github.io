import IRenderable from "../../common/rendering/IRenderable";
import Player from "../entities/Player";
import GameState from "../GameState";
import PlayerWeapon from "../weapons/PlayerWeapon";
import ISaleItem from "./ISaleItem";

export default class WeaponSaleItem implements ISaleItem {
    
    name: string;
    description: string;
    icon: IRenderable;

    constructor(public weapon: PlayerWeapon, public price: number) 
    {
        this.name = weapon.name;
        this.description = weapon.description;
        this.icon = weapon.shopImage;
    }

    onBuy(state: GameState, player: Player): { replaceItem?: ISaleItem }  {
        if(this.weapon.type === 'primary') {
            const oldPrimary = player.primary;
            player.primary = this.weapon;
            return { replaceItem: new WeaponSaleItem(oldPrimary, 0) };
        }
        else { 
            const oldSecondary = player.secondary;
            player.secondary = this.weapon;
            return { replaceItem: new WeaponSaleItem(oldSecondary, 0) };
        }
    }
}