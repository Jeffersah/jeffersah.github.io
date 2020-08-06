import { Process } from '../Process';
import CoreState from '../CoreState';
import Instruction from '../Instruction';
import { EInstruction, EMode } from '../InstructionEnums';
import { zip, all, any } from '../../../LinqLike';

export function ApplyCompare(executing: Process, core: CoreState, index: number, instr: Instruction): number[] {
    const [ ai, aInstr ] = core.getIndirectionTarget(index, instr.aAddress, instr.aValue);
    const [ bi, bInstr ] = core.getIndirectionTarget(index, instr.bAddress, instr.bValue);

    const aVal = valuesFromInstruction(instr.mode, aInstr, false);
    const bVal = valuesFromInstruction(instr.mode, aInstr, true);
    const cmp = zip(aVal, bVal, (a, b) => a === b ? 0 : a > b ? 1 : -1);

    switch (instr.instr) {
        case EInstruction.SEQ:
            let shouldJump = all(cmp, op => op === 0);
            if (instr.mode === EMode.I) {
                shouldJump = shouldJump && aInstr.instr === bInstr.instr && aInstr.mode === bInstr.mode;
            }
            return [shouldJump ? index + 2 : index + 1];
        case EInstruction.SNE:
            shouldJump = any(cmp, op => op !== 0);
            if (instr.mode === EMode.I) {
                shouldJump = shouldJump || aInstr.instr !== bInstr.instr || aInstr.mode !== bInstr.mode;
            }
            return [shouldJump ? index + 2 : index + 1];
        case EInstruction.SLT:
            return [ all(cmp, op => op === -1) ? index + 2 : index + 1 ];
    }
}

function valuesFromInstruction(mode: EMode, instr: Instruction, isTarget: boolean) {
    switch (mode) {
        case EMode.A: return [ instr.aValue ];
        case EMode.B: return [ instr.bValue ];
        case EMode.I:
        case EMode.F: return [ instr.aValue, instr.bValue ];
        case EMode.AB: return [ isTarget ? instr.bValue : instr.aValue ];
        case EMode.BA: return [ isTarget ? instr.aValue : instr.bValue ];
        case EMode.X: return isTarget ? [ instr.aValue, instr.bValue ] : [ instr.bValue, instr.aValue ];
    }
}