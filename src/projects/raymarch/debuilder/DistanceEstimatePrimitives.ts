export default interface IDEPrimitive {
    emitGlsl(vName: string): string;
}

export function glslFloatConst(n: number) {
    const asstr = n.toString();
    if (asstr.indexOf('.') === -1) return asstr + '.0';
    return asstr;
}

export function glslVec3Const(x: number, y: number, z: number) {
    return 'vec3(' + glslFloatConst(x) + ',' + glslFloatConst(y) + ',' + glslFloatConst(z)+')';
}

export class SphereDE implements IDEPrimitive {
    constructor(public radius: number) { }
    emitGlsl(v: string) {
        return `return length(${v}) - ${glslFloatConst(this.radius)};\r\n`;
    }
}

// tslint:disable-next-line: max-classes-per-file
export class BoxDE implements IDEPrimitive {
    constructor(public xlen: number, public ylen: number, public zlen: number) { }
    emitGlsl(v: string) {
        return `vec3 q = abs(${v}) - ${glslVec3Const(this.xlen, this.ylen, this.zlen)};\r\nreturn length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);`;
    }
}


// tslint:disable-next-line: max-classes-per-file
export class BoundingBoxDE implements IDEPrimitive {
    constructor(public xlen: number, public ylen: number, public zlen: number, public segLen: number) { }
    emitGlsl(v: string) {
        return `${v} = abs(${v})-${glslVec3Const(this.xlen, this.ylen, this.zlen)};
vec3 q = abs(${v}+${glslFloatConst(this.segLen)})-${glslFloatConst(this.segLen)};
return min(min(
    length(max(vec3(${v}.x,q.y,q.z),0.0))+min(max(${v}.x,max(q.y,q.z)),0.0),
    length(max(vec3(q.x,${v}.y,q.z),0.0))+min(max(q.x,max(${v}.y,q.z)),0.0)),
    length(max(vec3(q.x,q.y,${v}.z),0.0))+min(max(q.x,max(q.y,${v}.z)),0.0));\r\n`;
    }
}