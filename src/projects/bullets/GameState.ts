import { ETeam } from "./ETeam";
import { IEffect } from "./IEffect";
import IEntity from "./IEntity";
import Player from "./Player";

export default class GameState {
    public Player: Player;
    public Entities: { [key in ETeam]: IEntity[] }
    public Effects: IEffect[];

    constructor(player: Player){
        this.Player = player;
        this.Entities = <any>{};
        this.Entities[ETeam.neutral] = [];
        this.Entities[ETeam.ally] = [];
        this.Entities[ETeam.enemy] = [];
        this.Effects = [];
    }

    public tick(){
        for(let i = this.Effects.length - 1; i >= 0; i --) {
            if(this.Effects[i].tick())
                this.Effects.splice(i, 1);
        }
    }

    public draw(ctx: CanvasRenderingContext2D){
        for(let i = 0; i < this.Effects.length; i++) {
            this.Effects[i].draw(ctx);
        }
    }
}