import { selected } from "../../../views/projects/chess3d/css/singleBoard.css";
import { AtlasSprite } from "../../common/assets/SpriteAtlas";
import Point from "../../common/position/Point";
import Assets from "../assets";
import ECarColor from "../ECarColor";
import ETileAnchor from "../ETileAnchor";
import Signal from "../Signal";
import MapTile from "../tiles/MapTile";

export const SIGNAL_CTRL_PANEL_SIZE = 128;

const UICoords = {
    round: new Point(88, 88),
    directions: [
        new Point(108, 88),
        new Point(88, 108),
        new Point(68, 88),
        new Point(88, 68),
    ],
    tilePreview: new Point(0, 64)
};

export default class SignalCtrlPanel {

    selectedColor: ECarColor;
    private colorButtonDown: AtlasSprite;
    private colorButtonUp: AtlasSprite;

    private sqButtonUp: AtlasSprite;
    private sqButtonDown: AtlasSprite;
    
    private roundButtonUp: AtlasSprite;
    private roundButtonDown: AtlasSprite;

    private arrowIndicators: AtlasSprite[];

    constructor(public tile: MapTile, public signal: Signal, public assets: Assets, public dx: number, public dy: number) {
        this.selectedColor = ECarColor.Red;
        this.colorButtonUp = this.assets.ctrlPanelElements.getSprite(new Point(0, 0), new Point(63, 32));
        this.colorButtonDown = this.assets.ctrlPanelElements.getSprite(new Point(0, 32), new Point(63, 32));
        
        this.sqButtonUp = this.assets.ctrlPanelElements.getSprite(new Point(63, 0), new Point(16, 16));
        this.sqButtonDown = this.assets.ctrlPanelElements.getSprite(new Point(63, 16), new Point(16, 16));

        this.roundButtonUp = this.assets.ctrlPanelElements.getSprite(new Point(63, 32), new Point(16, 16));
        this.roundButtonDown = this.assets.ctrlPanelElements.getSprite(new Point(63, 48), new Point(16, 16));

        this.arrowIndicators = [];
        for(let i = 0; i < 4; i++){
            this.arrowIndicators.push(this.assets.ctrlPanelElements.getSprite(new Point(79, 16 * i), new Point(16, 16)));
        }
    }

    tryHandleClick(x: number, y: number): boolean {
        if(x < this.dx || y < this.dy || x > this.dx + SIGNAL_CTRL_PANEL_SIZE || y > this.dy + SIGNAL_CTRL_PANEL_SIZE) return false;

        x -= this.dx;
        y -= this.dy;

        if(x <= SIGNAL_CTRL_PANEL_SIZE / 2) {
            const newColor = Math.floor(y / (SIGNAL_CTRL_PANEL_SIZE / 4));
            this.selectedColor = newColor;
            return true;
        }
        else if(y >= SIGNAL_CTRL_PANEL_SIZE / 2) {
            // Bottom-right quadrant: Car controls.
            if(x >= UICoords.round.x && y >= UICoords.round.y && x <= UICoords.round.x + 16 && y <= UICoords.round.y + 16) {
                // Clicked round buton
                this.signal.clearInstructions(this.selectedColor);
            }
            else {
                // Find the best dir
                x -= SIGNAL_CTRL_PANEL_SIZE / 2;
                y -= SIGNAL_CTRL_PANEL_SIZE / 2;

                // Coords are now relative to the frame

                x -= SIGNAL_CTRL_PANEL_SIZE / 4;
                y -= SIGNAL_CTRL_PANEL_SIZE / 4;
                
                // Coords are now relative to round button
                let anchor;
                if(Math.abs(x) >= Math.abs(y)) {
                    anchor = x < 0 ? ETileAnchor.Left : ETileAnchor.Right;
                }
                else {
                    anchor = y < 0 ? ETileAnchor.Top : ETileAnchor.Bottom;
                }

                if(this.signal.definition.outputDirs.indexOf(anchor) === -1) return true;

                this.signal.setInstruction(this.selectedColor, anchor);
            }
            return true;
        }

        return true;
    }

    draw(ctx: CanvasRenderingContext2D) {
        if(!this.assets.ctrlPanelBackground.image)  {
            console.log('ASSETS IMAGE: ' + this.assets.ctrlPanelBackground.image);
        }
        ctx.drawImage(this.assets.ctrlPanelBackground.image, this.dx, this.dy);
        for(let colorButton = 0; colorButton < 4; colorButton++) {
            const selected = this.selectedColor === colorButton;
            const buttonImg = selected ? this.colorButtonDown : this.colorButtonUp;

            buttonImg.draw(ctx, new Point(this.dx + 1, this.dy + 32 * colorButton), new Point(63, 32));

            this.assets.carImageAtlas.getSprite(new Point(18 * colorButton, 0), new Point(18, 18))
                .draw(ctx, new Point(this.dx + 1 + 63/2 - 8, this.dy + 32 * colorButton + 16 - 8), new Point(18, 18));
        }

        const selectedDir = this.signal.getInstruction(this.selectedColor) ?? -1;

        for(let dir = 0; dir < 4; dir++) {
            const buttonImg = selectedDir === dir ? this.sqButtonDown : this.sqButtonUp;
            buttonImg.draw(ctx, new Point(this.dx + UICoords.directions[dir].x, this.dy + UICoords.directions[dir].y), new Point(16, 16));
            this.arrowIndicators[dir].draw(ctx, new Point(this.dx + UICoords.directions[dir].x, this.dy + UICoords.directions[dir].y), new Point(16, 16));
        }

        const roundImg = selectedDir === -1 ? this.roundButtonDown : this.roundButtonUp;
        roundImg.draw(ctx, new Point(this.dx + UICoords.round.x, this.dy + UICoords.round.y), new Point(16, 16));

        this.tile.draw_offgrid(ctx, this.dx + 72, this.dy + 8, 48, this.assets);
    }
}