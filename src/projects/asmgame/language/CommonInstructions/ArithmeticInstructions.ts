import CpuState from "../../cpu/CpuState";
import GameState from "../../GameState";
import { ETestCaseResult, ILevelDefinition } from "../../leveldef/ILevelDefinition";
import { IReadableArg, IWriteableArg } from "../ArgInterfaces";
import { ArgSimpleVerify } from "../CommonInstructions";
import { IInstructionImplementation } from "../IInstructionImplementation";
import Instruction from "../Instruction";

abstract class ArithInstr implements IInstructionImplementation {
    abstract name: string;
    
    execute(instr: Instruction, state: GameState): string | ETestCaseResult {
        let v1 = (instr.args[0] as IReadableArg).read(state);
        if (typeof(v1) === 'string') return v1;
        let v2 = (instr.args[1] as IReadableArg).read(state);
        if (typeof(v2) === 'string') return v2;

        const outp = this.calc(v1, v2);

        if (!instr.silent) state.cpu.flags.set(outp);
        return ((instr.args.length === 3 ? instr.args[2] : instr.args[1]) as IWriteableArg).write(outp, state);
    }

    abstract calc(a: number, b: number): number;

    verify(instr: Instruction, level: ILevelDefinition): string {
        if(instr.args.length === 2)
            return ArgSimpleVerify(instr, 'read', 'rw');
        if(instr.args.length === 3)
            return ArgSimpleVerify(instr, 'read', 'read', 'write');
        else
            return 'Expected Exactly 2 or 3 arguments.';
    }
}

export class AddImpl extends ArithInstr {
    name = 'add';

    calc(a: number, b: number): number {
        return a + b;
    }
}

export class SubImpl extends ArithInstr {
    name = 'sub';

    calc(a: number, b: number): number {
        return a - b;
    }
}

export class MulImpl extends ArithInstr {
    name = 'mul';

    calc(a: number, b: number): number {
        return a * b;
    }
}

export class DivImpl extends ArithInstr {
    name = 'div';

    calc(a: number, b: number): number {
        return a / b;
    }
}

export class AndImpl extends ArithInstr {
    name = 'and';

    calc(a: number, b: number): number {
        return a & b;
    }
}

export class BOrImpl extends ArithInstr {
    name = 'bor';

    calc(a: number, b: number): number {
        return a | b;
    }
}

export class XOrImpl extends ArithInstr {
    name = 'xor';

    calc(a: number, b: number): number {
        return a ^ b;
    }
}
