import { IColorFunction } from "./IColorFunction";

class GrayscaleColor implements IColorFunction {
    Name = 'Grayscale';
    shaderFunction = `
vec3 floatToColor(float perc) {
    return vec3(perc, perc, perc);
}
    `;
}

const grayscaleColor = new GrayscaleColor();
export default grayscaleColor;