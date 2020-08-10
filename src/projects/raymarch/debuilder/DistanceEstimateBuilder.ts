import IDEPrimitive, { glslVec3Const, glslFloatConst } from './DistanceEstimatePrimitives';

export default class DistanceEstimateBuilder {
    private glsl: string;
    private nextTempVar = 0;
    constructor(private primitive: IDEPrimitive) {
        this.glsl = 'float dist(vec3 p) {\r\n';
    }

    protected getTempVarName() {
        return 't' + (this.nextTempVar++);
    }


    public elongate(x: number, y: number, z: number): DistanceEstimateBuilder {
        this.glsl += `p = p - clamp(p, -${glslVec3Const(x, y, z)}, ${glslVec3Const(x, y, z)} );\r\n`;
        return this;
    }

    public repeat(xd: number, yd: number, zd: number): DistanceEstimateBuilder {
        const glsl_c = glslVec3Const(xd, yd, zd);
        this.glsl += `p = mod(p+0.5*${glsl_c},${glsl_c})-0.5*${glsl_c};\r\n`;
        return this;
    }

    public symX(): DistanceEstimateBuilder {
        this.glsl += `p = vec3(abs(p.x), p.y, p.z);\r\n`;
        return this;
    }

    public rXt(): DistanceEstimateBuilder {
        const mtx = this.getTempVarName();
        this.glsl += `mat3 ${mtx} = mat3(
            1.0, 0.0, 0.0,
            0.0, cos(PI * t), sin(PI * t),
            0.0, -sin(PI * t), cos(PI * t)
        );
        p = ${mtx} * p;\r\n`;
        return this;
    }

    public rYt(): DistanceEstimateBuilder {
        const mtx = this.getTempVarName();
        this.glsl += `mat3 ${mtx} = mat3(
            cos(PI * t), 0.0, -sin(PI * t),
            0.0, 1.0, 0.0,
            sin(PI * t), 0.0, cos(PI * t)
        );
        p = ${mtx} * p;\r\n`;
        return this;
    }

    public rZt(): DistanceEstimateBuilder {
        const mtx = this.getTempVarName();
        this.glsl += `mat3 ${mtx} = mat3(
            cos(PI * t), sin(PI * t), 0.0,
            -sin(PI * t), cos(PI * t), 0.0,
            0.0, 0.0, 1.0
        );
        p = ${mtx} * p;\r\n`;
        return this;
    }

    public translate(x: number, y: number, z: number): DistanceEstimateBuilder {
        this.glsl += `p = p-${glslVec3Const(x, y, z)};\r\n`;
        return this;
    }

    public emitGlsl(): string {
        this.glsl += this.primitive.emitGlsl('p');
        this.glsl += '}';
        return this.glsl;
    }
}