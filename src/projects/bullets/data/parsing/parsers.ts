import { AtlasSprite, SpriteAtlas } from "../../../common/assets/SpriteAtlas";
import INamedCollection from "../../../common/INamedCollection";
import Point from "../../../common/position/Point";
import { Range } from '../../../common/Range';
import { IJsonAnimationDefinition, IJsonSpriteDefinition } from "../IJsonShipDefinition";

export function parseJsonPoint(jpt: [number, number]) {
    return new Point(jpt[0], jpt[1]);
}

export function parseJsonRange(jpt: [number, number]) {
    return new Range(jpt[0], jpt[1]);
}

export function parseJsonAngle(input: number) {
    return input * Math.PI * 2;
}

export function parseJsonSprite(input: IJsonSpriteDefinition, atlases: INamedCollection<SpriteAtlas>) {
    return new AtlasSprite(atlases[input.file], parseJsonPoint(input.srcOffset), parseJsonPoint(input.srcSize), parseJsonPoint(input.origin), 0);
}

export function parseJsonAnimation( anim: IJsonAnimationDefinition, atlases: INamedCollection<SpriteAtlas>){
    return atlases[anim.file].getAnimation(
        parseJsonPoint(anim.imgOffset),
        parseJsonPoint(anim.frameSize),
        parseJsonPoint(anim.origin),
        anim.numFrames
    );
}