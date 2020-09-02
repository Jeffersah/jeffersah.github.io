import IBoard from './IBoard';
import Team from './Team';
import Point3 from '../position/Point3';

export interface IState {
    board: IBoard;
    turn: Team;
    selected?: Point3;
}