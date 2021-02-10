export interface IWeaponTimingArgs {
    reloadTime: number;

    burstCount: number;
    burstDelay: number;

    shotsPerBurst: number;
}

export class WeaponTimer implements IWeaponTimingArgs {
    public reloadTime: number; 
    public burstCount: number;
    public burstDelay: number; 
    public shotsPerBurst: number;

    private currentlyShooting: boolean;

    public currentReload: number;
    public currentBurstDelay: number;
    public currentBurstIndex: number;

    constructor(args: IWeaponTimingArgs) {
        Object.assign(this, args);
        this.currentlyShooting = false;
        this.currentReload = this.currentBurstDelay = this.currentBurstIndex = 0;
    }

    isShooting(): boolean {
        return this.currentlyShooting;
    }

    canShoot(): boolean {
        return !this.currentlyShooting && this.currentReload === 0;
    }

    shoot(): boolean {
        if(this.canShoot()){
            this.currentlyShooting = true;
            this.currentReload = this.reloadTime;
            this.currentBurstDelay = 0;
            return true;
        }
        return false;
    }

    tick(onShoot: (burstIndex: number, shellIndex: number) => void): void {
        if(this.currentlyShooting) {
            if(this.currentBurstDelay === 0) {
                // Fire burst
                for(let shell = 0; shell < this.shotsPerBurst; shell++) {
                    onShoot(this.currentBurstIndex, shell);
                }
                this.currentBurstIndex++;
                if(this.currentBurstIndex === this.burstCount) {
                    // Done burst! Reset and start reload
                    this.currentReload = this.reloadTime;
                    this.currentBurstIndex = 0;
                    this.currentlyShooting = false;
                } else {
                    this.currentBurstDelay = this.burstDelay;
                }
            } else {
                // Timedown for burst
                this.currentBurstDelay --;
            }
        } else if (this.currentReload !== 0) {
            // Timedown for reload
            this.currentReload--;
        }
    }
}