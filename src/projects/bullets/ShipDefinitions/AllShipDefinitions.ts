import { AtlasSprite, SpriteAtlas } from "../../common/assets/SpriteAtlas";
import Point from "../../common/position/Point";
import FigherAI from "../ai/FighterAI";
import { ShipDefinition } from "./ShipDefinition";
import IShipDefinitionsFile, { IJsonShipDefinition, IJsonAnimationDefinition } from "../data/IJsonShipDefinition";
import { SpriteAnimation } from "../../common/assets/SpriteAnimation";
import { FlareDefinition } from "./FlareDefinition";
import { AllAIGenerators } from "../ai/IShipAI";
import { IWeaponArgs } from "../weapons/Weapon";
import { IWeaponGroupArgs } from "../weapons/WeaponGroup";
import INamedCollection from "../../common/INamedCollection";
import { parseJsonAngle, parseJsonAnimation, parseJsonPoint } from "../data/parsing/parsers";
import { IJsonWeapon, IJsonWeaponGroup, IJsonWeaponReference, IJsonWeaponStats } from "../data/IJsonWeapon";
import { parseWeaponGroupDefinition } from "../data/parsing/weapons";

export function buildAllDefinitions(json: IShipDefinitionsFile, imgAtlases: INamedCollection<SpriteAtlas>): ShipDefinition[] {
    const animationData: { [key:string]: SpriteAnimation } = <any>{};
    for(let key in json.animations) {
        animationData[key] = parseJsonAnimation(json.animations[key], imgAtlases);
    }
    return json.ships.map(def => 
        parseShipDefinition(def, animationData, imgAtlases)
    );
}

function parseShipDefinition(def: IJsonShipDefinition, anims: { [key:string]: SpriteAnimation }, imgAtlases: INamedCollection<SpriteAtlas>): ShipDefinition {
    const parsedFlares: FlareDefinition[] = [];
    for(let i = 0; i < def.flares.length; i++)
    {
        const flare = def.flares[i];
        const animation = typeof(flare.animation) === 'string' ? anims[flare.animation] : parseJsonAnimation(flare.animation, imgAtlases);

        parsedFlares.push(new FlareDefinition(
            animation,
            parseJsonPoint(flare.offset),
            parseJsonAngle(flare.rotation),
            flare.condition,
            flare.minTrigger,
            flare.rotPerTurn
        ));
    }

    const aiFunc = AllAIGenerators[def.ai];
    const aiGen = () => aiFunc(def.aiParams);

    return new ShipDefinition(
        imgAtlases[def.sprite.file],
        parseJsonPoint(def.size),
        parseJsonPoint(def.sprite.srcOffset),
        parseJsonPoint(def.sprite.srcSize),
        parseJsonPoint(def.sprite.origin),
        def.hp,
        def.maxAccel,
        def.maxDeccel,
        def.maxSpeed,
        def.turnAccel,
        def.maxTurnSpeed,
        parsedFlares,
        def.weaponGroups.map(group => 
            parseWeaponGroupDefinition(group, def.weaponDefinitions ?? {}, imgAtlases)),
        aiGen
    );
}