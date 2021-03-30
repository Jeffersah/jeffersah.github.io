import Point from "../../common/position/Point";
import { ETeam } from "../ETeam";
import GameState from "../GameState";
import { Ship } from "../Ship";
import { IWeaponArgs, Weapon } from "./Weapon";
import { IWeaponTimingArgs, WeaponTimer } from "./WeaponTimer";

export interface IWeaponGroupArgs {
    timer: IWeaponTimingArgs,
    weapons: IWeaponArgs[],
    burstAll?: boolean
}

export class WeaponGroup {
    burstAllWeapons: boolean;
    constructor(public timer: WeaponTimer, private weapons: Weapon[], burstAllWeapons?: boolean) {
        this.burstAllWeapons = burstAllWeapons ?? true;
    }

    /** Call once per tick, makes all turrets attempt to acquire targets
     * @returns the number of weapons which have acquired targets
     */
    acquireTargets(ship: Ship, targets: Ship[]): number {
        let acqCount = 0;
        for(let i = 0; i < this.weapons.length; i++){
            if(this.weapons[i].tick(ship, targets.map(t => t.position)) !== null) {
                acqCount++;
            }
        }
        return acqCount;
    }

    tick(gs: GameState, self: Ship) {
        const targets = gs.findNearestShips(self.position, self.getTeam() === ETeam.enemy ? ETeam.ally : ETeam.enemy, this.weapons[0].args.range);
        const acq = this.acquireTargets(self, targets);

        this.timer.tick(acq > 0, bi => this.onShoot(bi, gs, self));
    }

    onShoot(burstIndex: number, gs: GameState, ship: Ship) {
        if(!this.burstAllWeapons) {
            this.weapons[burstIndex % this.weapons.length].shoot(gs, ship);
        } else {
            for(let i = 0; i < this.weapons.length; i++) {
                this.weapons[i].shoot(gs, ship);
            }
        }
    }

    draw(ctx: CanvasRenderingContext2D, self: Ship) {
        for(let i = 0; i < this.weapons.length; i++) {
            this.weapons[i].render(ctx, self);
        }
    }
}