import { AtlasSprite, SpriteAtlas } from "../../../common/assets/SpriteAtlas";
import INamedCollection from "../../../common/INamedCollection";
import { IWeaponArgs } from "../../weapons/Weapon";
import { IWeaponGroupArgs } from "../../weapons/WeaponGroup";
import { IJsonWeapon, IJsonWeaponGroup, IJsonWeaponReference, IJsonWeaponStats } from "../IJsonWeapon";
import { parseJsonPoint, parseJsonSprite } from "./parsers";

export function parseWeaponGroupDefinition(json: IJsonWeaponGroup, defs: INamedCollection<IJsonWeaponStats>, imgAtlases: INamedCollection<SpriteAtlas>): IWeaponGroupArgs {
    return {
        timer: json.timer,
        weapons: json.weapons.map(weaponJson => parseWeaponDefinition(weaponJson, defs, imgAtlases)),
        burstAll: json.burstAll
    }
}

function parseWeaponDefinition(json: (IJsonWeapon | IJsonWeaponReference), defs: INamedCollection<IJsonWeaponStats>, imgAtlases: INamedCollection<SpriteAtlas>) : IWeaponArgs{
    if(isWeapon(json)) {
        let sprite: AtlasSprite | undefined = undefined;
        if(json.sprite !== undefined) {
            sprite = parseJsonSprite(json.sprite, imgAtlases);
        }
        return {
            offset: parseJsonPoint(json.offset),
            sprite: sprite,
            rotation: json.rotation,
            turret: json.turret,
            acquisitionAngle: json.acquisitionAngle,
            minRange: json.minRange,
            range: json.range
        };
    }
    else {
        const def = defs[json.definition];
        if(def === undefined) {
            console.error("Weapon referenced def " + json.definition + " which could not be found");
        }
        let sprite: AtlasSprite | undefined = undefined;
        if(def.sprite !== undefined) {
            sprite = parseJsonSprite(def.sprite, imgAtlases);
        }
        return {
            offset: parseJsonPoint(json.offset),
            sprite: sprite,
            rotation: json.rotation,
            turret: def.turret,
            acquisitionAngle: def.acquisitionAngle,
            minRange: def.minRange,
            range: def.range
        };
    }
}

function isWeapon(json: IJsonWeapon | IJsonWeaponReference): json is IJsonWeapon {
    return (<any>json).range !== undefined;
}