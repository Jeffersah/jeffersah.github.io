const INS_MASK = 0b11111000;
const MOD_MASK = 0b00000111;
const INS_SHIFT = 3;

export enum EInstruction {
    DAT = 0,
    MOV = 1,
    ADD = 2,
    SUB = 3,
    MUL = 4,
    DIV = 5,
    MOD = 6,
    JMP = 7,
    JMZ = 8,
    JMN = 9,
    DJN = 10,
    SPL = 11,
    SEQ = 12,
    SNE = 13,
    SLT = 14,
    LDP = 15,
    STP = 16,
    NOP = 17
}

export enum EMode {
    A = 0,
    B = 1,
    AB = 2,
    BA = 3,
    F = 4,
    X = 5,
    I = 6,
    //IO = 7 // Non-Standard. ONLY the instruction, neither the A or B fields.
}

// Packs an instruction to a byte
export function Pack(instruction: EInstruction, mod: EMode): number {
    return (instruction << INS_SHIFT) | mod;
}

// Unpack a byte
export function Unpack(ins: number): [EInstruction, EMode] {
    return [ (ins >> INS_SHIFT) as EInstruction, (ins & MOD_MASK) as EMode ];
}