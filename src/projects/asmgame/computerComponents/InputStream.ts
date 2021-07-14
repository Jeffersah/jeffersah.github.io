import Point from "../../common/position/Point";
import GameState from "../GameState";
import { IJumpableArg, IWriteableArg } from "../language/ArgInterfaces";
import { IInstructionImplementation } from "../language/IInstructionImplementation";
import Instruction from "../language/Instruction";
import { ETestCaseResult, ILevelDefinition } from "../leveldef/ILevelDefinition";
import { IComponent } from "./IComponent";

export default class InputStream implements IComponent {
    renderSize: Point;
    inputStack: number[];

    constructor() {
        this.renderSize = new Point(50, 50);

        this.inputStack = [];
    }
    getExtraInstructions(): IInstructionImplementation[] {
        return [ new InpImplementation(this), new PipImplementation(this), new JumpImplementation(this)];
    }

    reset(): void {
        this.inputStack = [];
    }

    tick(): void { }

    animTick(): void { }

    draw(ctx: CanvasRenderingContext2D): void {
    }
}

class InpImplementation implements IInstructionImplementation{
    public name: string = 'inp';
    constructor(private component: InputStream)
    {

    }

    execute(instr: Instruction, state: GameState): string | ETestCaseResult {
        if(this.component.inputStack.length === 0) return 'INP Failed: input stack empty';
        let inputValue = this.component.inputStack.pop();
        if(!instr.silent) state.cpu.flags.set(inputValue);
        if(instr.args.length === 0) return undefined;
        else return (instr.args[0] as IWriteableArg).write(inputValue, state);
    }

    verify(instr: Instruction, level: ILevelDefinition): string {
        if(instr.args.length === 0) return undefined;
        if(instr.args.length !== 1) return "INP (Input) accepts at most 1 arg.";
        if(!instr.args[0].IsWriteable()) return "Destination argument is not a writeable address";
        return undefined;
    }
}

class PipImplementation implements IInstructionImplementation{
    public name: string = 'pip';
    constructor(private component: InputStream)
    {

    }

    execute(instr: Instruction, state: GameState): string | ETestCaseResult {
        if(this.component.inputStack.length === 0) return 'PIP Failed: input stack empty';
        let inputValue = this.component.inputStack[this.component.inputStack.length - 1];
        if(!instr.silent) state.cpu.flags.set(inputValue);
        return (instr.args[0] as IWriteableArg).write(inputValue, state);
    }

    verify(instr: Instruction, level: ILevelDefinition): string {
        if(instr.args.length === 0) return undefined;
        if(instr.args.length !== 1) return "PIP (Peek-Input) requires exactly 1 arg.";
        if(!instr.args[0].IsWriteable()) return "Destination argument is not a writeable address";
        return undefined;
    }
}


class JumpImplementation implements IInstructionImplementation{
    public name: string[] = [ 'jin', 'jni' ];
    
    constructor(private component: InputStream)
    {

    }

    execute(instr: Instruction, state: GameState): string | ETestCaseResult {
        const streamEmpty = this.component.inputStack.length === 0;
        const jumpCondition = instr.instruction === 'jin' ? false : true;
        if(jumpCondition === streamEmpty) {
            return state.cpu.tryJump(state, instr.args[0] as IJumpableArg);
        }
        return undefined;
    }

    verify(instr: Instruction, level: ILevelDefinition): string {
        const name = instr.instruction === 'jin' ? "JIN (Jump-If-Input)" : "JNI (Jump-if-No-Input)";

        if(instr.args.length !== 1) return name + " requires exactly 1 arg.";
        if(!instr.args[0].IsJumpable()) return "Destination argument is not a valid jump target";
        return undefined;
    }
}