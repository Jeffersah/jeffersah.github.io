import { IGraphic } from './IGraphic';
import { SpriteSheet } from '../common/assets/SpriteSheet';

export default class SheetGraphic implements IGraphic {

    width: number;
    height: number;

    constructor(public sheet: SpriteSheet, private tileX: number, private tileY: number) {
        this.width = sheet.spriteWidth;
        this.height = sheet.spriteHeight;
    }

    paint(ctx: CanvasRenderingContext2D, tx: number, ty: number, tw: number, th: number): void {
        this.sheet.render(ctx, tx, ty, tw, th, this.tileX, this.tileY);
    }

}