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
        this.icon = weapon.iconImage;
    }

    onBuy(state: GameState, player: Player): void {
        if(this.weapon.type === 'primary') player.primary = this.weapon;
        else player.secondary = this.weapon;
    }
}