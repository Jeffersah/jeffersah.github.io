import { SpriteAtlas } from "../../common/assets/SpriteAtlas";
import Point from "../../common/position/Point";
import FigherAI from "../ai/FighterAI";
import { parseShipDefinition, ShipDefinition } from "./ShipDefinition";
import jsonData from "../data/shipDefinitions.json";
import IJsonShipDefinition from "../data/IJsonShipDefinition";

export type ShipType = 'interceptor' | 'fighter';
export function buildAllDefinitions(sprites: SpriteAtlas, flares: SpriteAtlas): ShipDefinition[] {
    const json = <IJsonShipDefinition[]>jsonData;
    return json.map(def => 
        parseShipDefinition(def, sprites, flares)
    );
/*
    return {
        interceptor: [
            new ShipDefinition(sprites, 
                new Point(16, 16),
                new Point(64, 32),
                new Point(16, 16),
                new Point(0.5, 0.5),
                5, 1, 1, 6, 0.001, Math.PI / 128, 
                [],
                () => new FigherAI()),
            new ShipDefinition(sprites, 
                new Point(16, 16),
                new Point(64, 128),
                new Point(16, 16),
                new Point(0.5, 0.5),
                5, 1, 1, 6, 0.001, Math.PI / 128, 
                [],
                () => new FigherAI())
        ],
        fighter: [
            new ShipDefinition(sprites, 
                new Point(32, 32),
                new Point(64, 64),
                new Point(32, 32),
                new Point(0.5, 0.5),
                5, 0.1, 0.01, 8, 0.001, Math.PI / 64,
                [],
                () => new FigherAI()),
            new ShipDefinition(sprites, 
                new Point(32, 32),
                new Point(64, 160),
                new Point(32, 32),
                new Point(0.5, 0.5),
                5, 1, 1, 6, 0.001, Math.PI / 128,
                [],
                () => new FigherAI())
        ]
    };
    */
}