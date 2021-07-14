import { IColorFunction } from "./IColorFunction";

class HueColor implements IColorFunction {
    Name = 'Hue';
    shaderFunction = `

float fmod(float a, float b) {
    return a - (b * floor(a/b));
}

float hsvComponentToRgb(vec3 hsv, float n) {
    float k = fmod((n + hsv.x * 6.0), 6.0);
    return hsv.z - hsv.z * hsv.y * max(min(min(k, 4.0-k),1.0), 0.0);
}

vec3 floatToColor(float perc) {
    if(perc == 1.0) {
        return vec3(0, 0, 0);
    }
    vec3 hsv = vec3(perc, 1.0, 1.0);
    return vec3(
        hsvComponentToRgb(hsv, 5.0),
        hsvComponentToRgb(hsv, 3.0),
        hsvComponentToRgb(hsv, 1.0)
    );
}
    `;
}

const hueColor = new HueColor();
export default hueColor;