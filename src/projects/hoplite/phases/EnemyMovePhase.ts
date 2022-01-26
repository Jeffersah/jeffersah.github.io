import KeyboardManager from "../../common/input/KeyboardManager";
import { Interpolated } from "../../common/interpolation/Interpolated";
import Point from "../../common/position/Point";
import EntityMoveAnimation from "../animation/EntityMoveAnimation";
import IAnimation from "../animation/IAnimation";
import AttackInfo from "../attackInfos/AttackInfo";
import { Direction, DirectionHelper } from "../Direction";
import Entity from "../Entity";
import GameState from "../GameState";
import AnimationPhase from "./AnimationPhase";
import IGamePhase from "./IGamePhase";
import PlayerMoveAnimPhase from "./PlayerMoveAnimPhase";
import PlayerTurnGamePhase from "./PlayerTurnGamePhase";

const duration = 20;

export default function EnemyMovePhase(state: GameState): IGamePhase {
    const disallowed: Point[] = [];
    const animations: IAnimation[] = [];
    for(let i = 0; i < state.enemies.length; i++) { 
        const destination = state.enemies[i].getMove(state, state.enemies[i].lastAttacks, disallowed);
        if(!destination.equals(state.enemies[i].position)) {
            animations.push(new EntityMoveAnimation(state.enemies[i], Interpolated.linear<Point>(Point.interpolate, state.enemies[i].position, destination), destination, duration));
            disallowed.push(destination);
        }
    }

    return new AnimationPhase(animations, () => new PlayerTurnGamePhase());
}