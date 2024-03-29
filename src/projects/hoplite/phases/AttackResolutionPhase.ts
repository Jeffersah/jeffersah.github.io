import AttackInfo from "../attackInfos/AttackInfo";
import IAttackInfo from "../attackInfos/IAttackInfo";
import Entity from "../Entity";
import GameState from "../GameState";
import IGamePhase from "./IGamePhase";

export default function AttackResolutionPhase(state: GameState, attacks: IAttackInfo[], nextPhase: (state: GameState) => IGamePhase) : IGamePhase {
    for(const attack of attacks) {
        const damageGroups = attack.getAffectedTiles(state);
        for(const damageGroup of damageGroups) {
            for(const pt of damageGroup.positions) {
                const entity = state.entityAt(pt);
                if(entity === undefined || (Entity.IsPlayer(entity) && damageGroup.ignorePlayer) || (!Entity.IsPlayer(entity) && damageGroup.ignoreEnemies)) continue;
                entity.hp -= damageGroup.damage;
            }
        }
    }
    for(const attack of attacks) {
        attack.applyExtraEffects(state);
    }

    let goldValues = state.enemies.filter(e => e.hp <= 0).map(e => e.goldValue);
    if(goldValues.length > 0) {
        state.gold += goldValues.reduce((a, b) => a + b, 0) * goldValues.length;
    }

    state.enemies = state.enemies.filter(e => e.hp > 0);
    if(state.player.hp <= 0) {
        // TODO: GAME OVER
    }
    return nextPhase(state);
}