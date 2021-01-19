import { ETeam } from "./ETeam";
import IEntity from "./IEntity";
import Player from "./Player";

export default class GameState {
    public Player: Player;
    public Entities: { [key in ETeam]: IEntity[] }

    public GameState(player: Player){
        this.Player = player;
        this.Entities = <any>{};
        this.Entities[ETeam.neutral] = [];
        this.Entities[ETeam.ally] = [];
        this.Entities[ETeam.enemy] = [];
    }

}