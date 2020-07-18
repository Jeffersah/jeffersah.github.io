export interface ISymbolDefinition {
    SpriteStartXCoord: number;
    SpriteEndXCoord: number;
}

export const fullHealth: ISymbolDefinition = {
    SpriteStartXCoord: 0,
    SpriteEndXCoord: 1
};

export const partHealth: ISymbolDefinition = {
    SpriteStartXCoord: 2,
    SpriteEndXCoord: 3
};

export const critHealth: ISymbolDefinition = {
    SpriteStartXCoord: 4,
    SpriteEndXCoord: 5
};

export const armor: ISymbolDefinition = {
    SpriteStartXCoord: 6,
    SpriteEndXCoord: 9
};