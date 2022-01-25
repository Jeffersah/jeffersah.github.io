"use strict";(self.webpackChunktrading_game=self.webpackChunktrading_game||[]).push([[964],{1964:(e,t,a)=>{a.r(t),a.d(t,{default:()=>c});var l=a(7363),r=a(2925),n=a(2401),i=a(6386),o=a(9841);function s(e){if(void 0!==e.tree.children){const t=e.tree;return l.createElement("div",null,l.createElement("table",null,l.createElement("tbody",null,t.children.map(((e,a)=>l.createElement("tr",{key:a,style:{verticalAlign:"top"}},l.createElement("td",{style:{border:"1px solid black",borderWidth:"0 0 1px 4px"}},t.production.patterns[a].toString()),l.createElement("td",{style:{border:"1px solid black",borderWidth:"0 0 1px 0"}},t.production.patterns[a].type===o.Z.literal?l.createElement(l.Fragment,null):l.createElement(s,{tree:e}))))))))}return l.createElement("span",null,e.tree.firstToken().value)}function c(){const[e,t]=l.useState("# Enter a grammar definition here\n# supports comments (Starting with '#')\n# Productions are formatted name -> literal <token> {production} ...\n\n# Example grammar for arithmetic:\n# (All left-recursive because this is an LR(1) parser)\n\n# ALL production sets MUST start with a SINGLE root production, which has the pattern root -> {someProduction} $$\nroot -> {arith} $$\n\narith -> {arith} + {multiplication}\narith -> {arith} - {multiplication}\narith -> {multiplication}\n\nmultiplication -> {multiplication} * {value}\nmultiplication -> {multiplication} / {value}\nmultiplication -> {value}\n\nvalue -> <number>\nvalue -> ( {arith} )\n"),[a,o]=l.useState("1 + 1"),[c,d]=l.useState([]),[u,m]=l.useState(void 0),[p,v]=l.useState();let h;if(l.useEffect((()=>{const e=(new i.Z).tokenize(a);d(e)}),[a]),l.useEffect((()=>{try{const t=r.Z.FromGrammarFile(e.split("\n")),a=new n.Z(t,"root");m(a)}catch(e){m(void 0)}}),[e]),l.useEffect((()=>{if(void 0!==u&&u.isValid&&0!==c.length)try{var e=u.parse(c);v(e)}catch(e){v(void 0)}else v(void 0)}),[c,u]),void 0===u||u.isValid)if(void 0===p);else if(n.Z.isSuccessfulResponse(p))h=l.createElement(s,{tree:p});else{let e;e="$$"===p.badToken.value?"Unexpected end-of-string":`Bad token '${p.badToken.value}' at ${p.badToken.lineNumber}:${p.badToken.colNumber}`,h=l.createElement("span",{style:{color:"red"}},"Parser failed. ",e,".")}else h=l.createElement("span",{style:{color:"red"}},"Grammar is invalid."),u.isValid||void 0===u.invalidStateKey||(h=l.createElement("span",{style:{color:"red"}},"Grammar is invalid. The following state is ambiguous:",l.createElement("ul",null,u.invalidStateKey.toString().split("\r\n").map(((e,t)=>l.createElement("li",{key:t},e))))));return l.createElement("div",{className:"width-1-1"},l.createElement("div",{className:"width-1-4",style:{verticalAlign:"top",border:"2px solid black"}},l.createElement("h1",null,"Grammar"),l.createElement("textarea",{wrap:"off",style:{resize:"vertical"},className:"width-1-1",value:e,onChange:e=>t(e.target.value)})),l.createElement("div",{className:"width-1-4",style:{verticalAlign:"top",border:"2px solid black"}},l.createElement("h1",null,"Input"),l.createElement("textarea",{wrap:"off",style:{resize:"vertical"},className:"width-1-1",value:a,onChange:e=>o(e.target.value)})),l.createElement("div",{className:"width-1-2",style:{verticalAlign:"top",border:"2px solid black"}},l.createElement("h1",null,"Output"),h))}}}]);
//# sourceMappingURL=964.bundle.js.map