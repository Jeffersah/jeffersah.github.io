export const VERTEX_SHADER = `
attribute vec4 aVertexPosition;
uniform mat4 project;
uniform mat4 move;
varying vec3 vPos;
varying vec3 ptPos;

void main() {
  vPos = aVertexPosition.xyz;
  vec4 transformed = project * move * aVertexPosition;
  ptPos = transformed.xyz;
  gl_Position = vec4(transformed.xyz, transformed.z + 1.0);
}`;

export const FRAGMENT_SHADER = `
precision mediump float;
varying vec3 vPos;
varying vec3 ptPos;
void main() {
    vec3 adjpos = (vPos.xyz + 1.0) / 2.0;

    vec3 adjPt = (ptPos + 1.0)/2.0;

    float mxX = max(adjPt.x, 1.0-adjPt.x);

    float distAdj = 1.0 - (ptPos.z / 6.0);

    gl_FragColor = vec4(adjPt.xy * distAdj, distAdj, 1.0);
}
`;