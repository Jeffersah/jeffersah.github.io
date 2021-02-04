import { SpriteAtlas } from "../common/assets/SpriteAtlas";
import Point from "../common/position/Point";
import FigherAI from "./ai/FighterAI";
import { ShipDefinition } from "./ShipDefinition";

export type ShipType = 'interceptor' | 'fighter';
export type AllDefinitions = {
    [key in ShipType]: [ShipDefinition, ShipDefinition]
}

export function buildAllDefinitions(sprites: SpriteAtlas): AllDefinitions {
    return {
        interceptor: [
            new ShipDefinition(sprites, 
                new Point(32, 32),
                new Point(32, 16),
                new Point(16, 16),
                Math.PI / 2,
                new Point(0.5, 0.5),
                5, 1, 1, 6, 0.001, Math.PI / 128, () => new FigherAI()),
            new ShipDefinition(sprites, 
                new Point(32, 32),
                new Point(128, 16),
                new Point(16, 16),
                Math.PI / 2,
                new Point(0.5, 0.5),
                5, 1, 1, 6, 0.001, Math.PI / 128, () => new FigherAI())
        ],
        fighter: [
            new ShipDefinition(sprites, 
                new Point(64, 64),
                new Point(64, 0),
                new Point(32, 32),
                Math.PI / 2,
                new Point(0.5, 0.5),
                5, 0.1, 0.01, 8, 0.001, Math.PI / 64, () => new FigherAI()),
            new ShipDefinition(sprites, 
                new Point(64, 64),
                new Point(160, 0),
                new Point(32, 32),
                Math.PI / 2,
                new Point(0.5, 0.5),
                5, 1, 1, 6, 0.001, Math.PI / 128, () => new FigherAI())
        ]
    };
}