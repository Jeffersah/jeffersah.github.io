export const MANDELBROT_SHADER = `
precision highp float;
varying vec3 vPos;
uniform vec2 window_pos;
uniform vec2 window_size;

const int MAX_ITER = 256;
const float MAX_ABSSQ = 2.0;

vec2 cplx_mult(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

vec2 step_mandelbrot(vec2 v, vec2 c) {
    return cplx_mult(v, v) + c;
}

float cplx_abssq(vec2 v) {
    return dot(v, v);
}

float iterate_mandelbrot(vec2 coords) {
    vec2 roll = coords;
    for(int iter = 0; iter < MAX_ITER; iter++) {
        roll = step_mandelbrot(roll, coords);
        if (cplx_abssq(roll) >= MAX_ABSSQ) {
            return float(iter)/float(MAX_ITER);
        }
    }
    return 1.0;
}

vec3 floatToColor(float perc) {
    if(perc <= 0.5) {
        return vec3(perc * 2.0, perc, 0.0);
    }
    perc = (perc - 0.5) * 2.0;
    return vec3(1.0, 0.5 + perc / 2.0, perc);
}

void main() {
    vec2 adjpos = vPos.xy;
    adjpos += 1.0;
    adjpos /= 2.0;
    // adjpos is now 0, 1
    // Convert that to world-space
    adjpos = window_pos + adjpos * window_size;

    float mb_perc = iterate_mandelbrot(adjpos);
    gl_FragColor = vec4(floatToColor(mb_perc), 1.0);
}`;

export const JULIA_SHADER = `
precision highp float;
varying vec3 vPos;
uniform vec2 julia_coord;
uniform float julia_escape;
uniform vec2 window_pos;
uniform vec2 window_size;

const int MAX_ITER = 256;

vec2 cplx_mult(vec2 a, vec2 b) {
    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);
}

vec2 step_julia(vec2 v) {
    return cplx_mult(v, v) + julia_coord;
}

float cplx_abssq(vec2 v) {
    return dot(v, v);
}

float iterate_julia(vec2 coords) {
    vec2 roll = coords;
    for(int iter = 0; iter < MAX_ITER; iter++) {
        roll = step_julia(roll);
        if (cplx_abssq(roll) >= julia_escape) {
            return float(iter)/float(MAX_ITER);
        }
    }
    return 1.0;
}

vec3 floatToColor(float perc) {
    if(perc <= 0.5) {
        return vec3(perc * 2.0, perc, 0.0);
    }
    perc = (perc - 0.5) * 2.0;
    return vec3(1.0, 0.5 + perc / 2.0, perc);
}

void main() {
    vec2 adjpos = vPos.xy;
    adjpos += 1.0;
    adjpos /= 2.0;
    // adjpos is now 0, 1
    // Convert that to world-space
    adjpos = window_pos + adjpos * window_size;

    float mb_perc = iterate_julia(adjpos);
    gl_FragColor = vec4(floatToColor(mb_perc), 1.0);
}`;