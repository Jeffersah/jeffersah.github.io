import CpuState from "../cpu/CpuState";
import GameState from "../GameState";
import { ETestCaseResult, ILevelDefinition } from "../leveldef/ILevelDefinition";
import Instruction from "./Instruction";

export interface IInstructionImplementation {
    name: string | string[];

    execute(instr: Instruction, state: GameState): undefined | string | ETestCaseResult;
    verify(instr: Instruction, level: ILevelDefinition): undefined | string;
}

export function allInstructionNames(instr: IInstructionImplementation) {
    if(typeof(instr.name) === 'string') return [instr.name];
    return instr.name;
}