import imgUrl from '../../assets/chess_pieces.svg';
import Team from '../Team';
import { IMove } from '../IMove';
import Point3, { cardinalPoints, diagonalPoints } from '../../position/Point3';
import IBoard from '../IBoard';
import { seekMove, singleMove } from '../MoveHelpers';

class Knight {
    name = 'Knight';
    imgUrl = imgUrl;

    getImgRect(team: Team): { x: number, y: number, w: number, h: number } {
        return { x: 3 * 45, y: team === 'white' ? 0 : 45, w: 45, h: 45 };
    }

    getMoves(board: IBoard, pos: Point3): IMove[] {
        const axies = [new Point3(1, 0, 0), new Point3(0, 1, 0), new Point3(0, 0, 1)];
        const axisLengths: [number, number][] = [
            [2, 1], [1, 2],
            [-2, 1], [-1, 2],
            [2, -1], [1, -2],
            [-2, -1], [-1, -2]
        ];
        const result: IMove[] = [];

        for (let a1 = 0; a1 < axies.length; a1 ++) {
            for (let a2 = a1 + 1; a2 < axies.length; a2++) {
                for (const len of axisLengths) {
                    const delta = Point3.Add(Point3.Mult(axies[a1], len[0]), Point3.Mult(axies[a2], len[1]));
                    result.push(...singleMove(board, pos, Point3.Add(pos, delta), true, true));
                }
            }
        }

        return result;
    }
}

export default new Knight();