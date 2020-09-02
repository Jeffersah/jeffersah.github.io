import imgUrl from '../../assets/chess_pieces.svg';
import Team from '../Team';
import { IMove } from '../IMove';
import Point3, { cardinalPoints, triagonalPoints, diagonalPoints } from '../../position/Point3';
import IBoard from '../IBoard';
import { seekMove, singleMove } from './MoveHelpers';

class King {
    name = 'King';
    imgUrl = imgUrl;

    getImgRect(team: Team): { x: number, y: number, w: number, h: number } {
        return { x: 0, y: team === 'white' ? 0 : 45, w: 45, h: 45 };
    }

    getMoves(board: IBoard, pos: Point3): IMove[] {
        const result: IMove[] = [];
        cardinalPoints.forEach(dir => {
            result.push(...singleMove(board, pos, Point3.Add(pos, dir), true, true));
        });
        diagonalPoints.forEach(dir => {
            result.push(...singleMove(board, pos, Point3.Add(pos, dir), true, true));
        });
        triagonalPoints.forEach(dir => {
            result.push(...singleMove(board, pos, Point3.Add(pos, dir), true, true));
        });
        return result;
    }
}

export default new King();