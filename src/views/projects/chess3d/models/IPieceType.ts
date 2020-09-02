import IBoard from './IBoard';
import { IMove } from './IMove';
import Point3 from '../position/Point3';
import Team from './Team';

export default interface IPieceType {
    name: string;
    imgUrl: string;
    getImgRect(team: Team): { x: number, y: number, w: number, h: number };
    getMoves(board: IBoard, pos: Point3): IMove[];
}