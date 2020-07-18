import { ISymbolDefinition } from './SymbolDefinitions';
import { ClickDragWrapper } from '../mandelbrot/ClickDragWrapper';
import { SpriteSheet } from '../common/assets/SpriteSheet';

export default class Symbol {
    private currentXCoord: number;
    constructor(public x: number, public y: number, public definition: ISymbolDefinition) {
        this.currentXCoord = this.definition.SpriteStartXCoord;
    }

    Toggle() {
        this.currentXCoord++;
        if (this.currentXCoord > this.definition.SpriteEndXCoord) {
            this.currentXCoord = this.definition.SpriteStartXCoord;
        }
    }

    Draw(ctx: CanvasRenderingContext2D, sheet: SpriteSheet) {
        sheet.render(ctx, this.x, this.y, 6, 6, this.currentXCoord, 0);
    }
}