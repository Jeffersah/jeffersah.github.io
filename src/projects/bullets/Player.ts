import Point from '../common/position/Point';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import ImageLoader from '../common/assets/ImageLoader';
import { RotTransformCanvas } from '../common/CanvasHelpers';
import KeyboardManager from '../common/input/KeyboardManager';
import Angle from '../common/position/Angle';

const PHYS = {
    acceleration: 0.2,
    maxvelocity: 120,
    vFricMin: 0.998,
    vFricMax: 0.98,

    engineAdjSpeed: 0.06,

    turnBaseAccel: 0.002,
    turnEngineMaxAccel: 0.004,
    turnFric: 0.98,
    turnPullMax: 0.003,
    turnPullMaxV: 120,
};

export default class Player {
    position: Point;
    velocity: Point;
    angularVelocity: number;
    rotation: number;

    private isEngineOn: boolean;
    private engineDeflect: number;
    private tgtDeflect: number;

    constructor(private sprites: SpriteSheet) {
        this.position = new Point(0, 0);
        this.velocity = new Point(0, 0);
        this.angularVelocity = 0;
        this.rotation = 0;
        this.engineDeflect = 0;
        this.tgtDeflect = 0;
    }

    tick(keys: KeyboardManager) {
        if (keys.isKeyDown('w')) {
            this.isEngineOn = true;
        } else {
            this.isEngineOn = false;
        }

        if (keys.isKeyDown('a')) {
            this.tgtDeflect = 1;
        } else if (keys.isKeyDown('d')) {
            this.tgtDeflect = -1;
        } else {
            this.tgtDeflect = 0;
        }

        if (this.tgtDeflect >= this.engineDeflect) {
            this.engineDeflect = Math.min(this.engineDeflect + PHYS.engineAdjSpeed, this.tgtDeflect);
        } else {
            this.engineDeflect = Math.max(this.engineDeflect - PHYS.engineAdjSpeed, this.tgtDeflect);
        }

        const vDirection = Math.atan2(this.velocity.y, this.velocity.x);
        const diffDir = Angle.relativeAngle(this.rotation, vDirection);
        const diffPerc = diffDir / Math.PI;

        this.angularVelocity *= PHYS.turnFric;
        this.angularVelocity -= this.tgtDeflect * PHYS.turnBaseAccel + this.engineDeflect * PHYS.turnEngineMaxAccel * (this.isEngineOn ? 1 : 0);

        this.rotation += this.angularVelocity;

        const friction = (1 - Math.abs(diffPerc)) * PHYS.vFricMin + (Math.abs(diffPerc)) * PHYS.vFricMax;
        this.velocity.MultWith(friction, friction);

        if (this.isEngineOn) {
            this.velocity.x += PHYS.acceleration * Math.cos(this.rotation);
            this.velocity.y += PHYS.acceleration * Math.sin(this.rotation);
        }

        let vTotal = this.velocity.LengthSq();
        if (vTotal >= PHYS.maxvelocity) {
            const mult = PHYS.maxvelocity / vTotal;
            this.velocity.MultWith(mult, mult);
            vTotal = PHYS.maxvelocity;
        }

        let anglePullAmt = -Math.sin(diffDir);
        anglePullAmt *= Math.min(vTotal / PHYS.turnPullMaxV, 1);
        anglePullAmt *= PHYS.turnPullMax;

        this.angularVelocity += anglePullAmt;


        this.position.AddWith(this.velocity);
    }

    render(ctx: CanvasRenderingContext2D) {
        ctx.save();
        RotTransformCanvas(ctx, this.position.x, this.position.y, 4, 8, this.rotation + Math.PI / 2);
        if (this.isEngineOn) {
            this.sprites.rotrender(ctx, 4, 11, 8, 16, Math.floor(4 * Math.random()), 1, this.engineDeflect * Math.PI / 4, 4, 2);
        }
        if (this.tgtDeflect > 0) {
            // Render spin flame
            this.sprites.rotrender(ctx, 7, 4, 8, 16, Math.floor(Math.random() * 2), 2, 0, 3, 4);
        }
        else if (this.tgtDeflect < 0) {
            // Render spin flame
            this.sprites.rotrender(ctx, 1, 4, 8, 16, 2 + Math.floor(Math.random() * 2), 2, 0, 6, 4);
        }
        this.sprites.render(ctx, 0, 0, 8, 16, 0, 0);
        ctx.restore();
    }
}