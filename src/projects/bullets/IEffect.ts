export interface IEffect
{
    /**
     * Applied once per frame. Return TRUE to indicate the effect is finished
     */
    tick(): boolean;
    draw(ctx: CanvasRenderingContext2D): void;
}