import Point from "../common/position/Point";

enum EAnchorConnectionFlag {
    RR = 1 << 0,

    RB = 1 << 1,
    BR = 1 << 1,

    RL = 1 << 2,
    LR = 1 << 2,

    RT = 1 << 3,
    TR = 1 << 3,

    BB = 1 << 4,

    BL = 1 << 5,
    LB = 1 << 5,

    BT = 1 << 6,
    TB = 1 << 6,

    LL = 1 << 7,

    LT = 1 << 8,
    TL = 1 << 8,

    TT = 1 << 9,
}

export default EAnchorConnectionFlag;