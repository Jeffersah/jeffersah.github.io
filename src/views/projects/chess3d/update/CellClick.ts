import Update from './Update';
import Point3 from '../position/Point3';
import { IState } from '../models/State';
import { board } from '../css/singleBoard.css';

export default function CellClick(point?: Point3): Update {
    return (s: IState) => {
        if (s.selected === undefined || !s.board.highlights[point.x][point.y][point.z]) {
            const p = s.board.getPiece(point);
            const resultBoard = s.board.cloneNoHighlight();
            const moves = p === undefined ? [] : s.board.getPiece(point).type.getMoves(s.board, point);
            for (let x = 0; x < s.board.size; x++) {
                for (let y = 0; y < s.board.size; y++) {
                    for (let z = 0; z < s.board.size; z++) {
                        resultBoard.highlights[x][y][z] = false;
                    }
                }
            }
            for (const move of moves) {
                resultBoard.highlights[move.targetPosition.x][move.targetPosition.y][move.targetPosition.z] = true;
            }
            return { ...s, selected: p === undefined ? undefined : point, board: resultBoard};
        }
        else {
            // A piece is selected, we clicked a cell
            if (point.equals(s.selected)) {
                return {...s, selected: undefined, board: s.board.cloneNoHighlight() };
            } else if (s.board.highlights[point.x][point.y][point.z]) {
                // Can move here, go there and advance turn
                const resultBoard = s.board.cloneNoHighlight();
                resultBoard.pieces[point.x][point.y][point.z] = s.board.getPiece(s.selected);
                resultBoard.setPiece(s.selected, undefined);
                return { ...s, selected: undefined, board: resultBoard};
            }
        }
        return { ...s };
    };
}