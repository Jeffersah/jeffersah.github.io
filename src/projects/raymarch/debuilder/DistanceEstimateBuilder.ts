import IDEPrimitive, { glslVec3Const, glslUnitVec3Const } from './DistanceEstimatePrimitives';
import { GlslConstant, glslFloatConst } from './GlslValue';

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
        const glslc = glslVec3Const(xd, yd, zd);
        this.glsl += `p = mod(p+0.5*${glslc},${glslc})-0.5*${glslc};\r\n`;
        return this;
    }

    public symX(): DistanceEstimateBuilder {
        this.glsl += `p.x = abs(p.x);\r\n`;
        return this;
    }

    public symY(): DistanceEstimateBuilder {
        this.glsl += `p.y = abs(p.y);\r\n`;
        return this;
    }

    public symZ(): DistanceEstimateBuilder {
        this.glsl += `p.z = abs(p.z);\r\n`;
        return this;
    }

    public symAxis(normalX: GlslConstant, normalY: GlslConstant, normalZ: GlslConstant) {
        const glslc = glslUnitVec3Const(normalX, normalY, normalZ);
        this.glsl += `p -= 2.0 * min(0.00, dot(p, ${glslc})) * ${glslc};\r\n`;
        return this;
    }

    public rXt(rate: number): DistanceEstimateBuilder {
        const mtx = this.getTempVarName();
        const radians = 'PI * t/30.0 * ' + glslFloatConst(rate);
        this.glsl += `mat3 ${mtx} = mat3(
            1.0, 0.0, 0.0,
            0.0, cos(${radians}), sin(${radians}),
            0.0, -sin(${radians}), cos(${radians})
        );
        p = ${mtx} * p;\r\n`;
        return this;
    }

    public rYt(rate: number): DistanceEstimateBuilder {
        const mtx = this.getTempVarName();
        const radians = 'PI * t/30.0 * ' + glslFloatConst(rate);
        this.glsl += `mat3 ${mtx} = mat3(
            cos(${radians}), 0.0, -sin(${radians}),
            0.0, 1.0, 0.0,
            sin(${radians}), 0.0, cos(${radians})
        );
        p = ${mtx} * p;\r\n`;
        return this;
    }

    public rZt(rate: number): DistanceEstimateBuilder {
        const mtx = this.getTempVarName();
        const radians = 'PI * t/30.0 * ' + glslFloatConst(rate);
        this.glsl += `mat3 ${mtx} = mat3(
            cos(${radians}), sin(${radians}), 0.0,
            -sin(${radians}), cos(${radians}), 0.0,
            0.0, 0.0, 1.0
        );
        p = ${mtx} * p;\r\n`;
        return this;
    }


    public rX(rad: number): DistanceEstimateBuilder {
        const mtx = this.getTempVarName();
        const radians = glslFloatConst(rad);
        this.glsl += `mat3 ${mtx} = mat3(
            1.0, 0.0, 0.0,
            0.0, cos(${radians}), sin(${radians}),
            0.0, -sin(${radians}), cos(${radians})
        );
        p = ${mtx} * p;\r\n`;
        return this;
    }

    public rY(rad: number): DistanceEstimateBuilder {
        const mtx = this.getTempVarName();
        const radians = glslFloatConst(rad);
        this.glsl += `mat3 ${mtx} = mat3(
            cos(${radians}), 0.0, -sin(${radians}),
            0.0, 1.0, 0.0,
            sin(${radians}), 0.0, cos(${radians})
        );
        p = ${mtx} * p;\r\n`;
        return this;
    }

    public rZ(rad: number): DistanceEstimateBuilder {
        const mtx = this.getTempVarName();
        const radians = glslFloatConst(rad);
        this.glsl += `mat3 ${mtx} = mat3(
            cos(${radians}), sin(${radians}), 0.0,
            -sin(${radians}), cos(${radians}), 0.0,
            0.0, 0.0, 1.0
        );
        p = ${mtx} * p;\r\n`;
        return this;
    }

    public translate(x: GlslConstant, y: GlslConstant, z: GlslConstant): DistanceEstimateBuilder {
        this.glsl += `p = p-vec3(${glslFloatConst(x)},${glslFloatConst(y)},${glslFloatConst(z)});\r\n`;
        return this;
    }

    public customGlsl(glsl: string) {
        this.glsl += glsl;
        return this;
    }

    public emitGlsl(): string {
        this.glsl += this.primitive.emitGlsl();
        this.glsl += '}';
        return this.glsl;
    }
}