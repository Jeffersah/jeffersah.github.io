import Instruction from './Instruction';
import { EInstruction, EMode } from './InstructionEnums';
import { EAddressMode } from './FieldEnums';
import { Process } from './Process';
import Queue from '../common/data/queue';
import Program from './Program';
import ICoreSettings from './ICoreSettings';


export default class CoreState {
    private data: Instruction[];
    constructor(public settings: ICoreSettings) {
        this.data = new Array(settings.coreLength);
        for (let i = 0; i < this.data.length; i++) {
            this.data[i] = new Instruction(EInstruction.DAT, EMode.F, EAddressMode.Direct, EAddressMode.Direct, 0, 0);
        }
    }

    public length(): number {
        return this.data.length;
    }

    public get(index: number) {
        return this.data[this.fixIndex(index)];
    }

    public getIndirectionTarget(index: number, indirectionMode: EAddressMode, indirectionValue: number): [number, Instruction] {
        if (indirectionMode === EAddressMode.Immedate) return [index, this.get(index)];
        else if (indirectionMode === EAddressMode.Direct) return [index + indirectionValue, this.get(index + indirectionValue)];

        const indirectionIndex = index + indirectionValue;
        const indirectionTgt = this.get(indirectionIndex);

        let tgtIndex;
        switch (indirectionMode) {
            case EAddressMode.AIndirect:
                tgtIndex = (indirectionIndex + indirectionTgt.aValue);
                break;
            case EAddressMode.APredecrement:
                tgtIndex = (indirectionIndex + (--indirectionTgt.aValue));
                break;
            case EAddressMode.APostincrement:
                tgtIndex = (indirectionIndex + (indirectionTgt.aValue++));
                break;
            case EAddressMode.BIndirect:
                tgtIndex = (indirectionIndex + indirectionTgt.bValue);
                break;
            case EAddressMode.BPredecrement:
                tgtIndex = (indirectionIndex + (--indirectionTgt.bValue));
                break;
            case EAddressMode.BPostincrement:
                tgtIndex = (indirectionIndex + (indirectionTgt.bValue++));
                break;
        }
        return [tgtIndex, this.get(tgtIndex)];
    }

    public set(index: number, instr: Instruction) {
        this.data[this.fixIndex(index)] = instr;
    }

    public fixIndex(index: number) {
        index %= this.data.length;
        if (index < 0) index += this.data.length;
        return index;
    }

    public init(program: Program, index: number) {
        for (let i = 0; i < program.instructions.length; i++) {
            this.set(index + i, program.instructions[i]);
        }
    }
}