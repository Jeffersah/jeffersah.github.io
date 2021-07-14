import { IComponent } from "../computerComponents/IComponent";
import CpuState from "../cpu/CpuState";

export interface ILevelDefinition {
    components: IComponent[];
    name: string;
    /** Built-in register names (usually x, y, a, b) */
    registers: string[];
    /** External registers provided for program IO */
    extRegisters: string[];
    /** True if the level has a custom rendering pane */
    hasRenderPane: boolean;

    numTestCases: number;
    animFramesPerTick: number;

    /** Called when a test case is loaded/reset */
    initTestCase(caseId: number, cpu: CpuState): ITestCase;
}

export interface ITestCase {
    /** Called if the program halts to check if the level is completed successfully. */
    getResult(): ETestCaseResult;

    /** Called when a CPU instruction tries to read from an external register. Return a string to crash the program */
    extRead(register: string): number | string;

    /** Called when a CPU instruction writes to an external register. Return a string to crash the program */
    extWrite(register: string, value: number): ETestCaseResult | string;

    /** Called when the CPU runs one tick. */
    tick(): ETestCaseResult | undefined;

    /** Called once per animation frame, whether or not the CPU is running. */
    animTick(): void;

    /** Called to render the level */
    draw(ctx: CanvasRenderingContext2D): void;

    destroy(): void;
}

export enum ETestCaseResult {
    Pass,
    Fail
}