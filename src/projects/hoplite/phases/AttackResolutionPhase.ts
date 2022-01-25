import AttackInfo from "../AttackInfo";
import GameState from "../GameState";
import IGamePhase from "./IGamePhase";

export default function AttackResolutionPhase(state: GameState, attacks: AttackInfo[], nextPhase: (state: GameState) => IGamePhase) : IGamePhase {
    for(const attack of attacks) {
        for(const pt of attack.affectedTiles) {
            const entity = state.entityAt(pt);
            entity.hp -= attack.damage;
        }
    }

    state.enemies = state.enemies.filter(e => e.hp > 0);
    if(state.player.hp <= 0) {
        // TODO: GAME OVER
    }
    return nextPhase(state);
}