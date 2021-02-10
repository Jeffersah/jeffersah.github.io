import { EFlareConditions } from "../ShipDefinitions/FlareDefinition";
import { IWeaponArgs } from "../weapons/Weapon";
import { IWeaponTimingArgs } from "../weapons/WeaponTimer";

export default interface IShipDefinitionsFile {
    animations: { 
        [key:string]: IJsonAnimationDefinition
    }
    ships: IJsonShipDefinition[]
}

export interface IJsonShipDefinition {
    name: string;
    size: [number, number];
    imgOffset: [number, number];
    origin: [number, number];
    hp: number,
    maxAccel: number,
    maxDeccel: number,
    maxSpeed: number,
    turnAccel: number,
    maxTurnSpeed: number,
    flares: IJsonFlareDefinition[],
    ai: string,
    aiParams?: { [key: string]: any }
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
    imgOffset: [number, number];
    frameSize: [number, number];
    numFrames: number;
    origin: [number, number];
}

export interface IJsonWeaponGroup {
    timer: IWeaponTimingArgs,
    weapons: IJsonWeapon[],
    burstAll?: boolean
}

export interface IJsonWeapon {
    offset: [number, number];
    sprite?: {
        imgOffset: [number, number];
        imgSize: [number, number];
        origin: [number, number];
    };
    rotation: number;

    turret?: {
        maxAngle: number;
        turnRate: number;
    }

    acquisitionAngle: number;
    minRange?: number;
    range: number;
}