import CpuState from "../cpu/CpuState";
import GameState from "../GameState";
import { ETestCaseResult, ILevelDefinition } from "../leveldef/ILevelDefinition";
import { IJumpableArg, IReadableArg, IWriteableArg } from "./ArgInterfaces";

// Just a name of a register, for example, "x"
export class RegisterArg implements IReadableArg, IWriteableArg, IJumpableArg {
    
    constructor(public register: string)
    {

    }

    jumpTarget(state: GameState): string | number {
        return state.cpu.getRegisterValue(this.register, state);
    }

    IsReadable(): boolean {
        return true;
    }

    IsWriteable(): boolean {
        return true;
    }
    
    IsJumpable(): boolean {
        return true;
    }

    write(value: number, state: GameState): undefined | string | ETestCaseResult {
        return state.cpu.setRegisterValue(value, this.register, state);
    }

    read(state: GameState): number|string {
        return state.cpu.getRegisterValue(this.register, state);
    }
    
    argType() {
        return EArgType.Register;
    }
    
    verify(level: ILevelDefinition): string {
        if(level.registers.indexOf(this.register) === -1 && level.extRegisters.indexOf(this.register) === -1)
            return `Unrecognized register ${this.register}`;
        return undefined;
    }
}

// An index. Can be any of the following:
// Just a register: "@x"
// Just a value: "@3"
// A register and offset: "x[3]"
// A register and register offset: "x[y]"
// A register and compound offset: "x[y+3]"
export class IndexedArg implements IReadableArg, IWriteableArg {
    constructor(public baseRegister?: string, public offsetRegister?: string, public offset?: number) {

    }

    IsReadable(): boolean {
        return true;
    }

    IsWriteable(): boolean {
        return true;
    }

    IsJumpable(): boolean {
        return false;
    }

    write(value: number, state: GameState): ETestCaseResult {
        throw new Error("Method not implemented.");
    }
    
    read(state: GameState): number {
        throw new Error("Method not implemented.");
    }
    
    argType() {
        return EArgType.Indexed;
    }
    
    verify(level: ILevelDefinition): string {
        if(this.baseRegister !== undefined && level.registers.indexOf(this.baseRegister) === -1 && level.extRegisters.indexOf(this.baseRegister) === -1)
            return `Unrecognized register ${this.baseRegister}`;
        if(this.offsetRegister !== undefined && level.registers.indexOf(this.offsetRegister) === -1 && level.extRegisters.indexOf(this.offsetRegister) === -1)
            return `Unrecognized register ${this.offsetRegister}`;
        return undefined;
    }
}

// A simple numerical arg, for example, "3"
export class NumericalArg implements IReadableArg, IJumpableArg {
    constructor(public value: number) {

    }

    IsReadable(): boolean {
        return true;
    }

    IsWriteable(): boolean {
        return false;
    }

    IsJumpable(): boolean {
        return true;
    }

    read(state: GameState): number {
        return this.value;
    }

    jumpTarget(state: GameState): number {
        return this.value;
    }

    argType() {
        return EArgType.Numerical;
    }
    
    verify(level: ILevelDefinition): string {
        return undefined;
    }
}

export type Arg = RegisterArg | IndexedArg | NumericalArg;
export enum EArgType {
    Register,
    Indexed,
    Numerical
}