import { IWeaponTimingArgs } from "../weapons/WeaponTimer";
import { IJsonSpriteDefinition } from "./IJsonShipDefinition";

export interface IJsonWeaponGroup {
    timer: IWeaponTimingArgs,
    weapons: (IJsonWeapon | IJsonWeaponReference)[],
    burstAll?: boolean
}

export type IJsonWeaponReference = IJsonWeaponAnchor & {
    definition: string,
}

export type IJsonWeapon = IJsonWeaponAnchor & IJsonWeaponStats;

export interface IJsonWeaponAnchor {
    offset: [number, number],
    rotation: number
}

export interface IJsonWeaponStats {
    sprite?: IJsonSpriteDefinition,

    turret?: {
        maxAngle: number;
        turnRate: number;
    }

    acquisitionAngle: number;
    minRange?: number;
    range: number;
}