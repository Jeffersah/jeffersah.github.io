import CpuState from "../cpu/CpuState";
import GameState from "../GameState";
import { ETestCaseResult, ILevelDefinition } from "../leveldef/ILevelDefinition";
import { EArgType } from "./ArgImplementations";

export interface IReadableArg extends IArg {
    read(state: GameState): number | string;
}

export interface IWriteableArg extends IArg {
    write(value: number, state: GameState): ETestCaseResult | string | undefined;
}

export interface IJumpableArg extends IArg {
    jumpTarget(state: GameState): string | number;
}

export interface IArg {
    IsReadable(): boolean;
    IsWriteable(): boolean;
    IsJumpable(): boolean;
    argType(): EArgType;

    verify(level: ILevelDefinition): string | undefined;
}