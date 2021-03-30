import { AtlasSprite, SpriteAtlas } from "../../common/assets/SpriteAtlas";
import Point from "../../common/position/Point";
import FigherAI from "../ai/FighterAI";
import { IShipAI } from "../ai/IShipAI";
import IJsonShipDefinition from "../data/IJsonShipDefinition";
import { ETeam } from "../ETeam";
import { Ship } from "../Ship";
import { Weapon } from "../weapons/Weapon";
import { IWeaponGroupArgs, WeaponGroup } from "../weapons/WeaponGroup";
import { WeaponTimer } from "../weapons/WeaponTimer";
import { FlareDefinition } from "./FlareDefinition";

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
        public weapons: IWeaponGroupArgs[],
        public buildAi: ()=>IShipAI) {
        this.sprite = atlas.getSprite(srcPoint, srcSize, origin)
    }

    buildShip(team: ETeam, position: Point, rotation?:number): Ship {
        return new Ship(
            this,
            position,
            rotation ?? 0,
            this.buildAi(),
            team,
            this.weapons.map(
                jsonWeaponGroup => new WeaponGroup(
                    new WeaponTimer(jsonWeaponGroup.timer),
                    jsonWeaponGroup.weapons.map(w => new Weapon(w, this)),
                    jsonWeaponGroup.burstAll
                )
            )
        );
    }
}
