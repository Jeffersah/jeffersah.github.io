import IBoard from '../IBoard';
import Point3 from '../../position/Point3';
import { IMove } from '../IMove';

export function seekMove(board: IBoard, start: Point3, delta: Point3, allowCapture?: boolean, allowMove?: boolean): IMove[] {
    allowCapture = allowCapture ?? true;
    allowMove = allowMove ?? true;
    const myTeam = board.getPiece(start).team;

    let tgt = Point3.Add(start, delta);
    const moves = [];
    while (board.isOnBoard(tgt)) {
        const p = board.getPiece(tgt);
        if (p === undefined) {
            if (allowMove) {
                moves.push({ targetPosition: tgt });
            }
        } else {
            if (p.team !== myTeam && allowCapture) {
                moves.push({ targetPosition: tgt });
            }
            break;
        }
        tgt = Point3.Add(tgt, delta);
    }

    return moves;
}

export function singleMove(board: IBoard, start: Point3, end: Point3, allowCapture?: boolean, allowMove?: boolean): []|[IMove] {
    allowCapture = allowCapture ?? true;
    allowMove = allowMove ?? true;

    if (!board.isOnBoard(end)) return [];

    const tgtPiece = board.getPiece(end);
    if (tgtPiece === undefined) {
        if (allowMove) return [{ targetPosition: end }];
        return [];
    }
    if (allowCapture && tgtPiece.team !== board.getPiece(start).team) {
        return [{ targetPosition: end }];
    }
    return [];
}