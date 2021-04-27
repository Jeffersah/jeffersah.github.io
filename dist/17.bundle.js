(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{93:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return b}));var s,r=n(0);!function(t){t[t.production=0]="production",t[t.tokenType=1]="tokenType",t[t.literal=2]="literal",t[t.endOfInput=3]="endOfInput"}(s||(s={}));var i=s;class a{constructor(t,e){this.production=t,this.index=e,this.isFinished()?this.nextState=void 0:this.nextState=new a(t,e+1)}isFinished(){return this.production.patterns.length===this.index}nextPattern(){return this.production.patterns[this.index]}equals(t){return this.production===t.production&&this.index===t.index}toString(){let t="";t+=this.production.name+" -> ";for(let e=0;e<this.production.patterns.length;e++)e===this.index&&(t+=" @"),t+=" "+this.production.patterns[e];return this.index===this.production.patterns.length&&(t+=" @"),t}}class o{constructor(t,e){this.value=t,this.type=e}static Literal(t){return new o(t,i.literal)}static TokenType(t){return new o(t,i.tokenType)}static Production(t){return new o(t,i.production)}static EndOfInput(){return new o("$$",i.endOfInput)}equals(t){return this.value===t.value&&this.type===t.type}priorityCompare(t){return t.type-this.type}toString(){switch(this.type){case i.literal:return this.value;case i.endOfInput:return"$$";case i.tokenType:return"<"+this.value+">";case i.production:return"{"+this.value+"}"}}}class l{constructor(t,e){this.name=t,this.patterns=e,this.firstState=new a(this,0)}static FromString(t){let e=t.indexOf("->"),n=t.substr(0,e).trim(),s=t.substr(e+2).split(" ").map(t=>t.trim()).filter(t=>""!==t);return new l(n,s.map(this.PatternFromString))}static PatternFromString(t){return t.startsWith("{")&&t.endsWith("}")?new o(t.substr(1,t.length-2),i.production):t.startsWith("<")&&t.endsWith(">")?new o(t.substr(1,t.length-2),i.tokenType):"$$"===t?new o("$$",i.endOfInput):new o(t,i.literal)}}class c{constructor(t){this.allProductions=new Map;for(const e of t)this.allProductions.has(e.name)?this.allProductions.get(e.name).push(e):this.allProductions.set(e.name,[e])}static FromGrammarFile(t){const e=[];for(const n of t){const t=n.indexOf("#"),s=n.substr(0,-1===t?n.length:t).trim();0!==s.length&&e.push(l.FromString(s))}return new c(e)}}class h{constructor(t,e,n,s){this.value=t,this.type=e,this.lineNumber=n,this.colNumber=s}firstToken(){return this}matches(t){switch(t.type){case i.literal:return t.value===this.value;case i.tokenType:return t.value===this.type;default:return!1}}toString(){return this.value}}class u{matches(t){return t.type===i.endOfInput}firstToken(){return new h("$$","endOfString",-1,-1)}toString(){return"$$"}}class d{constructor(t){this.parsedStack=[],this.stateStack=[0],this.inputStack=[new u];for(let e=t.length-1;e>=0;e--)this.inputStack.push(t[e])}toString(){let t="Parsed: \r\n\t(0)";for(let e=0;e<this.parsedStack.length;e++)t+=` ${this.parsedStack[e].toString()} (${this.stateStack[e+1]})`;t+="\r\nInput: \r\n\t";for(let e=0;e<this.inputStack.length&&e<10;e++){const n=this.inputStack.length-1-e;t+=" "+this.inputStack[n].toString()}return this.inputStack.length>10&&(t+=" ..."),t}}class p{constructor(t){this.data=[],this.dataStart=0,this.dataLength=0,void 0!==t&&(this.data=[...t],this.dataStart=0,this.dataLength=t.length)}push(t){this.dataLength===this.data.length?0===this.dataStart?(this.data.push(t),this.dataLength++):(this.data=[...this.data,t],this.dataStart=0,this.dataLength++):(this.data[this.normalizeIndex(this.dataLength)]=t,this.dataLength++)}peek(){if(0===this.dataLength)throw new Error("Queue empty");return this.data[this.dataStart]}pop(){if(0===this.dataLength)throw new Error("Queue empty");const t=this.data[this.dataStart];return this.dataStart=this.normalizeIndex(1),this.dataLength--,t}length(){return this.dataLength}peekIndex(t){if(t<0||t>=this.dataLength)throw new Error("Out of range");return this.data[this.normalizeIndex(t)]}normalizeIndex(t){return(t+this.dataStart)%this.data.length}}class m{constructor(t,e){this.states=new Set;let n=new p(t),s=new Set;for(;n.length()>0;){const t=n.pop();if(!this.states.has(t)&&(this.states.add(t),!t.isFinished())){var r=t.nextPattern();if(r.type===i.production&&!s.has(r.value)){s.add(r.value);for(const t of e.get(r.value))n.push(t.firstState)}}}}equals(t){if(this.states.size!==t.states.size)return!1;for(const e of this.states)if(!t.states.has(e))return!1;return!0}toString(){let t="";for(const e of this.states)t+=e.toString()+"\r\n";return t}}var f,g=n(11);class k{constructor(t,e){this.production=t,this.children=e}firstToken(){return this.children[0].firstToken()}matches(t){return t.type===i.production&&t.value===this.production.name}toString(){return"{"+this.production.name+"}"}}class v{constructor(t,e,n){this.id=t,this.key=e,this.owner=n,this.continuations=new Map,this.completedProduction=void 0}generateContinuations(){const t=[...this.key.states].filter(t=>!t.isFinished()),e=[...this.key.states].filter(t=>t.isFinished());if(e.length>1)return!1;1===e.length&&(this.completedProduction=e[0]);const n=Object(g.b)(t,t=>t.nextPattern(),(t,e)=>t.equals(e));for(const[t,e]of n){const n=new m(e.map(t=>t.nextState),this.owner.productions.allProductions);let s=this.owner.getOrCreate(n);if(void 0===s)return!1;this.continuations.set(t,s)}return!0}tryStep(t){const e=t.inputStack[t.inputStack.length-1],n=Array.from(this.continuations.entries()).filter(t=>e.matches(t[0]));if(1===n.length)return t.parsedStack.push(t.inputStack.pop()),t.stateStack.push(n[0][1].id),!0;if(n.length>1)return n.sort(([t],[e])=>t.priorityCompare(e)),console.log(n),t.parsedStack.push(t.inputStack.pop()),t.stateStack.push(n[0][1].id),!0;if(void 0!==this.completedProduction){const e=new Array(this.completedProduction.production.patterns.length);for(let n=this.completedProduction.production.patterns.length-1;n>=0;n--)e[n]=t.parsedStack.pop(),t.stateStack.pop();return t.inputStack.push(new k(this.completedProduction.production,e)),!0}return!1}}class S{constructor(t,e){this.productions=t,this.states=[],this.isValid=!0,this.states[0]=this.getOrCreate(new m(t.allProductions.get(e).map(t=>t.firstState),t.allProductions))}getOrCreate(t){for(const e of this.states)if(e.key.equals(t))return e;const e=new v(this.states.length,t,this);return this.states.push(e),e.generateContinuations()?e:(this.isValid&&(this.invalidStateKey=t),this.isValid=!1,void this.states.pop())}createParseState(t){return new d(t)}step(t){const e=this.states[t.stateStack[t.stateStack.length-1]];return e.tryStep(t)?0===t.inputStack.length?t.parsedStack[0]:t:{badToken:t.inputStack[t.inputStack.length-1].firstToken(),expected:Array.from(e.continuations.keys())}}parse(t){let e=this.createParseState(t);for(;;){const t=this.step(e);if(!this.isParserState(t))return t;e=t}}isParserState(t){return void 0!==t.inputStack}static isSuccessfulResponse(t){return void 0===t.badToken}}!function(t){t[t.push=0]="push",t[t.sendAndDiscard=1]="sendAndDiscard",t[t.newToken=2]="newToken",t[t.individualToken=3]="individualToken"}(f||(f={}));class w extends class extends class{constructor(){}tokenize(t){let e="",n=void 0;const s=[];let r=0,i=0,a=0,o=0,l=()=>{void 0!==n&&this.validateToken(e,n)&&s.push(new h(e,this.getTokenType(e,n),a,o)),e="",n=void 0,a=r,o=i};for(const s of t){const t=this.handleChar(s,e,n);switch(t){case f.push:e+=s;break;case f.sendAndDiscard:l();break;default:switch(t.op){case f.push:e+=s,n=t.state;break;case f.sendAndDiscard:n=t.state,l();break;case f.newToken:l(),e=s,n=t.state;break;case f.individualToken:l(),e=s,n=t.state,l()}}"\n"===s?(r++,i=0):i++}return l(),s}validateToken(t,e){return!0}}{constructor(){super(),this.characterClasses=[]}addCharacterClass(t,e,n,s){this.characterClasses.push({chars:t,tokenType:e,single:n,discard:s})}handleChar(t,e,n){const s=this.characterClasses.filter(e=>-1!==e.chars.indexOf(t));if(0===s.length)return f.sendAndDiscard;if(Object(g.a)(s,t=>{var e;return null!==(e=t.discard)&&void 0!==e&&e}))return f.sendAndDiscard;const r=s.filter(t=>{var e;return!1===(null!==(e=t.single)&&void 0!==e&&e)}).filter(t=>void 0===n||-1!==n.indexOf(t.tokenType));if(0!==r.length)return{op:f.push,state:r.map(t=>t.tokenType)};const i=s.filter(t=>t.single);return i.length>0?{op:f.individualToken,state:i.map(t=>t.tokenType)}:{op:f.newToken,state:s.map(t=>t.tokenType)}}getTokenType(t,e){return e[0]}validateToken(t,e){return t.length>0&&e.length>0}}{constructor(){super(),this.addCharacterClass("0123456789","number"),this.addCharacterClass("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_0123456789","string"),this.addCharacterClass(".:;'\"`!@#$%^&*()+-=[]{}\\~/?<>,","op",!0)}}function y(t){if(void 0!==t.tree.children){const e=t.tree;return r.createElement("div",null,r.createElement("table",null,r.createElement("tbody",null,e.children.map((t,n)=>r.createElement("tr",{key:n,style:{verticalAlign:"top"}},r.createElement("td",{style:{border:"1px solid black",borderWidth:"0 0 1px 4px"}},e.production.patterns[n].toString()),r.createElement("td",{style:{border:"1px solid black",borderWidth:"0 0 1px 0"}},e.production.patterns[n].type===i.literal?r.createElement(r.Fragment,null):r.createElement(y,{tree:t})))))))}return r.createElement("span",null,t.tree.firstToken().value)}function b(){const[t,e]=r.useState("# Enter a grammar definition here\n# supports comments (Starting with '#')\n# Productions are formatted name -> literal <token> {production} ...\n\n# Example grammar for arithmetic:\n# (All left-recursive because this is an LR(1) parser)\n\n# ALL production sets MUST start with a SINGLE root production, which has the pattern root -> {someProduction} $$\nroot -> {arith} $$\n\narith -> {arith} + {multiplication}\narith -> {arith} - {multiplication}\narith -> {multiplication}\n\nmultiplication -> {multiplication} * {value}\nmultiplication -> {multiplication} / {value}\nmultiplication -> {value}\n\nvalue -> <number>\nvalue -> ( {arith} )\n"),[n,s]=r.useState("1 + 1"),[i,a]=r.useState([]),[o,l]=r.useState(void 0),[h,u]=r.useState();let d;if(r.useEffect(()=>{const t=(new w).tokenize(n);a(t)},[n]),r.useEffect(()=>{try{const e=c.FromGrammarFile(t.split("\n")),n=new S(e,"root");l(n)}catch(t){l(void 0)}},[t]),r.useEffect(()=>{if(void 0!==o&&o.isValid&&0!==i.length)try{var t=o.parse(i);u(t)}catch(t){u(void 0)}else u(void 0)},[i,o]),void 0===o||o.isValid)if(void 0===h);else if(S.isSuccessfulResponse(h))d=r.createElement(y,{tree:h});else{let t;t="$$"===h.badToken.value?"Unexpected end-of-string":`Bad token '${h.badToken.value}' at ${h.badToken.lineNumber}:${h.badToken.colNumber}`,d=r.createElement("span",{style:{color:"red"}},"Parser failed. ",t,".")}else d=r.createElement("span",{style:{color:"red"}},"Grammar is invalid."),o.isValid||void 0===o.invalidStateKey||(d=r.createElement("span",{style:{color:"red"}},"Grammar is invalid. The following state is ambiguous:",r.createElement("ul",null,o.invalidStateKey.toString().split("\r\n").map((t,e)=>r.createElement("li",{key:e},t)))));return r.createElement("div",{className:"width-1-1"},r.createElement("div",{className:"width-1-4",style:{verticalAlign:"top",border:"2px solid black"}},r.createElement("h1",null,"Grammar"),r.createElement("textarea",{wrap:"off",style:{resize:"vertical"},className:"width-1-1",value:t,onChange:t=>e(t.target.value)})),r.createElement("div",{className:"width-1-4",style:{verticalAlign:"top",border:"2px solid black"}},r.createElement("h1",null,"Input"),r.createElement("textarea",{wrap:"off",style:{resize:"vertical"},className:"width-1-1",value:n,onChange:t=>s(t.target.value)})),r.createElement("div",{className:"width-1-2",style:{verticalAlign:"top",border:"2px solid black"}},r.createElement("h1",null,"Output"),d))}}}]);
//# sourceMappingURL=17.bundle.js.map