import Vector from "../../common/3d/Vector";

export default interface IDEPrimitive {
    emitGlsl(): string;
}

export function glslFloatConst(n: number) {
    const asstr = n.toString();
    if (asstr.indexOf('.') === -1) return asstr + '.0';
    return asstr;
}

export function glslVec3Const(x: number, y: number, z: number) {
    return 'vec3(' + glslFloatConst(x) + ',' + glslFloatConst(y) + ',' + glslFloatConst(z)+')';
}

export function glslUnitVec3Const(x: number, y: number, z: number) {
    const len = Math.sqrt(x * x + y * y + z * z);
    return 'vec3(' + glslFloatConst(x / len) + ',' + glslFloatConst(y / len) + ',' + glslFloatConst(z / len) + ')';
}

export class SphereDE implements IDEPrimitive {
    constructor(public radius: number) { }
    emitGlsl() {
        return `return length(p) - ${glslFloatConst(this.radius)};\r\n`;
    }
}

// tslint:disable-next-line: max-classes-per-file
export class BoxDE implements IDEPrimitive {
    constructor(public xlen: number, public ylen: number, public zlen: number) { }
    emitGlsl() {
        return `vec3 q = abs(p) - ${glslVec3Const(this.xlen, this.ylen, this.zlen)};\r\nreturn length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);`;
    }
}


// tslint:disable-next-line: max-classes-per-file
export class BoundingBoxDE implements IDEPrimitive {
    constructor(public xlen: number, public ylen: number, public zlen: number, public segLen: number) { }
    emitGlsl() {
        return `p = abs(p)-${glslVec3Const(this.xlen, this.ylen, this.zlen)};
vec3 q = abs(p+${glslFloatConst(this.segLen)})-${glslFloatConst(this.segLen)};
return min(min(
    length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),
    length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),
    length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));\r\n`;
    }
}

// tslint:disable-next-line: max-classes-per-file
export class MengerSpongeDE implements IDEPrimitive {
    constructor(private scale: number, private c: Vector, private maxIterations: number, private bailoutRange: number) {

    }

    emitGlsl() {
        return `
const float bailout = ${glslFloatConst(this.bailoutRange)};
const vec3 C = ${glslVec3Const(this.c.x, this.c.y, this.c.z)};
const float scale = ${glslFloatConst(this.scale)};
const int MI = ${this.maxIterations};
float r = dot(p, p);
int numi = 0;
for(int i = 0; i < MI; i++){
    numi = i;
    if(r >= bailout) break;

    // Rotate 1
    
    p = abs(p);
    if(p.x - p.y < 0.0){ float x1=p.y; p.y=p.x; p.x=x1;}
    if(p.x - p.z < 0.0){ float x1=p.z; p.z=p.x; p.x=x1;}
    if(p.y - p.z < 0.0){ float y1=p.z; p.z=p.y; p.y=y1;}

    // Rotate 2

    p.xy = scale * p.xy - C.xy * (scale-1.0);
    p.z=scale*p.z;
    if(p.z>0.5*C.z*(scale-1.0)) p.z-=C.z*(scale-1.0);
    
    r = dot(p, p);
}
return (length(p)-2.0)*pow(scale,-float(numi));\r\n`;
    }
}


// tslint:disable-next-line: max-classes-per-file
export class RotaryMengerSpongeDE implements IDEPrimitive {
    constructor(private scale: number, private c: Vector, private maxIterations: number, private bailoutRange: number, private rRate: number) {

    }

    emitGlsl() {
        const radians = 'PI * t/30.0 * ' + glslFloatConst(this.rRate);
        return `
mat3 mx = mat3(
    cos(${radians}), 0.0, -sin(${radians}),
    0.0, 1.0, 0.0,
    sin(${radians}), 0.0, cos(${radians})
);

const float bailout = ${glslFloatConst(this.bailoutRange)};
const vec3 C = ${glslVec3Const(this.c.x, this.c.y, this.c.z)};
const float scale = ${glslFloatConst(this.scale)};
const int MI = ${this.maxIterations};
float r = dot(p, p);
int numi = 0;
for(int i = 0; i < MI; i++){
    numi = i;
    if(r >= bailout) break;

    // Rotate 1
    p = mx * p;
    
    p = abs(p);
    if(p.x - p.y < 0.0){ float x1=p.y; p.y=p.x; p.x=x1;}
    if(p.x - p.z < 0.0){ float x1=p.z; p.z=p.x; p.x=x1;}
    if(p.y - p.z < 0.0){ float y1=p.z; p.z=p.y; p.y=y1;}

    // Rotate 2

    p.xy = scale * p.xy - C.xy * (scale-1.0);
    p.z=scale*p.z;
    if(p.z>0.5*C.z*(scale-1.0)) p.z-=C.z*(scale-1.0);
    
    r = dot(p, p);
}
return (length(p)-2.0)*pow(scale,-float(numi));\r\n`;
    }
}