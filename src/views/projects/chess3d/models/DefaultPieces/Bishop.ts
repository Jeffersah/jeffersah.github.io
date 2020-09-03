import imgUrl from '../../assets/chess_pieces.svg';
import Team from '../Team';
import { IMove } from '../IMove';
import Point3, { cardinalPoints, diagonalPoints } from '../../position/Point3';
import IBoard from '../IBoard';
import { seekMove } from '../MoveHelpers';

class Bishop {
    name = 'Bishop';
    imgUrl = imgUrl;

    getImgRect(team: Team): { x: number, y: number, w: number, h: number } {
        return { x: 2 * 45, y: team === 'white' ? 0 : 45, w: 45, h: 45 };
    }

    getMoves(board: IBoard, pos: Point3): IMove[] {
        const result: IMove[] = [];
        diagonalPoints.forEach(dir => {
            result.push(...seekMove(board, pos, dir, true, true));
        });
        return result;
    }
}

export default new Bishop();