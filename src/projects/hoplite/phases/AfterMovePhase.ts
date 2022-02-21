import SequentialAnimation from "../animation/SequentialAnimation";
import IAttackInfo from "../attackInfos/IAttackInfo";
import GameState from "../GameState";
import AnimationPhase from "./AnimationPhase";
import AttackResolutionPhase from "./AttackResolutionPhase";
import IGamePhase from "./IGamePhase";
import PhaseBuilder from "./PhaseBuilder";

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

    
    var phaseBuilder = PhaseBuilder.New();
    if(allAttacks.length > 0) {
        phaseBuilder = phaseBuilder.thenAnimateAndResolve(allAttacks);
    }

    return phaseBuilder.finally(gs => AfterMovePhase_Features(gs, isPlayerTurn, next))(state);
}


function AfterMovePhase_Features(state: GameState, isPlayerTurn: boolean, next: (state: GameState) => IGamePhase): IGamePhase {
    if(isPlayerTurn) {
        state.features.iterate((x, y, c) => {
            const newNext = c?.afterPlayerTurn(state, x, y, next);
            if(newNext !== undefined) next = newNext;
        });
    }
    else {
        state.features.iterate((x, y, c) => {
            const newNext = c?.afterEnemyTurn(state, x, y, next);
            if(newNext !== undefined) next = newNext;
        });
    }

    return next(state);
}