export default class MathHelpers {
    static wrap(value: number, modulo: number) {
        value = value % modulo;
        if(value < 0) value += modulo;
        return value;
    }
}