const twoPi = Math.PI * 2;

export default class Angle {
    static normalize(angle: number): number {
        angle = angle % twoPi;
        if (angle < 0) angle += twoPi;
        return angle;
    }

    static relativeNormalize(angle: number): number {
        angle = angle % twoPi;
        if (angle > Math.PI) {
            angle -= twoPi;
        } else if(angle < - Math.PI) {
            angle += twoPi;
        }
        return angle;
    }

    static relativeAngle(a: number, b: number) {
        return Angle.relativeNormalize(a - b);
    }
}