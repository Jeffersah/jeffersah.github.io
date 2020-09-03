import IPiece from './IPiece';
import IPieceType from './IPieceType';
import Point3 from '../position/Point3';
import Rook from './DefaultPieces/Rook';
import Bishop from './DefaultPieces/Bishop';
import Knight from './DefaultPieces/Knight';
import Queen from './DefaultPieces/Queen';
import King from './DefaultPieces/King';
import Pawn from './DefaultPieces/Pawn';
import BishopPlus from './ExtendedPieces/BishopPlus';
import KnightCross from './ExtendedPieces/KnightCross';

export default class Board {
    pieces: (IPiece | undefined)[][][];
    highlights: boolean[][][];
    constructor(public size: number) {
        this.pieces = [];
        this.highlights = [];
        for (let z = 0; z < size; z++) {
            const plane = [];
            const hplane = [];
            for (let y = 0; y < size; y++) {
                const col = [];
                const hcol = [];
                for (let x = 0; x < size; x++) {
                    col.push(undefined);
                    hcol.push(false);
                }
                plane.push(col);
                hplane.push(hcol);
            }
            this.pieces.push(plane);
            this.highlights.push(hplane);
        }
    }

    isOnBoard(p: Point3) {
        return p.x >= 0 && p.y >= 0 && p.z >= 0 && p.x < this.size && p.y < this.size && p.z < this.size;
    }

    getPiece(p: Point3): IPiece | undefined {
        return this.pieces[p.x][p.y][p.z];
    }

    setPiece(p: Point3, value?: IPiece): void {
        this.pieces[p.x][p.y][p.z] = value;
    }

    clone() {
        const result = new Board(this.size);
        for (let z = 0; z < this.size; z++) {
            for (let y = 0; y < this.size; y++) {
                for (let x = 0; x < this.size; x++) {
                    result.pieces[x][y][z] = this.pieces[x][y][z];
                    result.highlights[x][y][z] = this.highlights[x][y][z];
                }
            }
        }
        return result;
    }

    cloneNoHighlight() {
        const result = new Board(this.size);
        for (let z = 0; z < this.size; z++) {
            for (let y = 0; y < this.size; y++) {
                for (let x = 0; x < this.size; x++) {
                    result.pieces[x][y][z] = this.pieces[x][y][z];
                }
            }
        }
        return result;
    }
}

export const defaultLayout: (undefined|IPieceType)[][] = [
    [undefined, undefined, undefined, undefined, undefined],
    [Rook, Knight, Queen, Knight, Rook],
    [Bishop, Bishop, King, Bishop, Bishop],
    [Rook, Knight, Queen, Knight, Rook],
    [undefined, undefined, undefined, undefined, undefined],
];

export const plusLayout: (undefined|IPieceType)[][] = [
    [Rook, Bishop, KnightCross, Bishop, Rook],
    [Bishop, Knight, Queen, Knight, Bishop],
    [Bishop, BishopPlus, King, BishopPlus, Bishop],
    [Bishop, Knight, Queen, Knight, Bishop],
    [Rook, Bishop, KnightCross, Bishop, Rook],
];

export function populateDefaultLayout(board: Board) {
    populateLayout(board, defaultLayout);
}

export function populateLayout(board: Board, layout: (undefined|IPieceType)[][]) {
    const layoutSize = layout.length;
    if (board.size < layoutSize) throw new Error('Board too small');
    for (let dx = 0; dx < layout.length; dx++) {
        for (let dy = 0; dy < layout[dx].length; dy++) {
            if (layout[dx][dy] === undefined) continue;
            board.pieces[dx][dy][0] = { team: 'white', type: layout[dx][dy] };
            board.pieces[dx][dy][1] = { team: 'white', type: Pawn };
            board.pieces[dx][dy][board.size - 2] = { team: 'black', type: Pawn };
            board.pieces[dx][dy][board.size - 1] = { team: 'black', type: layout[dx][dy] };
        }
    }
}