import { IJsonAnimation } from "../../../common/assets/json/IJsonAnimation";
import ECarColor from "../../ECarColor";

export type JsonAnimationFile = IJsonAnimationInfo[];

export type AnimationPlayCondition = 
    'straight' | 
    'turnLeft' |
    'turnRight' |
    'reverse' |
    'park';

export interface IJsonAnimationInfo {
    conditions: AnimationPlayCondition | AnimationPlayCondition[];
    carType: ECarColor;
    repeatCount: number;

    sourceOffset: number[],
    numFrames: number;
    
    overridesRotation?: boolean;
    noFlipOnRightTurn?: boolean;
}