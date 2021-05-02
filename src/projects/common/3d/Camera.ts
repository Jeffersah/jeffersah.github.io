import Matrix4 from "./Matrix4";
import Point3 from "./Point3";
import Quaternion from "./Quaternion";

export default class Camera {
    position: Point3;
    facing: Quaternion;

    constructor(position?: Point3, facing?: Quaternion) {
        this.position = position ?? Point3.zero();
        this.facing = facing ?? new Quaternion(1, 0, 0, 0);
    }

    getViewMatrix(): Matrix4 { 
        let offsetMtx = Matrix4.translate(this.position.mult(-1));
        let rotMtx = this.facing.toMatrix();
        return rotMtx.mult(offsetMtx);
    }
}