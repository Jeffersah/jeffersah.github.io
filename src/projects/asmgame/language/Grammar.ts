const GRAMMAR = `
root -> {instrs} $$

instrs -> {instrs} {lbl_instr}
instrs -> {lbl_instr}

lbl_instr -> {instr}
lbl_instr -> {lbl}

# Need optsemi for comments
lbl -> <string> : {optsemi}

instr -> <string> {optsemi}
instr -> <string> . {flags} {optsemi}
instr -> <string> {arglist} {optsemi}
instr -> <string> . {flags} {arglist} {optsemi}

optsemi -> 
optsemi -> ;

flags -> <string>

arglist -> {arglist} , {arg}
arglist -> {arg}

arg -> {arith}
arg -> @ {arith}
arg -> <string> [ {arith} ]
arg -> <string> [ <string> , {arith} ]

arith -> {arith} + {multiplication}
arith -> {arith} - {multiplication}
arith -> {multiplication}

multiplication -> {multiplication} * {value}
multiplication -> {multiplication} / {value}
multiplication -> {value}

value -> <string>
value -> <number>
value -> ( {arith} )
value -> - {value}
`;

export default GRAMMAR;