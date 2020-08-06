import { Process } from '../Process';
import CoreState from '../CoreState';
import Instruction from '../Instruction';
import { EMode, EInstruction } from '../InstructionEnums';

export function ApplyMathOperation(executing: Process, core: CoreState, index: number, instr: Instruction): number[] {
    const [_, aInstr] = core.getIndirectionTarget(index, instr.aAddress, instr.aValue);
    const [__, bInstr] = core.getIndirectionTarget(index, instr.bAddress, instr.bValue);

    const srcValues = valuesFromInstruction(instr.mode, aInstr, false).map(i => core.fixIndex(i));
    let tgtValues = valuesFromInstruction(instr.mode, bInstr, true).map(i => core.fixIndex(i));
    // Die on div/mod by 0
    let shouldDie = tgtValues[0] === 0 || (tgtValues.length > 1 && tgtValues[1] === 0);

    switch (instr.instr) {
        case EInstruction.ADD:
            shouldDie = false;
            zip(srcValues, tgtValues, (a, b) => a + b);
            break;
        case EInstruction.SUB:
            shouldDie = false;
            zip(srcValues, tgtValues, (a, b) => a - b);
            break;
        case EInstruction.MUL:
            shouldDie = false;
            zip(srcValues, tgtValues, (a, b) => a * b);
            break;
        case EInstruction.DIV:
            zip(srcValues, tgtValues, (a, b) => b === 0 ? 0 : a / b);
            break;
        case EInstruction.MOD:
            zip(srcValues, tgtValues, (a, b) => b === 0 ? 0 : a % b);
            break;
    }

    tgtValues = tgtValues.map(i => core.fixIndex(i));
    setValues(instr.mode, bInstr, tgtValues);

    return shouldDie ? [] : [ index + 1 ];
}

function zip(a: number[], b: number[], op: (a: number, b: number) => number) {
    for (let i = 0; i < b.length; i++) {
        b[i] = op(a[i], b[i]);
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

function setValues(mode: EMode, instr: Instruction, values: number[]) {
    switch (mode) {
        case EMode.A:
        case EMode.BA:
            instr.aValue = values[0];
            return;
        case EMode.B:
        case EMode.AB:
            instr.bValue = values[0];
            return;
        case EMode.I:
        case EMode.F:
        case EMode.X:
            instr.aValue = values[0];
            instr.bValue = values[1];
            break;
    }
}