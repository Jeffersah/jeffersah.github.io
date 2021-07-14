import { IInstructionImplementation } from "../IInstructionImplementation";
import Instruction from "../Instruction";
import { AddImpl, SubImpl, MulImpl, DivImpl, AndImpl, BOrImpl, XOrImpl } from "./ArithmeticInstructions";
import { HltImpl, JmpImpl, MovImpl, NopImpl, TstImpl } from "./CommonInstructions";

export function ArgSimpleVerify(instr: Instruction, ...types: ('read'|'write'|'jump'|'rw')[]): undefined | string {
    if(types.length !== instr.args.length) return `Expected exactly ${types.length} argument(s)`;
    for(let i = 0; i < types.length; i++) {
        switch(types[i]){
            case 'read':
                if(!instr.args[i].IsReadable()) return `Argument ${i} is not readable`;
                break;
            case 'write':
                if(!instr.args[i].IsWriteable()) return `Argument ${i} is not writeable`;
                break;
            case 'rw':
                if(!instr.args[i].IsReadable()) return `Argument ${i} is not readable`;
                if(!instr.args[i].IsWriteable()) return `Argument ${i} is not writeable`;
                break;
            case 'jump':
                if(!instr.args[i].IsJumpable()) return `Argument ${i} is not a valid jump target`;
                break;
        }
    }
    return undefined;
}

const AllInstructions: IInstructionImplementation[] = [
    new MovImpl(),
    new JmpImpl(),
    new NopImpl(),
    new TstImpl(),

    new AddImpl(),
    new SubImpl(),
    new MulImpl(),
    new DivImpl(),
    new AndImpl(),
    new BOrImpl(),
    new XOrImpl(),

    new HltImpl()
];

export default AllInstructions;