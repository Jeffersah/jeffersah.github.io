import { ECardinalDirection } from "../common/position/Direction";
import ECarColor from "./ECarColor";
import ETileAnchor from "./ETileAnchor";

export default interface ILevelData {
    id: number;
    name: string;
    width: number;
    height: number;
    mapdata: number[];
    spawns: IJsonSpawnDefinition[];
    endpoints: [];
}

export type IJsonSpawnDefinition = IJsonGraySpawnDefinition | IJsonColorSpawnDefinition

export interface IJsonGraySpawnDefinition {
    position: {x: number, y: number};
    direction: ETileAnchor;
    color: ECarColor.Gray;
    ai: string;
}

export interface IJsonColorSpawnDefinition {
    position: {x: number, y: number};
    color: ECarColor;
}