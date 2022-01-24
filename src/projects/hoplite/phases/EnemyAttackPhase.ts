import KeyboardManager from "../../common/input/KeyboardManager";
import Point from "../../common/position/Point";
import ParallelAnimation from "../animation/ParallelAnimation";
import SequentialAnimation from "../animation/SequentialAnimation";
import AttackInfo from "../AttackInfo";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import AnimationPhase from "./AnimationPhase";
import AttackAnimationPhase from "./AttackAnimationPhase";
import EnemyMovePhase from "./EnemyMovePhase";
import IGamePhase from "./IGamePhase";



export default function EnemyAttackPhase(state: GameState):IGamePhase {
    const enemyAttacks: AttackInfo[][] = state.enemies.map(enemy => enemy.getAttacks(state));
    if(enemyAttacks.some(e => e.length > 0)) {
        const animations = enemyAttacks.map(attackSet => new SequentialAnimation(attackSet.map(attack => new ParallelAnimation(attack.toAnimations()))));
        return new AnimationPhase(animations, ()=>EnemyMovePhase(state, enemyAttacks));
    }
    else{
        return EnemyMovePhase(state, enemyAttacks);
    }
}