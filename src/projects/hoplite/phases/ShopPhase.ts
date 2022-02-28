import KeyboardManager from "../../common/input/KeyboardManager";
import MouseManager from "../../common/input/MouseManager";
import Point from "../../common/position/Point";
import Sprite from "../../common/rendering/Sprite";
import Assets from "../Assets";
import GameState from "../GameState";
import IGamePhase from "./IGamePhase";
import * as C from '../Constants';
import ISaleItem from "../shopItems/ISaleItem";
import { fullHealth } from "../../dndmech/SymbolDefinitions";
import Rect from "../../common/position/Rectangle";

const downKeys = ['x', '2', 's', 'ArrowDown'];
const upKeys = ['w', '8', 'ArrowUp'];

const selectKeys = ['Enter', ' '];

export default class ShopPhase implements IGamePhase {

    static shopItemSprite: Sprite;
    static shopItemSelectedSprite: Sprite;
    static shopItemNoMoney: Sprite;

    static closeButton: Sprite;
    static closeButtonSelected: Sprite;
    static assets: Assets;

    static onAssetsLoaded(assets: Assets): void {
        ShopPhase.assets = assets;
        ShopPhase.shopItemSprite = assets.getAsset('shop_entry') as Sprite;
        ShopPhase.shopItemSelectedSprite = assets.getAsset('shop_entry_selected') as Sprite;
        ShopPhase.shopItemNoMoney = assets.getAsset('shop_entry_nomoney') as Sprite;
        
        ShopPhase.closeButton = assets.getAsset('close_button') as Sprite;
        ShopPhase.closeButtonSelected = assets.getAsset('close_button_selected') as Sprite;
    }

    selectedItem: number;
    displayOffset: Point;
    wrappedTexts: string[][];

    constructor(public items: ISaleItem[], private nextState: (gs: GameState) => IGamePhase)
    {
        this.selectedItem = 0;
        const fullHeight = items.length * ShopPhase.shopItemSprite.height() + ShopPhase.closeButton.height();

        this.displayOffset = new Point(
            C.MAP_PIXEL_SIZE / 2 - ShopPhase.shopItemSprite.width() / 2,
            C.MAP_PIXEL_SIZE / 2 - fullHeight / 2
        );

        this.wrappedTexts = items.map(item => item === undefined ? [] : wrapText(item.description, 38));
    }
    
    init(state: GameState): void {
        this.selectedItem = 0;
    }

    tick(state: GameState, keys: KeyboardManager, mouse: MouseManager): IGamePhase {

        if(downKeys.some(key => keys.isKeyPressed(key))) {
            this.selectedItem = Math.min(this.selectedItem + 1, this.items.length);
        }

        if(upKeys.some(key => keys.isKeyPressed(key))) {
            this.selectedItem = Math.max(this.selectedItem - 1, 0);
        }
        
        if(selectKeys.some(key => keys.isKeyPressed(key))) {
            const item = this.getSelectedItem();
            if(item === undefined) {
                return this.nextState(state);
            }
            else if(item.price <= state.gold) {
                state.gold -= item.price;
                this.items[this.selectedItem] = undefined;
                const result = item.onBuy(state, state.player);
                if((result as any)?.replaceItem !== undefined) {
                    this.items[this.selectedItem] = (result as any)?.replaceItem;
                    this.wrappedTexts[this.selectedItem] = wrapText(this.items[this.selectedItem].description, 38);
                }
            }
        }

        return this;
    }

    getSelectedItem() {
        if(this.selectedItem === this.items.length) return undefined;
        return this.items[this.selectedItem];
    }
    
    draw(ctx: CanvasRenderingContext2D, state: GameState): void {
        state.draw(ctx);

        ctx.globalAlpha = 0.5;
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, C.MAP_PIXEL_SIZE, C.MAP_PIXEL_SIZE);
        ctx.globalAlpha = 1;

        for(let i = 0; i < this.items.length; i++) {
            this.drawShopItem(
                ctx, 
                state, 
                this.items[i], i === this.selectedItem, 
                this.displayOffset.x, 
                this.displayOffset.y + i * ShopPhase.shopItemSprite.height(),
                this.wrappedTexts[i]);
        }
        const closeButtonSprite = this.selectedItem === this.items.length ? ShopPhase.closeButtonSelected : ShopPhase.closeButton;

        closeButtonSprite.draw(ctx, new Rect(
            this.displayOffset.x + ShopPhase.shopItemSprite.width() - closeButtonSprite.width(),
            this.displayOffset.y + this.items.length * ShopPhase.shopItemSprite.height(), 
            closeButtonSprite.width(), 
            closeButtonSprite.height()
        ), 0);
    }

    drawShopItem(ctx: CanvasRenderingContext2D, state:GameState, item: ISaleItem, selected: boolean, x: number, y: number, description: string[]) {
        const bgSprite = !selected ? 
                ShopPhase.shopItemSprite : 
                item === undefined || item.price <= state.gold ? 
                    ShopPhase.shopItemSelectedSprite : 
                    ShopPhase.shopItemNoMoney;

        bgSprite.draw(ctx, new Rect(x, y, bgSprite.width(), bgSprite.height()), 0);

        if(item !== undefined) {
            item.icon.draw(ctx, new Rect(x + 2, y + 2, 32, 48), 0);
            ShopPhase.assets.drawString(ctx, new Point(x + 38, y), item.name);

            ShopPhase.assets.drawSmallString(ctx, new Point(x + 223, y + 3), '$' + item.price);

            for(let i = 0; i < 4 && i < description.length; i++){
                ShopPhase.assets.drawSmallString(ctx, new Point(x + 38, y + 15 + 8 * i), description[i]);
            }
        }
    }
}

function wrapText(text: string, maxLength: number): string[]{
    const words = text.split(' ');
    const lines: string[] = [];
    let currentLine = '';

    for(const word of words) {
        if(currentLine.length + word.length + 1 > maxLength) {
            lines.push(currentLine);
            currentLine = word + ' ';
        }
        else {
            currentLine += word + ' ';
        }
    }
    lines.push(currentLine);

    return lines;
}