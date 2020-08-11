export default class Vector {
    constructor(public x: number, public y: number, public z: number) {
    }

    dot(other: Vector) {
        return this.x * other.x + this.y * other.y + this.z * other.z;
    }

    length() {
        return Math.sqrt(this.lengthSq());
    }

    lengthSq() {
        return this.x * this.x + this.y * this.y + this.z * this.z;
    }
}