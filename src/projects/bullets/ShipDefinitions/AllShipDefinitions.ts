import { AtlasSprite, SpriteAtlas } from "../../common/assets/SpriteAtlas";
import Point from "../../common/position/Point";
import FigherAI from "../ai/FighterAI";
import { ShipDefinition } from "./ShipDefinition";
import IShipDefinitionsFile, { IJsonShipDefinition, IJsonAnimationDefinition, IJsonWeaponGroup, IJsonWeapon } from "../data/IJsonShipDefinition";
import { SpriteAnimation } from "../../common/assets/SpriteAnimation";
import { FlareDefinition } from "./FlareDefinition";
import { AllAIGenerators } from "../ai/IShipAI";
import { IWeaponArgs } from "../weapons/Weapon";
import { IWeaponGroupArgs } from "../weapons/WeaponGroup";

export function buildAllDefinitions(json: IShipDefinitionsFile, sprites: SpriteAtlas, flares: SpriteAtlas): ShipDefinition[] {
    const animationData: { [key:string]: SpriteAnimation } = <any>{};
    for(let key in json.animations) {
        animationData[key] = parseAnimation(flares, json.animations[key]);
    }
    return json.ships.map(def => 
        parseShipDefinition(def, animationData, sprites, flares)
    );
}

function jsonPoint(json: [number, number]):Point {
    return new Point(json[0], json[1]);
}

function parseAnimation(flares: SpriteAtlas, anim: IJsonAnimationDefinition){
    return flares.getAnimation(
        jsonPoint(anim.imgOffset),
        jsonPoint(anim.frameSize),
        jsonPoint(anim.origin),
        anim.numFrames
    );
}

function parseWeaponGroupDefinition(weaponAtlas: SpriteAtlas, json: IJsonWeaponGroup): IWeaponGroupArgs {
    return {
        timer: json.timer,
        weapons: json.weapons.map(weaponJson => parseWeaponDefinition(weaponAtlas, weaponJson)),
        burstAll: json.burstAll
    }
}

function parseWeaponDefinition(weaponAtlas: SpriteAtlas, json: IJsonWeapon) : IWeaponArgs{
    let sprite: AtlasSprite | undefined = undefined;
    if(json.sprite !== undefined) {
        sprite = weaponAtlas.getSprite(
            jsonPoint(json.sprite.imgOffset),
            jsonPoint(json.sprite.imgSize),
            jsonPoint(json.sprite.origin)
        );
    }
    return {
        offset: jsonPoint(json.offset),
        sprite: sprite,
        rotation: json.rotation,
        turret: json.turret,
        acquisitionAngle: json.acquisitionAngle,
        minRange: json.minRange,
        range: json.range
    };
}

function parseShipDefinition(def: IJsonShipDefinition, anims: { [key:string]: SpriteAnimation }, ships: SpriteAtlas, flares: SpriteAtlas): ShipDefinition {
    const parsedFlares: FlareDefinition[] = [];
    for(let i = 0; i < def.flares.length; i++)
    {
        const flare = def.flares[i];
        const animation = typeof(flare.animation) === 'string' ? anims[flare.animation] : parseAnimation(flares, flare.animation);

        parsedFlares.push(new FlareDefinition(
            animation,
            jsonPoint(flare.offset),
            flare.rotation,
            flare.condition,
            flare.minTrigger,
            flare.rotPerTurn
        ));
    }

    const aiFunc = AllAIGenerators[def.ai];
    const aiGen = () => aiFunc(def.aiParams);

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
        def.weaponGroups.map(group => 
            parseWeaponGroupDefinition(flares, group)),
        aiGen
    );
}