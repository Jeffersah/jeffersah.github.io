import { IComponent } from "../../computerComponents/IComponent";
import MemoryComponent from "../../computerComponents/MemoryComponent";
import CpuState from "../../cpu/CpuState";
import { ETestCaseResult, ILevelDefinition, ITestCase } from "../ILevelDefinition";

export default class HanoiLevel implements ILevelDefinition {
    registers: string[];
    extRegisters: string[];
    hasRenderPane: boolean;
    numTestCases: number;
    animFramesPerTick: number;
    name: string;
    components: IComponent[];

    constructor() {
        this.components = [ new MemoryComponent(128) ];
        this.name = 'Hanoi';
        this.registers = [ 'a', 'b', 'x', 'y', 'sp', 'fp' ];
        this.extRegisters = [ 'arm', 'grab' ];
        this.hasRenderPane = true;
        this.numTestCases = 5;
        this.animFramesPerTick = 3;
    }

    initTestCase(caseId: number, cpu: CpuState): ITestCase {
        return new HanoiTestCase(caseId + 1, );
    }
}

class HanoiTestCase implements ITestCase {
    disks: number[][];
    armLocation: number;
    armDisk?: number;

    constructor(public numDisks: number) {
        this.disks = [];
        const firstArr = [];
        for(let i = numDisks - 1; i >= 0; i--) firstArr.push(i);
        this.disks.push(firstArr);
        this.disks.push([]);
        this.disks.push([]);

        this.armLocation = 0;
        this.armDisk = undefined;
    }

    getResult(): ETestCaseResult {
        return (this.disks[0].length === 0 && this.disks[1].length === 0 && this.armDisk === undefined) ? ETestCaseResult.Pass : ETestCaseResult.Fail;
    }

    extRead(register: string): string | number {
        switch(register) {
            case 'arm':
                return this.armLocation;
            case 'grab':
                return this.armDisk === undefined ? 0 : this.armDisk + 1;
            default: return 'Unrecognized Register';
        }
    }

    extWrite(register: string, value: number): string | ETestCaseResult {
        switch(register) {
            case 'arm':
                if(value < 0 || value >= 3) return 'Arm moved out of range!';
                this.armLocation = value;
                return;
            case 'grab':
                if(value <= 0) {
                    if(this.armDisk === undefined) return;

                    const disk = this.armDisk;
                    this.armDisk = undefined;
                    const tower = this.disks[this.armLocation];
                    if(tower.length === 0) {
                        tower.push(disk);
                    }
                    else {
                        tower.push(disk);
                        if(tower[tower.length - 1] > tower[tower.length - 2]) return ETestCaseResult.Fail;
                    }
                }
                else {
                    if(this.armDisk !== undefined) return;
                    if(this.disks[this.armLocation].length !== 0) {
                        this.armDisk = this.disks[this.armLocation].pop();
                    }
                }
            default: return 'Unrecognized Register';
        }
    }

    tick(): ETestCaseResult {
        return undefined;
    }

    animTick(): void {
    }

    draw(ctx: CanvasRenderingContext2D): void {
    }

    destroy(): void {
    }

}