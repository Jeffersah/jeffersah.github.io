import { EFlareConditions } from "../ShipDefinitions/FlareDefinition";

export default interface IJsonShipDefinition {
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
    ai: string
}

export interface IJsonFlareDefinition {
    animation: IJsonFlareAnimationDefinition,
    offset: [number, number],
    rotation: number,
    condition: EFlareConditions | EFlareConditions[],
    minTrigger?: number,
    rotPerTurn?: number
}

export interface IJsonFlareAnimationDefinition {
    imgOffset: [number, number];
    frameSize: [number, number];
    numFrames: number;
    origin: [number, number];
}