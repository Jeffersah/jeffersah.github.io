import KeyboardManager from "../common/input/KeyboardManager";
import { ETeam } from "./ETeam";
import { IEffect } from "./IEffect";
import IEntity from "./IEntity";
import Player from "./Player";

export default class GameState {
    public Player: Player;
    public Entities: { [key in ETeam]: IEntity[] }
    public Effects: IEffect[];

    constructor(player: Player, public keys: KeyboardManager){
        this.Player = player;
        this.Entities = <any>{};
        this.Entities[ETeam.neutral] = [];
        this.Entities[ETeam.ally] = [];
        this.Entities[ETeam.enemy] = [];
        this.Effects = [];
    }

    public tick(){
        this.keys.update();
        for(let i = this.Effects.length - 1; i >= 0; i --) {
            if(this.Effects[i].tick())
                this.Effects.splice(i, 1);
        }
        this.updateEntities(this.Entities[ETeam.neutral]);
        this.updateEntities(this.Entities[ETeam.ally]);
        this.updateEntities(this.Entities[ETeam.enemy]);
    }

    private updateEntities(entities: IEntity[]) {
        for(let i = entities.length - 1; i >= 0; i --) {
            if(!entities[i].tick(this.keys, this))
                entities.splice(i, 1);
        }
    }

    public draw(ctx: CanvasRenderingContext2D){
        this.drawEntities(ctx, this.Entities[ETeam.neutral]);
        this.drawEntities(ctx, this.Entities[ETeam.ally]);
        this.drawEntities(ctx, this.Entities[ETeam.enemy]);
        for(let i = 0; i < this.Effects.length; i++) {
            this.Effects[i].draw(ctx);
        }
    }
    
    private drawEntities(ctx: CanvasRenderingContext2D, entities: IEntity[]) {
        for(let i = entities.length - 1; i >= 0; i --) {
            entities[i].render(ctx);
        }
    }
}