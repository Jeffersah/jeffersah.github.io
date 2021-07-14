import { IInstructionImplementer } from "../corewar/Instructions/IInstructionImpelmenter";
import CpuState from "./cpu/CpuState";
import AllInstructions from "./language/CommonInstructions";
import { allInstructionNames, IInstructionImplementation } from "./language/IInstructionImplementation";
import { ETestCaseResult, ILevelDefinition, ITestCase } from "./leveldef/ILevelDefinition";

export default class GameState {
    
    private allInstructions:  { [name: string]: IInstructionImplementation };

    constructor(public cpu: CpuState, public level: ILevelDefinition, public testCase: ITestCase) {
        this.allInstructions = GameState.GetAllInstructions(level);
        this.cpu.reset();
    }

    public tick(): undefined | string | ETestCaseResult {
        return this.cpu.tick(this.allInstructions, this);
    }

    static GetAllInstructions(level: ILevelDefinition): { [name: string]: IInstructionImplementation }
    {
        const allInstructions: { [name:string]: IInstructionImplementation } = {};
        for(const instruction of AllInstructions) {
            for(const name of allInstructionNames(instruction)) {
                allInstructions[name] = instruction;
            }
        }
        
        for(const component of level.components) {
            for(const instruction of component.getExtraInstructions()) {
                for(const name of allInstructionNames(instruction)) {
                    allInstructions[name] = instruction;
                }
            }
        }

        return allInstructions;
    }
}