import { AtlasSprite, SpriteAtlas } from "../../common/assets/SpriteAtlas";
import Point from "../../common/position/Point";
import FigherAI from "../ai/FighterAI";
import { IShipAI } from "../ai/IShipAI";
import IJsonShipDefinition from "../data/IJsonShipDefinition";
import { ETeam } from "../ETeam";
import { Ship } from "../Ship";
import { FlareDefinition } from "./FlareDefinition";

function jsonPoint(json: [number, number]):Point {
    return new Point(json[0], json[1]);
}

export function parseShipDefinition(def: IJsonShipDefinition, ships: SpriteAtlas, flares: SpriteAtlas): ShipDefinition {
    const parsedFlares: FlareDefinition[] = [];
    for(let i = 0; i < def.flares.length; i++)
    {
        const flare = def.flares[i];
        parsedFlares.push(new FlareDefinition(
            flares.getAnimation(
                jsonPoint(flare.animation.imgOffset),
                jsonPoint(flare.animation.frameSize),
                jsonPoint(flare.animation.origin),
                flare.animation.numFrames
            ),
            jsonPoint(flare.offset),
            flare.rotation,
            flare.condition,
            flare.minTrigger,
            flare.rotPerTurn
        ));
    }

    return new ShipDefinition(
        ships,
        jsonPoint(def.size),
        jsonPoint(def.imgOffset),
        jsonPoint(def.size),
        jsonPoint(def.origin),
        def.hp,
        def.maxAccel,
        def.maxDeccel,
        def.maxSpeed,
        def.turnAccel,
        def.maxTurnSpeed,
        parsedFlares,
        ()=>new FigherAI()
    );
}

export class ShipDefinition {
    sprite: AtlasSprite;
    
    constructor(
        atlas: SpriteAtlas, 
        public size: Point,
        srcPoint: Point,
        srcSize: Point,
        public origin: Point,
        public maxHp: number,
        public maxAccel: number,
        public maxDeccel: number,
        public maxSpeed: number,
        public turnAccel: number, // NOT CURRENTLY USED because it makes AI tough
        public maxTurnRate: number,
        public flares: FlareDefinition[],
        public buildAi: ()=>IShipAI) {
        this.sprite = atlas.getSprite(srcPoint, srcSize, origin)
    }

    buildShip(team: ETeam, position: Point, rotation?:number): Ship {
        return new Ship(this, position, rotation ?? 0, this.buildAi(), team);
    }
}
