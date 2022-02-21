import IAnimation from "../animation/IAnimation";
import SequentialAnimation from "../animation/SequentialAnimation";
import IAttackInfo from "../attackInfos/IAttackInfo";
import GameState from "../GameState";
import AnimationPhase from "./AnimationPhase";
import AttackResolutionPhase from "./AttackResolutionPhase";
import IGamePhase from "./IGamePhase";

export default class PhaseBuilder {
    public static New() {
        return new PhaseBuilder();
    }

    private chain: ((gs: GameState, next:(gs: GameState)=>IGamePhase) => IGamePhase)[];

    constructor(){
        this.chain = [];
    }

    public thenAnimate(animations: IAnimation[]): PhaseBuilder {
        this.chain.push((_, next) => 
            new AnimationPhase(animations, next)
        );
        return this;
    }

    public thenResolve(attacks: IAttackInfo[]): PhaseBuilder {
        this.chain.push((gs, next) =>
            AttackResolutionPhase(gs, attacks, next)
        );
        return this;
    }

    public thenAnimateAndResolve(attacks: IAttackInfo[]) {
        this.chain.push((gs, next) => {
            const animations = attacks.map(atk => new SequentialAnimation(atk.toAnimations(gs)));
            return new AnimationPhase(animations, () => AttackResolutionPhase(gs, attacks, next));
        })
        return this;
    }

    public then(next: ((gs: GameState, next:(gs: GameState)=>IGamePhase) => IGamePhase)) {
        this.chain.push(next);
        return this;
    }

    public finally(lastStep: (gs: GameState) => IGamePhase): (gs: GameState) => IGamePhase {
        return this.chain.reduceRight((nextfn:((gs:GameState)=>IGamePhase), current) => (gs => current(gs, nextfn)), lastStep);
    }
}