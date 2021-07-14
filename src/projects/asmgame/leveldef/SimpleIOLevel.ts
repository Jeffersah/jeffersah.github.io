import { IComponent } from "../computerComponents/IComponent";
import CpuState from "../cpu/CpuState";
import { ETestCaseResult, ILevelDefinition, ITestCase } from "./ILevelDefinition";

export abstract class SimpleIOLevel implements ILevelDefinition {
    abstract registers: string[];
    abstract numTestCases: number;
    abstract name: string;

    hasRenderPane: boolean;
    extRegisters: string[];
    animFramesPerTick: number;
    components: IComponent[];

    constructor() {
        this.components = [];
        this.hasRenderPane = false;
        this.extRegisters = [];
        this.animFramesPerTick = 1;
    }

    abstract initTestCase(caseId: number, cpu: CpuState): ITestCase;
}