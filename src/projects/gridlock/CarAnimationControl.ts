import { AnimationPlayCondition, IJsonAnimationInfo } from "./assets/leveldata/IJsonAnimationInfo";
import ECarColor from "./ECarColor";

export default class CarAnimationControl {
    animations: {
        [key in AnimationPlayCondition]?: IJsonAnimationInfo
    };

    constructor(public color: ECarColor) {
        this.animations = {};
    }

    addAnimation(animation: IJsonAnimationInfo) {
        if(typeof(animation.conditions) === 'string') {
            this.animations[animation.conditions] = animation;
        }
        else {
            for(const key of animation.conditions) {
                this.animations[key] = animation;
            }
        }
    }
}