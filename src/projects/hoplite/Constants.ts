import Point from "../common/position/Point";

export const TILE_WIDTH = 32;
export const TILE_HEIGHT = 32;
export const PIX_PER_CELL_X = 32;
export const PIX_PER_CELL_Y = new Point(16, 24);

export const TILE_SIZE = new Point(TILE_WIDTH, TILE_HEIGHT);
export const HALF_TILE_SIZE = new Point(TILE_WIDTH / 2, TILE_HEIGHT / 2);

export const MAP_SIZE = 7;
export const MAP_PIXEL_SIZE = (MAP_SIZE*2 - 1)*PIX_PER_CELL_X;

export const MAP_CENTER_POSITION = new Point(MAP_PIXEL_SIZE/2 - TILE_WIDTH / 2, MAP_PIXEL_SIZE/2 - TILE_HEIGHT / 2);

export const PLAYER_START_POSITION = new Point(-2, 4);