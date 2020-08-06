import { IInstructionImplementer } from './IInstructionImpelmenter';
import { EInstruction } from '../InstructionEnums';
import { ApplyMathOperation } from './MathImplementers';
import { ApplyMov, ApplyCommon } from './CommonImplementers';
import { ApplyCompare } from './CompareImplementers';
import { ApplyPSpace } from './pSpaceImplementers';

const implementers: { [instr in EInstruction ]: IInstructionImplementer } = {
    [EInstruction.ADD]: ApplyMathOperation,
    [EInstruction.SUB]: ApplyMathOperation,
    [EInstruction.MUL]: ApplyMathOperation,
    [EInstruction.DIV]: ApplyMathOperation,
    [EInstruction.MOD]: ApplyMathOperation,

    [EInstruction.MOV]: ApplyMov,

    [EInstruction.NOP]: ApplyCommon,
    [EInstruction.DAT]: ApplyCommon,
    [EInstruction.JMP]: ApplyCommon,
    [EInstruction.SPL]: ApplyCommon,
    [EInstruction.JMN]: ApplyCommon,
    [EInstruction.JMZ]: ApplyCommon,
    [EInstruction.DJN]: ApplyCommon,

    [EInstruction.SLT]: ApplyCompare,
    [EInstruction.SNE]: ApplyCompare,
    [EInstruction.SEQ]: ApplyCompare,

    [EInstruction.STP]: ApplyPSpace,
    [EInstruction.LDP]: ApplyPSpace,
};

export default implementers;