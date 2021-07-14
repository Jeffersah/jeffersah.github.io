import { IColorFunction } from "./ColorFunctions/IColorFunction";
import { IFractal } from "./Fractals/IFractal";

export function CreateShaderCode(fractal: IFractal, color: IColorFunction): string {
    return GENERAL_SHADER
        .replace("[[[FRACTAL_CODE]]]", fractal.ShaderCode)
        .replace("[[[COLOR_CODE]]]", color.shaderFunction);;
}

export const GENERAL_SHADER = `
precision highp float;
varying vec3 vPos;
uniform vec2 window_pos;
uniform vec2 window_size;
uniform float MAX_ABSSQ;

const int MAX_ITER = 256;

vec2 cplx_mult(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

vec2 cplx_div(vec2 a, vec2 b) {
    float denom = dot(b, b);
    return vec2 (
        (a.x * b.x + a.y * b.y) / denom,
        (a.y * b.x - a.x * b.y) / denom 
    );
}

vec2 scalar_mult(vec2 a, vec2 b) {
    return vec2( a.x * b.x, a.y * b.y);
}

float cplx_abssq(vec2 v) {
    return dot(v, v);
}

[[[FRACTAL_CODE]]]

float calcIterations(vec2 coords) {
    vec2 roll = init_fractal(coords);
    for(int iter = 0; iter < MAX_ITER; iter++) {
        roll = step_fractal(roll, coords);
        if (cplx_abssq(roll) >= MAX_ABSSQ) {
            return float(iter)/float(MAX_ITER);
        }
    }
    return 1.0;
}

[[[COLOR_CODE]]]

void main() {
    vec2 adjpos = vPos.xy;
    adjpos += 1.0;
    adjpos /= 2.0;
    // adjpos is now 0, 1
    // Convert that to world-space
    adjpos = window_pos + adjpos * window_size;

    float mb_perc = calcIterations(adjpos);
    gl_FragColor = vec4(floatToColor(mb_perc), 1.0);
}`;