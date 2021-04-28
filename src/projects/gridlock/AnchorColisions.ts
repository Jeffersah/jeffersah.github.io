import EAnchorConnectionFlag from "./EAnchorConnectionFlag";

const AnchorColisions: [EAnchorConnectionFlag, EAnchorConnectionFlag][] = [

    [ EAnchorConnectionFlag.LR, 0b1111111111 ],
    [ EAnchorConnectionFlag.TB, 0b1111111111 ],

    [ EAnchorConnectionFlag.RB, EAnchorConnectionFlag.RB |  EAnchorConnectionFlag.LB | EAnchorConnectionFlag.TR | EAnchorConnectionFlag.RR | EAnchorConnectionFlag.BB ],
    [ EAnchorConnectionFlag.RT, EAnchorConnectionFlag.RT |  EAnchorConnectionFlag.LT | EAnchorConnectionFlag.RB | EAnchorConnectionFlag.RR | EAnchorConnectionFlag.TT ],
    [ EAnchorConnectionFlag.BL, EAnchorConnectionFlag.BL |  EAnchorConnectionFlag.RB | EAnchorConnectionFlag.TL | EAnchorConnectionFlag.BB | EAnchorConnectionFlag.LL ],
    [ EAnchorConnectionFlag.LT, EAnchorConnectionFlag.LT |  EAnchorConnectionFlag.RT | EAnchorConnectionFlag.LB | EAnchorConnectionFlag.LL | EAnchorConnectionFlag.TT ],
    
    [ EAnchorConnectionFlag.RR, 0 ],
    [ EAnchorConnectionFlag.BB, 0 ],
    [ EAnchorConnectionFlag.LL, 0 ],
    [ EAnchorConnectionFlag.TT, 0 ],
]

export default { colisions: AnchorColisions, crossoverColisions: [
    [ EAnchorConnectionFlag.LR, EAnchorConnectionFlag.LR ],
    [ EAnchorConnectionFlag.TB, EAnchorConnectionFlag.TB ],
    
    [ EAnchorConnectionFlag.RB, EAnchorConnectionFlag.RB ],
    [ EAnchorConnectionFlag.RT, EAnchorConnectionFlag.RT ],
    [ EAnchorConnectionFlag.BL, EAnchorConnectionFlag.BL ],
    [ EAnchorConnectionFlag.LT, EAnchorConnectionFlag.LT ],
    
    [ EAnchorConnectionFlag.RR, 0 ],
    [ EAnchorConnectionFlag.BB, 0 ],
    [ EAnchorConnectionFlag.LL, 0 ],
    [ EAnchorConnectionFlag.TT, 0 ],
] };