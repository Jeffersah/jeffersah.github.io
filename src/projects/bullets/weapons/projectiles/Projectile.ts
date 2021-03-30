import { SpriteAnimation } from "../../../common/assets/SpriteAnimation";
import { AtlasSprite } from "../../../common/assets/SpriteAtlas";
import Bounds from "../../../common/position/Bounds";
import Line from "../../../common/position/Line";
import Point from "../../../common/position/Point";
import { ETeam } from "../../ETeam";
import { Weapon } from "../Weapon";
import { IProjectileArgs, RepeatMode } from "./IProjectileArgs";

export class Projectile {

    private heading: number;
    private laserEndPoint ?: Point;
    private laserLength ?: number;
    private bulletDelta?: Point;
    private remainingLifetime: number;

    constructor(public args: IProjectileArgs, public position: Point, public target: Point, rot: number, public team: ETeam) {
        this.heading = rot + ((Math.random() - .5) * args.spawnSprayAngle);
        if(args.weaponType === 'laser') {
            this.laserLength = args.maxLength ?? Point.subtract(target, position).Length();
            this.laserEndPoint = Point.add(position, Point.fromAngle(this.heading, this.laserLength));
        } else if(args.weaponType === 'bullet') {
            this.bulletDelta = Point.fromAngle(this.heading, args.moveSpeed);
        }
        this.remainingLifetime = args.lifetime;
    }
    
    tick() : boolean{
        if(this.args.weaponType === 'bullet') {
            this.position.AddWith(this.bulletDelta);
        }
        return this.remainingLifetime-- === 0;
    }
    
    getColisionBounds(): Line | Bounds { 
        if(this.args.weaponType === 'laser' && this.args.width === undefined) {
            // this uses a line colision
            return new Line(this.position, this.laserEndPoint);
        }
        else if(this.args.weaponType === 'laser') {
            // This is a thick laser, using bounds colision
            return new Bounds(this.position, new Point(this.laserLength, this.args.width), new Point(0, this.args.width / 2), this.heading);
        }
        else if(this.args.colisionMode === undefined || this.args.colisionMode === 'discrete') {
            // Discrete colision projectile. Just return it's current bounding box
            return new Bounds(this.position, this.args.colisSize, Point.zero(), 0);
        } else {
            // Continuous colision projectile.
            const lastPosition = Point.subtract(this.position, this.bulletDelta);
            return new Bounds(lastPosition, this.args.colisSize, new Point(0, this.args.colisSize.y / 2), this.heading);
        }
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(this.args.weaponType === 'laser') {
            if(renderIsString(this.args.render)) {
                ctx.save();
                ctx.strokeStyle = this.args.render;
                ctx.lineWidth = this.args.width ?? 1;
                ctx.beginPath();
                ctx.moveTo(this.position.x, this.position.y);
                ctx.lineTo(this.laserEndPoint.x, this.laserEndPoint.y);
                ctx.stroke();
                ctx.restore();
            } else {
                // TODO: Draw Lasers with Art
            }
        }
        else {
            this.args.sprite.draw(ctx, this.position, this.args.colisSize, this.heading);
        }
    }
}

function renderIsString(render: string | { sprite: AtlasSprite | SpriteAnimation, repeatMode: RepeatMode, renderWidth?: number }): render is string {
    return (<any>render).sprite === undefined;
}