import { Process } from '../Process';
import CoreState from '../CoreState';
import Instruction from '../Instruction';

export function ApplyPSpace(executing: Process, core: CoreState, index: number, instr: Instruction): number[] {
    // TODO: NOT SUPPORTED
    return [ index + 1 ];
}