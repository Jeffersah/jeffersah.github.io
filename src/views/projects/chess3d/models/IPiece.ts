import IPieceType from './IPieceType';
import Team from './Team';

export default interface IPiece {
    team: Team;
    type: IPieceType;
}