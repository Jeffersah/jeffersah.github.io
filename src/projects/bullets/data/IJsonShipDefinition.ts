import INamedCollection from "../../common/INamedCollection";
import { EFlareConditions } from "../ShipDefinitions/FlareDefinition";
import { IWeaponArgs } from "../weapons/Weapon";
import { IWeaponTimingArgs } from "../weapons/WeaponTimer";
import { IJsonWeaponGroup, IJsonWeaponStats } from "./IJsonWeapon";

export default interface IShipDefinitionsFile {
    animations: { 
        [key:string]: IJsonAnimationDefinition
    }
    ships: IJsonShipDefinition[]
}

export interface IJsonShipDefinition {
    name: string;
    size: [number, number];
    sprite: IJsonSpriteDefinition;
    hp: number,
    maxAccel: number,
    maxDeccel: number,
    maxSpeed: number,
    turnAccel: number,
    maxTurnSpeed: number,
    flares: IJsonFlareDefinition[],
    ai: string,
    aiParams?: { [key: string]: any },
    weaponDefinitions?: INamedCollection<IJsonWeaponStats>;
    weaponGroups: IJsonWeaponGroup[]
}

export interface IJsonFlareDefinition {
    animation: string | IJsonAnimationDefinition,
    offset: [number, number],
    rotation: number,
    condition: EFlareConditions | EFlareConditions[],
    minTrigger?: number,
    rotPerTurn?: number
}

export interface IJsonAnimationDefinition {
    file: string;
    imgOffset: [number, number];
    frameSize: [number, number];
    numFrames: number;
    origin: [number, number];
}

export interface IJsonSpriteDefinition {
    file: string;
    srcOffset: [number, number];
    srcSize: [number, number];
    origin: [number, number];
}
