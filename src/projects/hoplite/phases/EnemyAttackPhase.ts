import KeyboardManager from "../../common/input/KeyboardManager";
import Point from "../../common/position/Point";
import ParallelAnimation from "../animation/ParallelAnimation";
import SequentialAnimation from "../animation/SequentialAnimation";
import AttackInfo from "../attackInfos/AttackInfo";
import IAttackInfo from "../attackInfos/IAttackInfo";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import AnimationPhase from "./AnimationPhase";
import AttackResolutionPhase from "./AttackResolutionPhase";
import EnemyMovePhase from "./EnemyMovePhase";
import IGamePhase from "./IGamePhase";
import PhaseBuilder from "./PhaseBuilder";

export default function EnemyAttackPhase(state: GameState):IGamePhase {
    const enemyAttacks: IAttackInfo[][] = []
    for(let i = 0; i < state.enemies.length; i++) {
        state.enemies[i].lastAttacks = state.enemies[i].getAttacks(state);
        enemyAttacks.push(state.enemies[i].lastAttacks);
    }

    var phaseBuilder = PhaseBuilder.New();

    if(enemyAttacks.some(e => e.length > 0)) {
        const animations = enemyAttacks.map(attackSet => new SequentialAnimation(attackSet.map(attack => new ParallelAnimation(attack.toAnimations(state)))));
        phaseBuilder = phaseBuilder
            .thenAnimate(animations)
            .thenResolve(enemyAttacks.reduce((acc, c) => acc.concat(c), []));
    }

    return phaseBuilder.finally(gs => EnemyMovePhase(gs))(state);
}