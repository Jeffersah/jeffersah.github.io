export interface IAssetSheet {
    [key: string]: ISpriteAsset | IAnimationAsset;
}

export interface ISpriteAsset {
    file: string,
    
    origin?: [number, number],

    units?: 'tiles' | 'pixels',
    pos: [number, number],
    size?: [number, number]
}

export interface IAnimationAsset {
    file: string,
    pos: [number, number],
    numFrames: number,
    duration: number,
    units?: 'tiles' | 'pixels',
    size?: [number, number]
    origin?: [number, number],
    loop?: boolean
}

export function IsAnimationAsset(asset: ISpriteAsset | IAnimationAsset): asset is IAnimationAsset {
    return (asset as any).numFrames !== undefined;
}