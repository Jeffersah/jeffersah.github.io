import Point from "../common/position/Point";
import Assets from "./Assets";
import HexCell, { Floor, Lava } from "./HexCell";

export default class HexWorld {

    cells: HexCell[][] = [];

    constructor(public size: number) {
        let midRowLength = size*2 - 1;
        for(let dy = -size+1; dy <= size-1; dy++){
            let row: HexCell[] = [];
            for(let dx = 0; dx < midRowLength - Math.abs(dy); dx++){
                let cell = new Floor();
                row.push(cell);
            }
            this.cells.push(row);
        }

        for(let dy = -size+1; dy <= size-1; dy++) {
            const row = this.size - 1 + dy;
            const rowLength = this.size * 2 - 1 - Math.abs(dy);
            const firstX = -Math.min(row, this.size - 1);
            for(let dx = 0; dx < rowLength; dx++) {
                let [x, y] = this.coordsToArray(dx + firstX, dy);
                let cell = this.cells[y][x];
                cell.AfterWorldLoad(this, new Point(dx + firstX, dy));
            }
        }
    }

    public draw(ctx: CanvasRenderingContext2D, assets: Assets) {
        for(let dy = -this.size+1; dy <= this.size-1; dy++) {
            const row = this.size - 1 + dy;
            const rowLength = this.size * 2 - 1 - Math.abs(dy);
            const firstX = -Math.min(row, this.size - 1);
            for(let dx = 0; dx < rowLength; dx++) {
                let [x, y] = this.coordsToArray(dx + firstX, dy);
                let cell = this.cells[y][x];

                cell.Draw(ctx, assets, this, new Point(dx + firstX, dy));
            }
        }
    }

    private coordsToArray(x: number, y: number): [number, number] {
        const row = this.size - 1 + y;
        const rowLength = this.size * 2 - 1 - Math.abs(y);
        const firstX = -Math.min(row, this.size - 1);
        const dx = x - firstX;

        return [dx, row];
    }
}