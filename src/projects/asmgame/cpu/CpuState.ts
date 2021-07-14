import { IComponent } from "../computerComponents/IComponent";
import GameState from "../GameState";
import { IJumpableArg } from "../language/ArgInterfaces";
import { IInstructionImplementation } from "../language/IInstructionImplementation";
import Instruction from "../language/Instruction";
import { ETestCaseResult } from "../leveldef/ILevelDefinition";

export default class CpuState {
    components: IComponent[];
    program: Instruction[];
    programCounter: number;
    registers: {[key: string]: RegisterState};
    flags: FlagState;

    isHalted: boolean;
    isCrashed: boolean;
    crashMsg: string | undefined;

    private jumpedThisTick: boolean = false;

    reset() {
        for(const rKey of Object.keys(this.registers)) this.registers[rKey].value = 0;
        for(const component of this.components) component.reset();
        this.programCounter = 0;
        this.isCrashed = this.isHalted = false;
        this.crashMsg = undefined;
    }

    tick(allInstructions: { [name: string]: IInstructionImplementation }, state: GameState): undefined | string | ETestCaseResult {
        if(this.programCounter < 0 || this.programCounter >= this.program.length) {
             return `Executed at an invalid address (${this.programCounter})`;
        }
        const instr = this.program[this.programCounter];
        const impl = allInstructions[instr.instruction];
        if(impl === undefined) return `Unrecognized instruction ${instr.instruction}`;

        this.jumpedThisTick = false;
        let result = impl.execute(instr, state);

        if(!this.jumpedThisTick && !this.isHalted && !this.isCrashed)
            this.programCounter++;

        return result;
    }

    crash(err: string) {
        this.isHalted = this.isCrashed = true;
        this.crashMsg = err;
    }

    tryJump(state: GameState, arg: IJumpableArg): undefined | string {
        const tgt = arg.jumpTarget(state);
        if(typeof(tgt) === 'string') {
            return tgt;
        }
        return this.jump(tgt);
    }

    getRegisterValue(registerName: string, state: GameState): number | string{
        if(this.registers[registerName] !== undefined) {
            return this.registers[registerName].value;
        }
        else {
            return state.testCase.extRead(registerName);
        }
    }
    
    setRegisterValue(value: number, registerName: string, state: GameState): undefined | ETestCaseResult | string{
        if(this.registers[registerName] !== undefined) {
            this.registers[registerName].value = value;
            return undefined;
        }
        else {
            return state.testCase.extWrite(registerName, value);
        }
    }

    jump(dest: number): undefined | string {
        this.jumpedThisTick = true;
        if(dest < 0 || dest >= this.program.length) return `CPU jumped to an invalid index ${dest}`;
        this.programCounter = dest;
        return undefined;
    }
}

export class FlagState {
    zero: boolean;
    carry: boolean;
    negative: boolean;

    constructor() {
        this.zero = this.carry = this.negative = false;
    }

    reset() {
        this.zero = this.carry = this.negative = false;
    }

    set(result: number) {
        this.zero = result == 0;
        this.carry = false;
        this.negative = result < 0;
    }
}

export class RegisterState {
    public value: number;
    constructor(public name: string)
    {
        this.value = 0;
    }
}