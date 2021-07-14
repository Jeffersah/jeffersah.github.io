import { ArgSimpleVerify } from ".";
import CpuState from "../../cpu/CpuState";
import GameState from "../../GameState";
import { ILevelDefinition, ETestCaseResult } from "../../leveldef/ILevelDefinition";
import { IJumpableArg, IReadableArg, IWriteableArg } from "../ArgInterfaces";
import { IInstructionImplementation } from "../IInstructionImplementation";
import Instruction from "../Instruction";

export class MovImpl implements IInstructionImplementation {
    name = 'mov';

    execute(instr: Instruction, state: GameState): string | ETestCaseResult {
        let value = (instr.args[0] as IReadableArg).read(state);
        if (typeof(value) === 'string') return value;
        if (!instr.silent) state.cpu.flags.set(value);
        return (instr.args[1] as IWriteableArg).write(value, state);
    }

    verify(instr: Instruction, level: ILevelDefinition): string {
        return ArgSimpleVerify(instr, 'read', 'write');
    }
}


export class JmpImpl implements IInstructionImplementation {
    name = 'jmp';

    execute(instr: Instruction, state: GameState): string | ETestCaseResult {
        return state.cpu.tryJump(state, instr.args[0] as IJumpableArg);
    }

    verify(instr: Instruction, level: ILevelDefinition): string {
        if(instr.silent) return 'JMP does not edit flags and cannot be silent';
        return ArgSimpleVerify(instr, 'jump');
    }
}

export class NopImpl implements IInstructionImplementation {
    name = 'nop';

    execute(instr: Instruction, state: GameState): string | ETestCaseResult {
        return undefined;
    }

    verify(instr: Instruction, level: ILevelDefinition): string {
        if(instr.args.length !== 0) return 'NOP takes no arguments';
        if(instr.silent) return 'NOP does not edit flags and cannot be silent';
    }
}

export class HltImpl implements IInstructionImplementation {
    name = 'hlt';

    execute(instr: Instruction, state: GameState): string | ETestCaseResult {
        state.cpu.isHalted = true;
        return undefined;
    }

    verify(instr: Instruction, level: ILevelDefinition): string {
        if(instr.args.length !== 0) return 'HLT takes no arguments';
        if(instr.silent) return 'HLT does not edit flags and cannot be silent';
    }
}

export class TstImpl implements IInstructionImplementation {
    name = 'tst';

    execute(instr: Instruction, state: GameState): string | ETestCaseResult {
        let a = (instr.args[0] as IReadableArg).read(state);
        if (typeof(a) === 'string') return a;
        let b = (instr.args[1] as IReadableArg).read(state);
        if (typeof(b) === 'string') return b;
        state.cpu.flags.set(a - b);
    }

    verify(instr: Instruction, level: ILevelDefinition): string {
        if(instr.silent) return 'TST is only used to edit flags, and so cannot be silenced. Use a NOP instead.';

        if(instr.args.length === 1) return ArgSimpleVerify(instr, 'read');
        else if(instr.args.length === 2) return ArgSimpleVerify(instr, 'read', 'read');
        else return 'Expected 1 or 2 args';
    }
}

