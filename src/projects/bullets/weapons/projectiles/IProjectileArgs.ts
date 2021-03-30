import { PlayingAnimation, SpriteAnimation } from "../../../common/assets/SpriteAnimation";
import { AtlasSprite } from "../../../common/assets/SpriteAtlas";
import Point from "../../../common/position/Point";

export type IProjectileArgs = IProjectileArgsCommon & ( ILaserArgs | IBulletArgs );

export interface IProjectileArgsCommon {
    spawnSprayAngle: number,
    damage: number,
    enableFriendlyFire?: boolean,
    penetrates: boolean;
    lifetime: number;
}

export type RepeatMode = 'stretch' | 'tile';

export interface ILaserArgs {
    weaponType: 'laser';
    width?: number;
    maxLength?: number;
    render: string | {
        sprite: AtlasSprite | SpriteAnimation;
        repeatMode: RepeatMode;
        renderWidth?: number;
    },
}

export interface IBulletArgs {
    weaponType: 'bullet';
    colisSize: Point;
    colisionMode?: 'discrete' | 'continuous';
    sprite: AtlasSprite;
    moveSpeed: number;
    lifetime: number;
}