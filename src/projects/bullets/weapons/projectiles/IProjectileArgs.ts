import { AtlasSprite } from "../../../common/assets/SpriteAtlas";

export type IProjectileArgs = IProjectileArgsCommon & ( { laser: ILaserArgs } | { bullet: IBulletArgs });

export interface IProjectileArgsCommon {
    spawnSprayAngle: number,
    damage: number,
    enableFriendlyFire?: boolean,
}

export interface ILaserArgs {
    width?: number;
    maxLength?: number;
    penetrates: boolean;
}

export interface IBulletArgs {
    colisWidth?: number;
    sprite: AtlasSprite;
}