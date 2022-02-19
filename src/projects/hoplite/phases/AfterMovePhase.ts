import IAttackInfo from "../attackInfos/IAttackInfo";
import GameState from "../GameState";
import AttackResolutionPhase from "./AttackResolutionPhase";
import IGamePhase from "./IGamePhase";

export default function AfterMovePhase(state: GameState, isPlayerTurn: boolean, next: (state: GameState) => IGamePhase): IGamePhase {

    let allAttacks: IAttackInfo[] = []
    if(isPlayerTurn) {
        state.tiles.iterate((x, y, c) => {
            const attacks = c.AfterPlayerTurn(state, x, y);
            if(attacks !== undefined && attacks.length > 0) {
                allAttacks.push(...attacks);
            }
        });
    }
    else {
        state.tiles.iterate((x, y, c) => {
            const attacks = c.AfterEnemyTurn(state, x, y);
            if(attacks !== undefined && attacks.length > 0) {
                allAttacks.push(...attacks);
            }
        });
    }

    if(allAttacks.length === 0) return next(state);
    else return AttackResolutionPhase(state, allAttacks, next);
}