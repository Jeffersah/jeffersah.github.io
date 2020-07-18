export default interface ITileset {
    [key: string]: ITileDefinition[];
}

export interface ITileDefinition {
    id: number;
    name: string;
    pathable: boolean;
    graphics: TileGraphicDefinition;
}

export type TileGraphicDefinition = IFixedTileGraphic | IWeightedRandomTileGraphic;

export interface IFixedTileGraphic {
    type: 'fixed';
    x: number;
    y: number;
}

export interface IWeightedRandomTileGraphic {
    type: 'weight_random';
    options: { x: number, y: number, w: number }[];
}

export interface IAdjacencyTileGraphic {
    type: 'adjacency';
    conditions: { [key: string]: TileGraphicDefinition };
}