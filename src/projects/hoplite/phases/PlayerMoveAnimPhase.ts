import KeyboardManager from "../../common/input/KeyboardManager";
import { Interpolated } from "../../common/interpolation/Interpolated";
import Point from "../../common/position/Point";
import EntityMoveAnimation from "../animation/EntityMoveAnimation";
import ParallelAnimation from "../animation/ParallelAnimation";
import SequentialAnimation from "../animation/SequentialAnimation";
import AttackInfo from "../AttackInfo";
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


export default function PlayerMoveAnimPhase(state: GameState, from: Point, to: Point):IGamePhase {

    const onFinish = (gs: GameState) => {
        if(gs.tiles.get(gs.player.position).typeId === DownStairs.TypeID) {
            return new FloorTransitionPhase();
        }
        else if(gs.enemies.length === 0) {
            return new PlayerTurnGamePhase();
        }
        else return EnemyAttackPhase(state);
    }

    const playerMove = new AnimationPhase(
        [new EntityMoveAnimation(state.player, Interpolated.linear<Point>(Point.interpolate, from, to), to, state.enemies.length === 0 ? 2 : 10)],
        onFinish
    );

    if(state.enemies.length === 0) {
        return playerMove;
    }
    if(state.enemies.length > 0) {
        const attacks = [
            ...state.player.primary.getAttacks(state, state.player, from, to),
            ...state.player.secondary.getAttacks(state, state.player, from, to)
        ];
        if(attacks.length === 0) return playerMove;
        const animation = new SequentialAnimation(attacks.map(attack => new ParallelAnimation(attack.toAnimations())));
        return new AnimationPhase([animation], state => AttackResolutionPhase(state, attacks, state => playerMove));
    }
} 