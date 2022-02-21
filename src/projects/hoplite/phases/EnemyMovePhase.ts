import { Interpolated } from "../../common/interpolation/Interpolated";
import Point from "../../common/position/Point";
import EntityMoveAnimation from "../animation/EntityMoveAnimation";
import IAnimation from "../animation/IAnimation";
import GameState from "../GameState";
import AfterMovePhase from "./AfterMovePhase";
import AnimationPhase from "./AnimationPhase";
import IGamePhase from "./IGamePhase";
import PhaseBuilder from "./PhaseBuilder";
import PlayerTurnGamePhase from "./PlayerTurnGamePhase";

const duration = 20;

export default function EnemyMovePhase(state: GameState): IGamePhase {
    const disallowed: Point[] = state.enemies.map(e => e.position);
    const animations: IAnimation[] = [];
    const stepped: boolean[] = [];
    for(let i = 0; i < state.enemies.length; i++) { 
        const destination = state.enemies[i].getMove(state, state.enemies[i].lastAttacks, disallowed);
        if(!destination.equals(state.enemies[i].position)) {
            animations.push(new EntityMoveAnimation(state.enemies[i], Interpolated.linear<Point>(Point.interpolate, state.enemies[i].position, destination), destination, duration));
            const rm = disallowed.findIndex(p => p.equals(state.enemies[i].position));
            disallowed.splice(rm, 1, destination);
            stepped.push(true);
        }
        else {
            stepped.push(false);
        }
    }

    return PhaseBuilder.New()
        .thenAnimate(animations)
        .finally(gs => AfterEnemyMovePhase(gs, stepped))
        (state);
}

function AfterEnemyMovePhase(state: GameState, didMove: boolean[]): IGamePhase {
    // Resolve who stepped where
    for(let i = 0; i < didMove.length; i++){
        if(didMove[i]){
            const enemy = state.enemies[i];
            const cell = state.tiles.get(enemy.position);
            cell.OnEntityStep(enemy);
        }
    }

    return AfterMovePhase(state, false, () => new PlayerTurnGamePhase());
}