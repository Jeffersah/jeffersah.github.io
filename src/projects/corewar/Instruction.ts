import { EInstruction, EMode } from './InstructionEnums';
import { EAddressMode } from './FieldEnums';

export default class Instruction {
    constructor(public instr: EInstruction, public mode: EMode, public aAddress: EAddressMode, public bAddress: EAddressMode, public aValue: number, public bValue: number) {

    }
}