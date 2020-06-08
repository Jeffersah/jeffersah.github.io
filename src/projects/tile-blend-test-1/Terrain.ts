import { Direction, cardinalDirections, diagonalDirections, ToPoint, allDirections } from '../common/position/Direction';

export enum TileType {
    Rock,
    Lava
}

export class Terrain {
    private tiles: TileType[];
    private subTileIds: number[];

    constructor(public tilesWide: number, public tilesHigh: number) {
        this.tiles = new Array(tilesHigh * tilesWide);
        for (let x = 0; x < tilesWide * tilesHigh; x++) {
            this.tiles[x] = TileType.Rock;
        }

        this.subTileIds = new Array(tilesHigh * tilesWide * 4);
        for (let x = 0; x < tilesWide * tilesHigh * 4; x++) {
            this.subTileIds[x] = 0;
        }

        for (let x = 0; x < tilesWide; x++) {
            for (let y = 0; y < tilesHigh; y++) {
                this.updateTile(x, y);
            }
        }
    }

    private fixCoords(x: number, y: number) {
        return x + y * this.tilesWide;
    }

    private fixSubCoords(x: number, y: number, d: Direction) {
        return x * 4 + (y * this.tilesWide * 4) + ((d - Direction.UpRight) / 2);
    }

    public getTile(x: number, y: number): TileType {
        if (x < 0 || y < 0 || x >= this.tilesWide || y >= this.tilesWide) return TileType.Lava;
        const coords = this.fixCoords(x, y);
        return this.tiles[this.fixCoords(x, y)];
    }

    public getSubTileId(x: number, y: number, d: Direction) {
        if (x < 0 || y < 0 || x >= this.tilesWide || y >= this.tilesWide) return 0;
        const coords = this.fixSubCoords(x, y, d);
        return this.subTileIds[coords];
    }

    public setTile(x: number, y: number, t: TileType) {
        if (x < 0 || y < 0 || x >= this.tilesWide || y >= this.tilesWide) return;
        const coords = this.fixCoords(x, y);
        if (this.tiles[coords] === t) return;

        this.tiles[coords] = t;
        this.updateSelfAndAdjacent(x, y);
    }

    private updateSelfAndAdjacent(tx: number, ty: number) {
        for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
                this.updateTile(tx + dx, ty + dy);
            }
        }
    }

    private updateTile(tx: number, ty: number): void {
        if (tx < 0 || ty < 0 || tx >= this.tilesWide || ty >= this.tilesWide) return;
        const tid = this.fixCoords(tx, ty);
        const type = this.tiles[tid];

        let adjacency = 0x00;
        allDirections.forEach((dir, i) => {
            const adjMask = 1 << i;
            const pt = ToPoint(dir);
            if (this.getTile(pt.x + tx, pt.y + ty) !== type) {
                adjacency |= adjMask;
            }
        });

        // adjacency now contains a bitmask of (adjacent=different) where
        // b[0] == T diff, b[1] = TR diff, b[2] = R diff, etc...
        // Therefore, bits [0..2] are the TopRight id,
        // bits [2..4] are the BottomRight id,
        // bits [4..6] are the BottomLeft id,
        // bits [6, 7, 0] are the TopLeft id

        this.subTileIds[this.fixSubCoords(tx, ty, Direction.UpRight)] = adjacency & 0b111;
        this.subTileIds[this.fixSubCoords(tx, ty, Direction.DownRight)] = (adjacency >> 2) & 0b111;
        this.subTileIds[this.fixSubCoords(tx, ty, Direction.DownLeft)] = (adjacency >> 4) & 0b111;
        this.subTileIds[this.fixSubCoords(tx, ty, Direction.UpLeft)] = (adjacency >> 6) | ((adjacency & 1) << 2) & 0b111;
    }
}