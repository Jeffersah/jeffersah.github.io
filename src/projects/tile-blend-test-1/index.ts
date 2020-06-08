import AssetLoader from '../common/assets/AssetLoader';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import { ResizeCanvas, NearestNeighborScaling } from '../common/CanvasHelpers';
import blendTilesUrl from '../common-assets/RockLavaAllBlends_crop.png';
import seletorsUrl from '../common-assets/Selectors16x16.png';
import { Terrain, TileType } from './Terrain';
import { Direction, ToPoint } from '../common/position/Direction';
import Point from '../common/position/Point';

let tiles: SpriteSheet;
let selectors: SpriteSheet;
let pvMousePos: Point | undefined;
let terrain: Terrain;
let context: CanvasRenderingContext2D;

const SCALE_FACTOR = 3;


function Run() {
    const assetLoader = new AssetLoader();
    tiles = new SpriteSheet(8, 8, blendTilesUrl, assetLoader.registerAssetLoadCallback());
    selectors = new SpriteSheet(16, 16, seletorsUrl, assetLoader.registerAssetLoadCallback());
    pvMousePos = undefined;

    assetLoader.onAllFinished(assetLoadDone);
}

function assetLoadDone() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    terrain = new Terrain(20, 20);

    ResizeCanvas(canvas, terrain.tilesWide * 16 * SCALE_FACTOR, terrain.tilesHigh * 16 * SCALE_FACTOR);
    context = canvas.getContext('2d');
    NearestNeighborScaling(context);

    RenderTerrain(context, terrain, tiles);

    canvas.addEventListener('mousemove', onMouseMove);
    canvas.addEventListener('mouseleave', onMouseLeave);
    canvas.addEventListener('mousedown', onMouseClick);
}

function RenderTerrain(ctx: CanvasRenderingContext2D, terr: Terrain, sprites: SpriteSheet) {
    for (let x = 0; x < terr.tilesWide; x++) {
        for (let y = 0; y < terr.tilesHigh; y++) {
            RenderTerrainCell(ctx, terr, sprites, x, y);
        }
    }
}
function RenderTerrainCell(ctx: CanvasRenderingContext2D, terr: Terrain, sprites: SpriteSheet, x: number, y: number) {
    for (let d = 0; d < 4; d++) {
        const dir = Direction.UpRight + (d * 2);
        const spriteSheetX = terr.getSubTileId(x, y, dir);
        let spriteSheetY = d;
        if (terr.getTile(x, y) === TileType.Lava) spriteSheetY += 4;

        const rtx = x * 16 + (ToPoint(dir).x === 1 ? 8 : 0);
        const rty = y * 16 + (ToPoint(dir).y === 1 ? 8 : 0);
        sprites.render(ctx, rtx * SCALE_FACTOR, rty * SCALE_FACTOR, 8 * SCALE_FACTOR, 8 * SCALE_FACTOR,
            spriteSheetX, spriteSheetY);
    }
}

function onMouseMove(ev: MouseEvent) {
    const mouseCoords = new Point(Math.floor(ev.offsetX / (16 * SCALE_FACTOR)), Math.floor(ev.offsetY / (16 * SCALE_FACTOR)));
    if (pvMousePos !== undefined) {
        if (!mouseCoords.Equals(pvMousePos)) {
            RenderTerrainCell(context, terrain, tiles, pvMousePos.x, pvMousePos.y);
            selectors.render(context, mouseCoords.x * 16 * SCALE_FACTOR, mouseCoords.y * 16 * SCALE_FACTOR, 16 * SCALE_FACTOR, 16 * SCALE_FACTOR,
                1, 0);
            pvMousePos = mouseCoords;
        }
    }
    else {
        selectors.render(context, mouseCoords.x * 16 * SCALE_FACTOR, mouseCoords.y * 16 * SCALE_FACTOR, 16 * SCALE_FACTOR, 16 * SCALE_FACTOR,
            1, 0);
        pvMousePos = mouseCoords;
    }
}

function onMouseLeave(ev: MouseEvent) {
    if (pvMousePos !== undefined) {
        pvMousePos = undefined;
    }
}

function onMouseClick(ev: MouseEvent) {
    const mouseCoords = new Point(Math.floor(ev.offsetX / (16 * SCALE_FACTOR)), Math.floor(ev.offsetY / (16 * SCALE_FACTOR)));
    const tile = terrain.getTile(mouseCoords.x, mouseCoords.y);
    terrain.setTile(mouseCoords.x, mouseCoords.y, tile === TileType.Lava ? TileType.Rock : TileType.Lava);

    for (let dx = -1; dx <= 1; dx ++) {
        for (let dy = -1; dy <= 1; dy++) {
            RenderTerrainCell(context, terrain, tiles, pvMousePos.x + dx, pvMousePos.y + dy);
        }
    }

    selectors.render(context, mouseCoords.x * 16 * SCALE_FACTOR, mouseCoords.y * 16 * SCALE_FACTOR, 16 * SCALE_FACTOR, 16 * SCALE_FACTOR,
        1, 0);
}

export default Run;