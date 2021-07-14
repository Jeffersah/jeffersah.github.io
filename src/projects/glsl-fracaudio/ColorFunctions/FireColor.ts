import { IColorFunction } from "./IColorFunction";

class FireColor implements IColorFunction {
    Name = 'Fire';
    shaderFunction = `
vec3 floatToColor(float perc) {
    if(perc <= 0.5) {
        return vec3(perc * 2.0, perc, 0.0);
    }
    perc = (perc - 0.5) * 2.0;
    return vec3(1.0, 0.5 + perc / 2.0, perc);
}
    `;
}

const fireColor = new FireColor();
export default fireColor;