import Cell from './Cell';
import Rect from '../../common/position/Rectangle';
import Point from '../../common/position/Point';
import { Direction } from '../../common/position/Direction';
import { IterateRange } from '../../common/Iterate';
import * as Const from '../Constants';
import { createContext } from 'react';
import { ResizeCanvas } from '../../common/CanvasHelpers';

export default class World {
    cells: Cell[][];

    public prerender: HTMLCanvasElement;

    constructor(public width: number, public height: number, generateCell: () => Cell) {
        this.cells = [];
        for (let x = 0; x < width; x++) {
            const col = [];
            for (let y = 0; y < height; y++) {
                col.push(generateCell());
            }
            this.cells.push(col);
        }

        this.prerender = document.getElementById('world_prerender') as HTMLCanvasElement;
    }

    updatePrerender() {
        ResizeCanvas(this.prerender, Const.TILE_SIZE * this.width, Const.TILE_SIZE * this.height);
        const pctx = this.prerender.getContext('2d');
        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.cells[x][y].paint(pctx, x * Const.TILE_SIZE, y * Const.TILE_SIZE);
            }
        }
    }

    tryMoveEntity(pos: Rect, vel: Point, onChecked?: (x: number, y: number) => void): void {
        const xDirection = vel.x >= 0 ? Direction.Right : Direction.Left;
        const yDirection = vel.y >= 0 ? Direction.Down : Direction.Up;
        if (vel.x !== 0) {
            const startXTile = Math.floor(pos.edge(xDirection) / Const.TILE_SIZE);
            const endXTile = Math.floor((pos.edge(xDirection) + vel.x) / Const.TILE_SIZE);
            const startYTile = Math.floor(pos.edge(Direction.Up) / Const.TILE_SIZE);
            const endYTile = Math.floor((pos.edge(Direction.Down) - 1) / Const.TILE_SIZE);

            let xColision: number | undefined;
            IterateRange(startXTile, endXTile, (x, ctrl) => {
                for (let y = startYTile; y <= endYTile; y++) {
                    if (x < 0 || x >= this.width) {
                        xColision = x;
                        ctrl.break();
                        return;
                    }
                    if (onChecked) onChecked(x, y);
                    if (!this.cells[x][y].pathable) {
                        ctrl.break();
                        xColision = x;
                    }
                }
            });

            if (xColision === undefined) {
                pos.x += vel.x;
            } else {
                if (vel.x >= 0) pos.x = xColision * Const.TILE_SIZE - pos.w;
                else pos.x = (xColision + 1) * Const.TILE_SIZE;
            }
        }
        if (vel.y !== 0) {
            const startYTile = Math.floor(pos.edge(yDirection) / Const.TILE_SIZE);
            const endYTile = Math.floor((pos.edge(yDirection) + vel.y) / Const.TILE_SIZE);
            const startXTile = Math.floor(pos.edge(Direction.Left) / Const.TILE_SIZE);
            const endXTile = Math.floor((pos.edge(Direction.Right) - 1) / Const.TILE_SIZE);

            let yColision: number | undefined;
            IterateRange(startYTile, endYTile, (y, ctrl) => {
                for (let x = startXTile; x <= endXTile; x++) {
                    if (y < 0 || y >= this.height) {
                        yColision = y;
                        ctrl.break();
                        return;
                    }
                    if (onChecked) onChecked(x, y);
                    if (!this.cells[x][y].pathable) {
                        ctrl.break();
                        yColision = y;
                    }
                }
            });

            if (yColision === undefined) {
                pos.y += vel.y;
            } else {
                if (vel.y >= 0) pos.y = yColision * Const.TILE_SIZE - pos.h;
                else pos.y = (yColision + 1) * Const.TILE_SIZE;
            }
        }
    }
}