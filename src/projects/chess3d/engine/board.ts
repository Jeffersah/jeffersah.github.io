import Piece from './piece';

export class Board {
    private pieces: (Piece|undefined) [];
    constructor(public size: number) {
        this.pieces = new Array(size * size * size);
    }

    piece(x: number, y: number, z: number) {
        if (x < 0 || y < 0 || z < 0 || x >= this.size || y >= this.size || z >= this.size) {
            throw new Error('Out of range');
        }
        return this.pieces[this.getIndex(x, y, z)];
    }

    setPiece(x: number, y: number, z: number, p?: Piece) {
        if (x < 0 || y < 0 || z < 0 || x >= this.size || y >= this.size || z >= this.size) {
            throw new Error('Out of range');
        }
        this.pieces[this.getIndex(x, y, z)] = p;
    }

    getIndex(x: number, y: number, z: number): number {
        return x + y * this.size + z * this.size * this.size;
    }
}