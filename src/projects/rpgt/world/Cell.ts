import { IGraphic } from '../IGraphic';
import * as Const from '../Constants';
import { SpriteSheet } from '../../common/assets/SpriteSheet';
import SheetGraphic from '../SheetGraphic';

const GRASS_TILES: [number, number][] =
[
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [10, 0],
    [7, 1],
    [7, 1],
    [10, 1],
    [10, 2],
    [9, 2]
];

export default class Cell {
    constructor(public pathable: boolean, public graphic: IGraphic) {

    }

    paint(ctx: CanvasRenderingContext2D, tx: number, ty: number) {
        this.graphic.paint(ctx, tx, ty, Const.TILE_SIZE, Const.TILE_SIZE);
    }

    static GrassFloor(sheet: SpriteSheet): Cell {
        const grassCoords = GRASS_TILES[Math.floor(Math.random() * GRASS_TILES.length)];
        return new Cell(true, new SheetGraphic(sheet, grassCoords[0], grassCoords[1]));
    }

    static RockWall(sheet: SpriteSheet): Cell {
        return new Cell(false, new SheetGraphic(sheet, 7, 24));
    }
}