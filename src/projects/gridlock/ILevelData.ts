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
    endpoints: IJsonEndpointDefinition[];
}

export interface IJsonSpawnDefinition {
    position: {x: number, y: number};
    direction: ETileAnchor;
    color: ECarColor;
}

export interface IJsonEndpointDefinition {
    position: {x: number, y: number};
    color: ECarColor;
}