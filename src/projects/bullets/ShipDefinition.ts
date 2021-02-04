import { AtlasSprite, SpriteAtlas } from "../common/assets/SpriteAtlas";
import Point from "../common/position/Point";
import { IShipAI } from "./ai/IShipAI";
import { ETeam } from "./ETeam";
import { Ship } from "./Ship";

export class ShipDefinition {
    sprite: AtlasSprite;
    origin: Point;
    
    constructor(
        atlas: SpriteAtlas, 
        public size: Point,
        srcPoint: Point,
        srcSize: Point,
        srcRot: number,
        origin: Point,
        public maxHp: number,
        public maxAccel: number,
        public maxDeccel: number,
        public maxSpeed: number,
        public turnAccel: number, // NOT CURRENTLY USED because it makes AI tough
        public maxTurnRate: number,
        public buildAi: ()=>IShipAI) {
        this.sprite = atlas.getSprite(srcPoint, srcSize, origin, srcRot)
    }

    buildShip(team: ETeam, position: Point, rotation?:number): Ship {
        return new Ship(this, position, rotation ?? 0, this.buildAi(), team);
    }
}
