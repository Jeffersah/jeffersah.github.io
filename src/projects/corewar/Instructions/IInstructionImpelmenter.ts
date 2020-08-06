import { Process } from '../Process';
import CoreState from '../CoreState';
import Instruction from '../Instruction';

export type IInstructionImplementer = (executing: Process, core: CoreState, index: number, instr: Instruction) => number[];