import imgUrl from '../../assets/chess_pieces.svg';
import Team from '../Team';
import { IMove } from '../IMove';
import Point3, { cardinalPoints } from '../../position/Point3';
import IBoard from '../IBoard';
import { seekMove, singleMove } from './MoveHelpers';

class Pawn {
    name = 'Pawn';
    imgUrl = imgUrl;

    getImgRect(team: Team): { x: number, y: number, w: number, h: number } {
        return { x: 5 * 45, y: team === 'white' ? 0 : 45, w: 45, h: 45 };
    }

    getMoves(board: IBoard, pos: Point3): IMove[] {
        const result: IMove[] = [];
        const fwd: Point3 = board.getPiece(pos).team === 'white' ? new Point3(0, 0, 1) : new Point3(0, 0, -1);
        result.push(...singleMove(board, pos, Point3.Add(pos, fwd), false, true));
        const attacks = [new Point3(1, 0, 0), new Point3(0, 1, 0)];
        for (const atkdir of attacks) {
            for (const mult of [1, -1]) {
                const tgt = Point3.Add(pos, Point3.Add(fwd, Point3.Mult(atkdir, mult)));
                result.push(...singleMove(board, pos, tgt, true, false));
            }
        }
        return result;
    }
}

export default new Pawn();