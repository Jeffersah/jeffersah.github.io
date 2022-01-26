import KeyboardManager from "../../common/input/KeyboardManager";
import { Interpolated } from "../../common/interpolation/Interpolated";
import Point from "../../common/position/Point";
import EntityMoveAnimation from "../animation/EntityMoveAnimation";
import ParallelAnimation from "../animation/ParallelAnimation";
import SequentialAnimation from "../animation/SequentialAnimation";
import AttackInfo from "../attackInfos/AttackInfo";
import { Direction, DirectionHelper } from "../Direction";
import GameState from "../GameState";
import { HexToPixel, PixelToHex } from "../Hex";
import HexCell, { DownStairs } from "../HexCell";
import AnimationPhase from "./AnimationPhase";
import AttackResolutionPhase from "./AttackResolutionPhase";
import EnemyAttackPhase from "./EnemyAttackPhase";
import FloorTransitionPhase from "./FloorTransitionPhase";
import IGamePhase from "./IGamePhase";
import PlayerTurnGamePhase from "./PlayerTurnGamePhase";


export default function PlayerMoveAnimPhase(state: GameState, from: Point, to: Point, forceMotion: Point):IGamePhase {
    const onFinish = (gs: GameState) => {
        if(gs.tiles.get(gs.player.position).typeId === DownStairs.TypeID) {
            return new FloorTransitionPhase();
        }
        else if(gs.enemies.length === 0) {
            return new PlayerTurnGamePhase();
        }
        else return EnemyAttackPhase(state);
    }

    const postMoveAttacks: (gs:GameState)=>IGamePhase = (gs: GameState) => {
        const attacks = [
            ...state.player.primary.getAfterMoveAttacks(state, state.player, from, to),
            ...state.player.secondary.getAfterMoveAttacks(state, state.player, from, to)
        ];
        if(attacks.length === 0) return onFinish(gs);
        const animation = new SequentialAnimation(attacks.map(attack => new ParallelAnimation(attack.toAnimations())));
        return new AnimationPhase([animation], state => AttackResolutionPhase(state, attacks, onFinish));
    };

    const playerMove = (state: GameState) => {
        if(!state.isValidMove(forceMotion, false)) {
            return postMoveAttacks(state);
        }
        return new AnimationPhase(
            [new EntityMoveAnimation(state.player, Interpolated.linear<Point>(Point.interpolate, from, forceMotion), forceMotion, state.enemies.length === 0 ? 2 : 10)],
            postMoveAttacks
        );
    };

    if(state.enemies.length === 0) {
        return playerMove(state);
    }
    if(state.enemies.length > 0) {
        const attacks = [
            ...state.player.primary.getBeforeMoveAttacks(state, state.player, from, to),
            ...state.player.secondary.getBeforeMoveAttacks(state, state.player, from, to)
        ];
        if(attacks.length === 0) return playerMove(state);
        const animation = new SequentialAnimation(attacks.map(attack => new ParallelAnimation(attack.toAnimations())));
        return new AnimationPhase([animation], state => AttackResolutionPhase(state, attacks, playerMove));
    }
} 