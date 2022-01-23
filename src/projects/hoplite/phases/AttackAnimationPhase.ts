import { Rectangle } from "../../common/bounds/Rectangle";
import KeyboardManager from "../../common/input/KeyboardManager";
import Point from "../../common/position/Point";
import Rect from "../../common/position/Rectangle";
import IRenderable from "../../common/rendering/IRenderable";
import AttackInfo from "../AttackInfo";
import GameState from "../GameState";
import { HexLength, HexToPixel } from "../Hex";
import IGamePhase from "./IGamePhase";
import * as C from '../Constants';

const BUMP_ANIMATION_TIME = 20;
const PROJECTILE_ANIMATION_TIME_PER_DIST = 20;

export default class AttackAnimationPhase implements IGamePhase {

    fixedDuration = 0;
    timer = 0;

    bumpAnimations: AttackInfo[];
    animations: {attack: AttackInfo, animation: IRenderable}[];

    constructor(private attacks: AttackInfo[], private getNextPhase: (state: GameState) => IGamePhase) {
        this.fixedDuration = attacks.map(attack => {
            if(attack.projectile !== undefined) {
                const len = HexLength(Point.subtract(attack.target, attack.attacker.position));
                return len * PROJECTILE_ANIMATION_TIME_PER_DIST;
            }
            else if(attack.bumpAnimation) {
                return BUMP_ANIMATION_TIME;
            }
            return 0;
        }).reduce((a,b) => Math.max(a,b), 0);

        this.animations = attacks.filter(attack => attack.impactAnimation !== undefined && attack.impactAnimation !== null).map(attack => ({attack, animation: attack.impactAnimation.getRenderable()}));
        this.bumpAnimations = attacks.filter(attack => attack.bumpAnimation);
    }

    init(state: GameState): void {
    }

    tick(state: GameState, keys: KeyboardManager): IGamePhase {
        if(this.timer >= this.fixedDuration && this.animations.length === 0) {
            return this.getNextPhase(state);
        }
        if(this.timer < this.fixedDuration) this.timer++;

        for(let i = this.animations.length - 1; i >= 0; i--) {
            if(this.animations[i].animation.tick()) {
                this.animations.splice(i, 1);
            }
        }
        return this;
    }

    draw(ctx: CanvasRenderingContext2D, state: GameState): void {

        if(this.timer <= BUMP_ANIMATION_TIME) {

            let p = this.timer / BUMP_ANIMATION_TIME;
            if(p > 0.5) p = 1-p;

            for(let i = 0; i < this.bumpAnimations.length; i++) {
                const attack = this.bumpAnimations[i];
                const dest = Point.interpolate(attack.startPoint, attack.target, p);
                attack.attacker.position = dest;
            }
        }

        state.draw(ctx);
        for(let i = 0; i < this.animations.length; i++) {
            const destPt = HexToPixel(this.animations[i].attack.target);
            this.animations[i].animation.draw(ctx, new Rect(destPt.x, destPt.y, C.TILE_WIDTH, C.TILE_HEIGHT), 0);
        }
    }

}