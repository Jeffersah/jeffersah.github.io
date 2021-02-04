import Point from "./position/Point";

export default class Angle {
    /** Takes an angle and returns it in the range of [0, 2 PI) */
    static normalize(angle: number) {
        angle %= Math.PI * 2;
        if(angle < 0) angle += Math.PI * 2;
        return angle;
    }

    /** Takes an angle and returns it in the range of [-PI, PI) */
    static relativeNormalize(angle: number){
        var norm = Angle.normalize(angle);
        if(norm >= Math.PI) {
            return norm - Math.PI * 2;;
        } else {
            return norm;
        }
    }   

    static accuteAngle(from: number, to: number){
        return Angle.relativeNormalize(to - from);
    }

    static angleBetween(from: Point, to: Point) {
        return Math.atan2(to.y - from.y, to.x - from.x);
    }
}