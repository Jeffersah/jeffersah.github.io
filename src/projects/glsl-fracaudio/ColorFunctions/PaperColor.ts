import { IColorFunction } from "./IColorFunction";

class PaperColor implements IColorFunction {
    Name = 'Paper';
    shaderFunction = `
vec3 floatToColor(float perc) {
    if(perc == 1.0) {
        return vec3(0, 0, 0);
    }
    return vec3(0.8, 0.8, 0.8) - (perc * 0.8);
}
    `;
}

const pueColor = new PaperColor();
export default pueColor;