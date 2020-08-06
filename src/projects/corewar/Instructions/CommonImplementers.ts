import { Process } from '../Process';
import CoreState from '../CoreState';
import Instruction from '../Instruction';
import { EInstruction, EMode } from '../InstructionEnums';

export function ApplyMov(executing: Process, core: CoreState, index: number, instr: Instruction): number[] {
    const [ai, aInstr] = core.getIndirectionTarget(index, instr.aAddress, instr.aValue);
    const [bi, bInstr] = core.getIndirectionTarget(index, instr.bAddress, instr.bValue);

    switch (instr.mode) {
        case EMode.A:
            bInstr.aValue = aInstr.aValue;
            break;
        case EMode.B:
            bInstr.bValue = aInstr.bValue;
            break;
        case EMode.AB:
            bInstr.bValue = aInstr.aValue;
            break;
        case EMode.BA:
            bInstr.aValue = aInstr.bValue;
            break;
        case EMode.F:
            bInstr.aValue = aInstr.aValue;
            bInstr.bValue = aInstr.bValue;
            break;
        case EMode.X:
            bInstr.bValue = aInstr.aValue;
            bInstr.aValue = aInstr.bValue;
            break;
        case EMode.I:
            bInstr.bValue = aInstr.aValue;
            bInstr.aValue = aInstr.bValue;
            bInstr.instr = aInstr.instr;
            bInstr.mode = aInstr.mode;
            break;
    }
    return [ index + 1 ];
}

export function ApplyCommon(executing: Process, core: CoreState, index: number, instr: Instruction): number[] {
    const [ ai, aInstr ] = core.getIndirectionTarget(index, instr.aAddress, instr.aValue);
    const [ bi, bInstr ] = core.getIndirectionTarget(index, instr.bAddress, instr.bValue);

    switch (instr.instr) {
        case EInstruction.DAT: return [];
        case EInstruction.NOP: return [ index + 1 ];
        case EInstruction.JMP: return [ ai ];
        case EInstruction.SPL: return [ index + 1, ai ];
        case EInstruction.JMN:
        case EInstruction.JMZ:
            return (() => {
                const values = valuesFromInstruction(instr.mode, bInstr, true);
                const allZero = values[0] === 0 && (values.length === 1 || values[1] === 0);
                const shouldJump = (allZero) === (instr.instr === EInstruction.JMZ);
                return [ shouldJump ? ai : index + 1 ];
            })();
        case EInstruction.DJN:
            return (() => {
                const values = valuesFromInstructionDec(instr.mode, bInstr, true);
                const allZero = values[0] === 0 && (values.length === 1 || values[1] === 0);
                const shouldJump = !allZero;
                return [ shouldJump ? ai : index + 1 ];
            })();
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


function valuesFromInstructionDec(mode: EMode, instr: Instruction, isTarget: boolean) {
    switch (mode) {
        case EMode.A: return [ --instr.aValue ];
        case EMode.B: return [ --instr.bValue ];
        case EMode.I:
        case EMode.F: return [ --instr.aValue, --instr.bValue ];
        case EMode.AB: return [ isTarget ? --instr.bValue : --instr.aValue ];
        case EMode.BA: return [ isTarget ? --instr.aValue : --instr.bValue ];
        case EMode.X: return isTarget ? [ --instr.aValue, --instr.bValue ] : [ --instr.bValue, --instr.aValue ];
    }
}
