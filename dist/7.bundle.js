(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{65:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=function(e){if(e&&e.__esModule)return e;if(null===e||"object"!==l(e)&&"function"!=typeof e)return{default:e};var t=c();if(t&&t.has(e))return t.get(e);var n={},a=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var r in e)if(Object.prototype.hasOwnProperty.call(e,r)){var o=a?Object.getOwnPropertyDescriptor(e,r):null;o&&(o.get||o.set)?Object.defineProperty(n,r,o):n[r]=e[r]}n.default=e,t&&t.set(e,n);return n}(n(0)),r=i(n(19)),o=i(n(69));function i(e){return e&&e.__esModule?e:{default:e}}function c(){if("function"!=typeof WeakMap)return null;var e=new WeakMap;return c=function(){return e},e}function l(e){return(l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function m(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}function d(e){return(d=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function u(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function p(e,t){return(p=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var f=function(e){function t(e){var n,a,r;return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,t),a=this,(n=!(r=d(t).call(this,e))||"object"!==l(r)&&"function"!=typeof r?u(a):r).state={selected:n.parseValue(e.value,e.options)||{label:void 0===e.placeholder?"Select...":e.placeholder,value:""},isOpen:!1},n.mounted=!0,n.handleDocumentClick=n.handleDocumentClick.bind(u(n)),n.fireChangeEvent=n.fireChangeEvent.bind(u(n)),n}var n,i,c;return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&p(e,t)}(t,e),n=t,(i=[{key:"componentWillReceiveProps",value:function(e){if(e.value){var t=this.parseValue(e.value,e.options);t!==this.state.selected&&this.setState({selected:t})}else this.setState({selected:{label:void 0===e.placeholder?"Select...":e.placeholder,value:""}})}},{key:"componentDidMount",value:function(){document.addEventListener("click",this.handleDocumentClick,!1),document.addEventListener("touchend",this.handleDocumentClick,!1)}},{key:"componentWillUnmount",value:function(){this.mounted=!1,document.removeEventListener("click",this.handleDocumentClick,!1),document.removeEventListener("touchend",this.handleDocumentClick,!1)}},{key:"handleMouseDown",value:function(e){this.props.onFocus&&"function"==typeof this.props.onFocus&&this.props.onFocus(this.state.isOpen),"mousedown"===e.type&&0!==e.button||(e.stopPropagation(),e.preventDefault(),this.props.disabled||this.setState({isOpen:!this.state.isOpen}))}},{key:"parseValue",value:function(e,t){var n;if("string"==typeof e)for(var a=0,r=t.length;a<r;a++)if("group"===t[a].type){var o=t[a].items.filter((function(t){return t.value===e}));o.length&&(n=o[0])}else void 0!==t[a].value&&t[a].value===e&&(n=t[a]);return n||e}},{key:"setValue",value:function(e,t){var n={selected:{value:e,label:t},isOpen:!1};this.fireChangeEvent(n),this.setState(n)}},{key:"fireChangeEvent",value:function(e){e.selected!==this.state.selected&&this.props.onChange&&this.props.onChange(e.selected)}},{key:"renderOption",value:function(e){var t,n=e.value;void 0===n&&(n=e.label||e);var r=e.label||e.value||e,i=n===this.state.selected.value||n===this.state.selected,c=(s(t={},"".concat(this.props.baseClassName,"-option"),!0),s(t,e.className,!!e.className),s(t,"is-selected",i),t),l=(0,o.default)(c);return a.default.createElement("div",{key:n,className:l,onMouseDown:this.setValue.bind(this,n,r),onClick:this.setValue.bind(this,n,r),role:"option","aria-selected":i?"true":"false"},r)}},{key:"buildMenu",value:function(){var e=this,t=this.props,n=t.options,r=t.baseClassName,o=n.map((function(t){if("group"===t.type){var n=a.default.createElement("div",{className:"".concat(r,"-title")},t.name),o=t.items.map((function(t){return e.renderOption(t)}));return a.default.createElement("div",{className:"".concat(r,"-group"),key:t.name,role:"listbox",tabIndex:"-1"},n,o)}return e.renderOption(t)}));return o.length?o:a.default.createElement("div",{className:"".concat(r,"-noresults")},"No options found")}},{key:"handleDocumentClick",value:function(e){this.mounted&&(r.default.findDOMNode(this).contains(e.target)||this.state.isOpen&&this.setState({isOpen:!1}))}},{key:"isValueSelected",value:function(){return"string"==typeof this.state.selected||""!==this.state.selected.value}},{key:"render",value:function(){var e,t,n,r,i,c=this.props,l=c.baseClassName,m=c.controlClassName,d=c.placeholderClassName,u=c.menuClassName,p=c.arrowClassName,f=c.arrowClosed,h=c.arrowOpen,g=c.className,y=this.props.disabled?"Dropdown-disabled":"",v="string"==typeof this.state.selected?this.state.selected:this.state.selected.label,b=(0,o.default)((s(e={},"".concat(l,"-root"),!0),s(e,g,!!g),s(e,"is-open",this.state.isOpen),e)),E=(0,o.default)((s(t={},"".concat(l,"-control"),!0),s(t,m,!!m),s(t,y,!!y),t)),S=(0,o.default)((s(n={},"".concat(l,"-placeholder"),!0),s(n,d,!!d),s(n,"is-selected",this.isValueSelected()),n)),k=(0,o.default)((s(r={},"".concat(l,"-menu"),!0),s(r,u,!!u),r)),w=(0,o.default)((s(i={},"".concat(l,"-arrow"),!0),s(i,p,!!p),i)),x=a.default.createElement("div",{className:S},v),C=this.state.isOpen?a.default.createElement("div",{className:k,"aria-expanded":"true"},this.buildMenu()):null;return a.default.createElement("div",{className:b},a.default.createElement("div",{className:E,onMouseDown:this.handleMouseDown.bind(this),onTouchEnd:this.handleMouseDown.bind(this),"aria-haspopup":"listbox"},x,a.default.createElement("div",{className:"".concat(l,"-arrow-wrapper")},h&&f?this.state.isOpen?h:f:a.default.createElement("span",{className:w}))),C)}}])&&m(n.prototype,i),c&&m(n,c),t}(a.Component);f.defaultProps={baseClassName:"Dropdown"};var h=f;t.default=h},67:function(e,t,n){"use strict";n.d(t,"a",(function(){return r}));var a=n(0);function r(e,t){const[n,r]=Object(a.useState)(e);return[n,e=>{t(e,n),r(e)}]}},69:function(e,t,n){var a;
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/!function(){"use strict";var n={}.hasOwnProperty;function r(){for(var e=[],t=0;t<arguments.length;t++){var a=arguments[t];if(a){var o=typeof a;if("string"===o||"number"===o)e.push(a);else if(Array.isArray(a)&&a.length){var i=r.apply(null,a);i&&e.push(i)}else if("object"===o)for(var c in a)n.call(a,c)&&a[c]&&e.push(c)}}return e.join(" ")}e.exports?(r.default=r,e.exports=r):void 0===(a=function(){return r}.apply(t,[]))||(e.exports=a)}()},70:function(e,t,n){var a=n(71),r=n(72);"string"==typeof(r=r.__esModule?r.default:r)&&(r=[[e.i,r,""]]);var o={insert:"head",singleton:!1};a(r,o);e.exports=r.locals||{}},71:function(e,t,n){"use strict";var a,r=function(){return void 0===a&&(a=Boolean(window&&document&&document.all&&!window.atob)),a},o=function(){var e={};return function(t){if(void 0===e[t]){var n=document.querySelector(t);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}e[t]=n}return e[t]}}(),i=[];function c(e){for(var t=-1,n=0;n<i.length;n++)if(i[n].identifier===e){t=n;break}return t}function l(e,t){for(var n={},a=[],r=0;r<e.length;r++){var o=e[r],l=t.base?o[0]+t.base:o[0],s=n[l]||0,m="".concat(l," ").concat(s);n[l]=s+1;var d=c(m),u={css:o[1],media:o[2],sourceMap:o[3]};-1!==d?(i[d].references++,i[d].updater(u)):i.push({identifier:m,updater:g(u,t),references:1}),a.push(m)}return a}function s(e){var t=document.createElement("style"),a=e.attributes||{};if(void 0===a.nonce){var r=n.nc;r&&(a.nonce=r)}if(Object.keys(a).forEach((function(e){t.setAttribute(e,a[e])})),"function"==typeof e.insert)e.insert(t);else{var i=o(e.insert||"head");if(!i)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");i.appendChild(t)}return t}var m,d=(m=[],function(e,t){return m[e]=t,m.filter(Boolean).join("\n")});function u(e,t,n,a){var r=n?"":a.media?"@media ".concat(a.media," {").concat(a.css,"}"):a.css;if(e.styleSheet)e.styleSheet.cssText=d(t,r);else{var o=document.createTextNode(r),i=e.childNodes;i[t]&&e.removeChild(i[t]),i.length?e.insertBefore(o,i[t]):e.appendChild(o)}}function p(e,t,n){var a=n.css,r=n.media,o=n.sourceMap;if(r?e.setAttribute("media",r):e.removeAttribute("media"),o&&btoa&&(a+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(o))))," */")),e.styleSheet)e.styleSheet.cssText=a;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(a))}}var f=null,h=0;function g(e,t){var n,a,r;if(t.singleton){var o=h++;n=f||(f=s(t)),a=u.bind(null,n,o,!1),r=u.bind(null,n,o,!0)}else n=s(t),a=p.bind(null,n,t),r=function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(n)};return a(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap)return;a(e=t)}else r()}}e.exports=function(e,t){(t=t||{}).singleton||"boolean"==typeof t.singleton||(t.singleton=r());var n=l(e=e||[],t);return function(e){if(e=e||[],"[object Array]"===Object.prototype.toString.call(e)){for(var a=0;a<n.length;a++){var r=c(n[a]);i[r].references--}for(var o=l(e,t),s=0;s<n.length;s++){var m=c(n[s]);0===i[m].references&&(i[m].updater(),i.splice(m,1))}n=o}}}},72:function(e,t,n){(t=n(73)(!1)).push([e.i,"@keyframes TfJKhdeIeGd7I5NeuwS__ {\r\n    from {\r\n        color: #eee\r\n    }\r\n    to {\r\n        color: #0f0\r\n    }\r\n}\r\n\r\n@keyframes _3RKrieD5i9rhTUz--xXsAl {\r\n    from {\r\n        color: #eee\r\n    }\r\n    to {\r\n        color: rgb(255, 196, 0)\r\n    }\r\n}\r\n\r\n@keyframes SUPvE8yFBtcLCzFhbH-gb {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}\r\n\r\n._1QLIoi0mB0v8zOZfTD3rSw {\r\n    font-family: 'Share Tech Mono', monospace;\r\n}\r\n  \r\n._1jBBT5y4dy02HAkRQrRaTV {\r\n    animation-name: SUPvE8yFBtcLCzFhbH-gb;\r\n    animation-duration: 1s;\r\n    animation-fill-mode: both;\r\n    animation-iteration-count: 1;\r\n}\r\n\r\n._3_A2MmrqZiJvr-Cwfq1vTY {\r\n    width: 240px;\r\n    display: inline-block;\r\n}\r\n\r\n.A4KICqLfJmxnwsABVUo8b {\r\n    animation-name: TfJKhdeIeGd7I5NeuwS__;\r\n    animation-duration: 250ms;\r\n    animation-iteration-count: 9;\r\n    animation-direction: alternate;\r\n    animation-fill-mode: both;\r\n}\r\n\r\n\r\n._3UXtcnWbOcZ3f_ugQWdDA0 {\r\n    animation-name: _3RKrieD5i9rhTUz--xXsAl;\r\n    animation-duration: 500ms;\r\n    animation-timing-function: steps(2, jump-none);\r\n    animation-iteration-count: infinite;\r\n    animation-direction: alternate;\r\n    animation-fill-mode: both;\r\n}\r\n\r\n._27tAawBso3AHyzyd8Rk0c5 {\r\n    display: flex;\r\n    flex-flow: column;\r\n    flex-grow: 1;\r\n}\r\n\r\n._2-mUSKQSVAtYQxsL2HELqF {\r\n    flex-grow: 1;\r\n}\r\n\r\n.rAZIhtNz78WrFYjLsZUwL {\r\n    display: flex;\r\n    flex-flow: column;\r\n    flex-grow: 1;\r\n    border: 2px solid #eee;\r\n    padding: 0 10px 0 10px;\r\n    \r\n    align-items: stretch;\r\n}\r\n\r\n._3hdbSlXrKJvbTxBUSNSttz {\r\n    width: 30%;\r\n}\r\n\r\n.qNe3IsuYS2uVyeSsO9oK7 {\r\n    border: 0 solid #eee;\r\n    border-bottom-width: 2px;\r\n    padding-bottom: 4px;\r\n    padding-top: 4px;\r\n}\r\n\r\n._1oa29PZJSoz9W49BzlxWzx {\r\n\r\n}\r\n\r\n@keyframes VIarMpRxjIRy14KT0lnnh {\r\n    from { color: #eee }\r\n    to { color: #ff0 }\r\n}\r\n._8KGue__zn1DlOoWFCqMGZ {\r\n    animation-name: VIarMpRxjIRy14KT0lnnh;\r\n    animation-timing-function: steps(2, jump-none);\r\n    animation-duration: 1s;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n@keyframes _2CYAIwkx1N-rMpGE8m5lYc {\r\n    from { color: #eee }\r\n    to { color: #f00 }\r\n}\r\n.bMUNFpaCe_jNugxK6vefe {\r\n    animation-name: _2CYAIwkx1N-rMpGE8m5lYc;\r\n    animation-timing-function: steps(2, jump-none);\r\n    animation-duration: 500ms;\r\n    animation-iteration-count: infinite;\r\n}\r\n.w4yT9moWFVW4_DBVblctv {\r\n    color: #666;\r\n}\r\n\r\n@keyframes qCkDZT5ISrd8DU9dQ7nGO {\r\n    0% {\r\n        background-color: #d00f;\r\n    }\r\n    50% {\r\n        background-color: #d00a;\r\n    }\r\n    100% {\r\n        background-color: #d00f;\r\n    }\r\n}\r\n\r\n._2oIbebvRwim_UY3_R3Vgi {\r\n    pointer-events: none;\r\n\r\n    position: absolute;\r\n    left: 0;\r\n    top: 0;\r\n    right: 0;\r\n    bottom: 50%;\r\n    transform: translateY(50%);\r\n    z-index: 100;\r\n}\r\n\r\n._2yXZScY9s8rRIPinztqrzE {\r\n    width: 100%;\r\n    height: 100%;\r\n    background-color: #d00;\r\n    animation-name: qCkDZT5ISrd8DU9dQ7nGO;\r\n    animation-timing-function: linear;\r\n    animation-duration: 3s;\r\n    animation-iteration-count: infinite;\r\n}\r\n\r\n@keyframes _2gO2_MddUkrNyWuhqOH851 {\r\n    from {\r\n        background-position: 0, 0;\r\n    }\r\n    to {\r\n        background-position: 104%, 0;\r\n    } \r\n}\r\n\r\n._3jLhHFcSZgeoEuF8uyeSrv {\r\n    width: 100%;\r\n    height: 10%;\r\n    background-size: 200%, 100%;\r\n    animation-name: _2gO2_MddUkrNyWuhqOH851;\r\n    animation-timing-function: linear;\r\n    animation-duration: 6s;\r\n    animation-iteration-count: infinite;\r\n    background-image: repeating-linear-gradient(45deg, red 0%,red 2%, black 2%, black 4%);\r\n}\r\n\r\n._3jLhHFcSZgeoEuF8uyeSrv.cd3Y9q7NQBjM0ZCNxD0bD {\r\n    transform: scaleX(-100%)\r\n}\r\n\r\n._1wcxKlQvOV62HX3uhUwW-0 {\r\n    font-weight: 800;\r\n    font-size: 400%;\r\n    font-stretch: expanded;\r\n}\r\n._3zgWWYz8O-NjVUNr-zJr9G {\r\n    font-weight: 800;\r\n    font-size: 200%;\r\n}",""]),t.locals={main:"_1QLIoi0mB0v8zOZfTD3rSw",body:"_1jBBT5y4dy02HAkRQrRaTV","fade-in":"SUPvE8yFBtcLCzFhbH-gb",status:"_3_A2MmrqZiJvr-Cwfq1vTY","status-operational":"A4KICqLfJmxnwsABVUo8b","operational-anim":"TfJKhdeIeGd7I5NeuwS__","status-ready":"_3UXtcnWbOcZ3f_ugQWdDA0","ready-anim":"_3RKrieD5i9rhTUz--xXsAl","flex-col":"_27tAawBso3AHyzyd8Rk0c5","flex-fill":"_2-mUSKQSVAtYQxsL2HELqF","mech-container":"rAZIhtNz78WrFYjLsZUwL","fixed-col":"_3hdbSlXrKJvbTxBUSNSttz","detail-row":"qNe3IsuYS2uVyeSsO9oK7","title-good":"_1oa29PZJSoz9W49BzlxWzx","title-damaged":"_8KGue__zn1DlOoWFCqMGZ","blink-yellow":"VIarMpRxjIRy14KT0lnnh","title-crit":"bMUNFpaCe_jNugxK6vefe","blink-red":"_2CYAIwkx1N-rMpGE8m5lYc","title-destroyed":"w4yT9moWFVW4_DBVblctv","eject-bar":"_2oIbebvRwim_UY3_R3Vgi","eject-bar-middle":"_2yXZScY9s8rRIPinztqrzE","eject-color":"qCkDZT5ISrd8DU9dQ7nGO","eject-bar-frame":"_3jLhHFcSZgeoEuF8uyeSrv","eject-bar-frame-anim":"_2gO2_MddUkrNyWuhqOH851",reverse:"cd3Y9q7NQBjM0ZCNxD0bD","eject-text":"_1wcxKlQvOV62HX3uhUwW-0","eject-text-sub":"_3zgWWYz8O-NjVUNr-zJr9G"},e.exports=t},73:function(e,t,n){"use strict";e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n=function(e,t){var n=e[1]||"",a=e[3];if(!a)return n;if(t&&"function"==typeof btoa){var r=(i=a,c=btoa(unescape(encodeURIComponent(JSON.stringify(i)))),l="sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(c),"/*# ".concat(l," */")),o=a.sources.map((function(e){return"/*# sourceURL=".concat(a.sourceRoot||"").concat(e," */")}));return[n].concat(o).concat([r]).join("\n")}var i,c,l;return[n].join("\n")}(t,e);return t[2]?"@media ".concat(t[2]," {").concat(n,"}"):n})).join("")},t.i=function(e,n,a){"string"==typeof e&&(e=[[null,e,""]]);var r={};if(a)for(var o=0;o<this.length;o++){var i=this[o][0];null!=i&&(r[i]=!0)}for(var c=0;c<e.length;c++){var l=[].concat(e[c]);a&&r[l[0]]||(n&&(l[2]?l[2]="".concat(n," and ").concat(l[2]):l[2]=n),t.push(l))}},t}},76:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return N}));var a=n(0),r=n(12),o=n(70),i=n(18),c=n(67);function l(e){const t=e.hpSteps.good+e.hpSteps.damaged+e.hpSteps.crit,[n,r]=Object(c.a)(t,t=>{void 0!==e.onDamageStatusChange&&e.onDamageStatusChange(0===t?"destroyed":t<=e.hpSteps.crit?"crit":t<=e.hpSteps.crit+e.hpSteps.damaged?"damaged":"good")}),o=t-n,[l,d]=a.useState(e.maxArmor),u=e.maxArmor-l;u<0&&d(e.maxArmor);const p=t>=6,f=[...Object(i.c)("good",e.hpSteps.good),...Object(i.c)("damaged",e.hpSteps.damaged),...Object(i.c)("crit",e.hpSteps.crit)],h=[],g=e.maxArmor>0||e.permArmor>0,y=p?Math.ceil(t/2):t,v=(p?2:1)+(g?1:0);if(p){const e=Math.ceil(t/2);h[0]=f.slice(0,e).map((e,t)=>({key:t,type:e,active:t>=o})),h[1]=f.slice(e).map((t,n)=>({key:n,type:t,active:n+e>=o}))}else h[0]=f.map((e,t)=>({key:t,type:e,active:t>=o}));const b=[...Object(i.c)("break",u>=0?u:0),...Object(i.c)("armor",l),...Object(i.c)("permanent",e.permArmor)],E=t=>{t<u?d(e.maxArmor-t):t<e.maxArmor&&d(e.maxArmor-t-1)},S=e=>{e<o?r(t-e):e<t&&r(t-e-1)};return a.createElement("svg",{viewBox:"0 0 "+y+" "+v,width:30*y,height:30*v},h.map((e,n)=>a.createElement("svg",{key:n,y:n},e.map((e,r)=>function(e,t,n,r,o,i){const c="good"===t?a.createElement(a.Fragment,null):"damaged"===t?m(!0):a.createElement(a.Fragment,null,m(!1),m(!0));return a.createElement("svg",{key:e,x:r,width:1,height:1,onClick:()=>i(o)},a.createElement("rect",{vectorEffect:"non-scaling-stroke",width:"1",height:"1",style:{fill:s(t,n),stroke:"black",strokeWidth:1}}),c)}(e.key,e.type,e.active,r+(t%2==1&&1===n?.5:0),r+n*y,S)))),g?a.createElement("svg",{y:v-1,x:y-b.length-(t%2==1&&p?.5:0)},b.map((e,t)=>function(e,t,n,r){const o="break"===n?a.createElement("polyline",{vectorEffect:"non-scaling-stroke",points:"0.5,0 0.25,0.25 0.75,0.75 0.5,1",width:"1",height:"1",style:{fill:"none",stroke:"black",strokeWidth:2}}):a.createElement(a.Fragment,null);return a.createElement("svg",{key:e,x:t,width:1,height:1,onClick:()=>r(e)},a.createElement("path",{vectorEffect:"non-scaling-stroke",d:"M 0.2,0 L0.8,0 L1,0.5 L0.8,1 L0.2,1 L0,0.5 Z",width:"1",height:"1",style:{fill:"break"===n?"#a11":"armor"===n?"#58d1cd":"purple",stroke:"black",strokeWidth:1}}),o)}(t,t,e,E))):a.createElement(a.Fragment,null))}function s(e,t){switch(e){case"good":return t?"#5dc":"#333";case"damaged":return t?"#ff0":"#552";case"crit":return t?"#f00":"#622"}}function m(e){return a.createElement("line",{x1:e?.8:.2,y1:.2,x2:e?.2:.8,y2:.8,style:{stroke:"black",strokeWidth:.1}})}var d=n(65),u=n.n(d);const p={left:"row",right:"row-reverse",center:"column"};function f(e){const[t,n]=Object(c.a)(void 0,(n,a)=>{void 0!==a&&void 0!==a.onDeselect&&t.onDeselect(e),void 0!==n.onSelect&&n.onSelect(e)});return a.createElement("div",{className:o["mech-container"]},a.createElement("div",{style:{display:"flex",flexFlow:p[e.align],justifyContent:"space-between",alignItems:"center"}},a.createElement("h3",{className:o["title-"+e.damageStatus]},e.name),a.createElement("div",null,a.createElement(l,{hpSteps:e.componentHp,maxArmor:e.componentHp.armor,permArmor:e.componentHp.permArmor,onDamageStatusChange:e.setDamageStatus}))),e.componentOptions.length>0?a.createElement("div",{className:"flow-row"},a.createElement("div",null,"Component: "),a.createElement(u.a,{className:"flex-grow",options:e.componentOptions.map(e=>e.name),placeholder:"CHOOSE",value:void 0===t?void 0:t.name,onChange:t=>n(e.componentOptions.find(e=>e.name===t.value))})):a.createElement(a.Fragment,null),void 0!==t?a.createElement("div",{style:{padding:"10px"}},t.description):a.createElement(a.Fragment,null),void 0!==t&&void 0!==t.getCustomComponent?a.createElement(t.getCustomComponent,{addComponentBonus:e.addComponentBonus}):a.createElement(a.Fragment,null))}const h=[{name:"Valor",moveSpeed:60,attackBonus:0,dodgeDice:6,meleeDice:6,body:{good:8,damaged:4,crit:4,armor:1,permArmor:0},head:{good:3,damaged:2,crit:1,armor:1,permArmor:0},shldr:{good:0,damaged:0,crit:0,armor:0,permArmor:0},arm:{good:3,damaged:1,crit:1,armor:0,permArmor:0},hand:{good:1,damaged:1,crit:1,armor:0,permArmor:0},leg:{good:3,damaged:1,crit:1,armor:0,permArmor:0},core:3},{name:"Rage",moveSpeed:60,attackBonus:2,dodgeDice:6,meleeDice:8,body:{good:6,damaged:4,crit:4,armor:1,permArmor:0},head:{good:2,damaged:2,crit:1,armor:0,permArmor:0},shldr:{good:0,damaged:0,crit:0,armor:0,permArmor:0},arm:{good:3,damaged:1,crit:1,armor:0,permArmor:0},hand:{good:1,damaged:1,crit:1,armor:0,permArmor:0},leg:{good:3,damaged:1,crit:1,armor:0,permArmor:0},core:3},{name:"Strength",moveSpeed:45,attackBonus:0,dodgeDice:4,meleeDice:6,body:{good:8,damaged:6,crit:4,armor:2,permArmor:0},head:{good:4,damaged:2,crit:2,armor:1,permArmor:0},shldr:{good:0,damaged:0,crit:0,armor:0,permArmor:0},arm:{good:3,damaged:2,crit:1,armor:0,permArmor:0},hand:{good:2,damaged:1,crit:1,armor:0,permArmor:0},leg:{good:3,damaged:2,crit:1,armor:0,permArmor:0},core:2},{name:"Flow",moveSpeed:90,attackBonus:0,dodgeDice:8,meleeDice:10,body:{good:6,damaged:4,crit:4,armor:1,permArmor:0},head:{good:2,damaged:2,crit:1,armor:0,permArmor:0},shldr:{good:0,damaged:0,crit:0,armor:0,permArmor:0},arm:{good:3,damaged:1,crit:1,armor:0,permArmor:0},hand:{good:1,damaged:1,crit:1,armor:0,permArmor:0},leg:{good:3,damaged:1,crit:1,armor:0,permArmor:0},core:3},{name:"Mind",moveSpeed:90,attackBonus:0,dodgeDice:6,meleeDice:8,body:{good:6,damaged:3,crit:3,armor:1,permArmor:0},head:{good:2,damaged:2,crit:1,armor:0,permArmor:0},shldr:{good:0,damaged:0,crit:0,armor:0,permArmor:0},arm:{good:3,damaged:1,crit:1,armor:0,permArmor:0},hand:{good:1,damaged:1,crit:1,armor:0,permArmor:0},leg:{good:3,damaged:1,crit:1,armor:0,permArmor:0},core:5}],g=[{name:"Sensor Suite",description:"You can see enemy armor values and invisible creatures. +3 (- damage penalty) to initiative when combat starts."},{name:"Target Compensation",description:"Everytime you miss an attack, gain +1 to the next attack cumulatively. Once you hit an attack, reset the bonus to +0. Disabled if your head damage penalty excceeds -3"},{name:"Escape Pod",description:"If you eject, if your HEAD component is not destroyed, the mech HEAD component ejects with you. Repair your head HP and Armor. On your turn, you can still move, but cannot take any other mech actions"},{name:"Target Painting Laser",description:"When you hit a creature with a ranged attack, the next ally to attack the same target before your next turn gains +1. Disabled if your head damage penalty excceeds -3"}];const y=["head","body","rarm","larm","rhand","lhand","rleg","lleg"];function v(e,t){return e.filter(e=>e!==t)}const b=[{name:"Shield Generator",description:"You have a large shield generator which reduces damage before it can hit you. +6 Temporary HP in every combat.",getCustomComponent:function(e){return a.createElement("div",{className:"flow-row",style:{justifyContent:"space-between"}},a.createElement("span",null,"Shield HP:"),a.createElement(l,{hpSteps:{good:6,damaged:0,crit:0},maxArmor:0,permArmor:0}))}},{name:"Repair Kit",description:"An automatic repair kit ensures damage affects your components less. Ignore any -1 roll penalty due to damage, or use your action to repair 1 armor or heal 2 health to any component on you or a friendly mech within 5 feet."},{name:"Electropack",description:"Grant electric damage on melee attacks. Whenever you land a melee attack, deal +1 damage, ignoring armor. Any time one of your components is damaged below the -1 damage threshold by a melee attack, you emit a surge of energy that deals 1 damage ignore armor to every hostile creature within 5 feet of you."},{name:"Nanite Armor System",description:"Grant +1 Permanent armor to any component, and grant +1 armor to two other components",getCustomComponent:function(e){const[t,n]=a.useState(void 0),[r,o]=a.useState(void 0),[i,c]=a.useState(void 0);return a.createElement("div",null,a.createElement("div",{className:"flow-row",style:{justifyContent:"space-between"}},a.createElement("span",null,"Permanent:"),a.createElement(u.a,{options:v(v(y,i),r),value:t,onChange:a=>{void 0!==t&&e.addComponentBonus({component:t,permArmor:-1}),e.addComponentBonus({component:a.value,permArmor:1}),n(a.value)}})),a.createElement("div",{className:"flow-row",style:{justifyContent:"space-between"}},a.createElement("span",null,"Bonus Armor:"),a.createElement(u.a,{options:v(v(y,t),i),value:r,onChange:t=>{void 0!==r&&e.addComponentBonus({component:r,armor:-1}),e.addComponentBonus({component:t.value,armor:1}),o(t.value)}}),a.createElement(u.a,{options:v(v(y,t),r),value:i,onChange:t=>{void 0!==i&&e.addComponentBonus({component:i,armor:-1}),e.addComponentBonus({component:t.value,armor:1}),c(t.value)}})))}}];const E=[{name:"Rocket Battery",description:"Once per turn, when you make a ranged attack, chose another target creature and roll an attack (1d6). Deal 1 damage to the target on hit"},{name:"“Whisp” Recon Drone",description:"You can launch the “Whisp” recon drone as a bonus action. The drone is invisible, can see invisible targets, and can move 120 feet per turn. The drone has 2 health and no armor. If it is damaged/destroyed, you can repair it out of combat.",getCustomComponent:function(e){return a.createElement("div",{className:"flow-row",style:{justifyContent:"space-between"}},a.createElement("span",null,"Whisp HP:"),a.createElement(l,{hpSteps:{good:1,damaged:1,crit:0},maxArmor:0,permArmor:0}))}},{name:"Fortification Shield System",description:'You can use your action to enter “Fortified” mode. While fortified, you gain +2 permanent armor everywhere, but cannot move or attack. You may exit "Fortified" mode as a bonus action'}],S={hp:0,armor:0,permArmor:0},k={head:Object.assign({},S),body:Object.assign({},S),rarm:Object.assign({},S),rhand:Object.assign({},S),larm:Object.assign({},S),lhand:Object.assign({},S),rleg:Object.assign({},S),lleg:Object.assign({},S)};function w(e,t){return{good:e.good+t.hp,damaged:e.damaged,crit:e.crit,armor:e.armor+t.armor,permArmor:e.permArmor+t.permArmor}}const x=[{name:"“Ablator” flare system",description:"When you are targeted by a ranged attack, your attacker takes a -1 to the attack roll. Disabled if the offhand damage penalty exceeds -3"},{name:"Weapon Stabilizer",description:"+1 to all attack rolls. Disabled if the offhand damage penalty exceeds -3"},{name:"Heavy Shield",description:"Grants +1 permanent armor and 2 HP to your offhand arm. If your arm is not broken, whenever you take an attack, you may roll 1d4. On a 3-4, the attack hits your offhand arm instead of its original target.",onSelect:e=>e.addComponentBonus({component:"larm",permArmor:1,hp:2}),onDeselect:e=>e.addComponentBonus({component:"larm",permArmor:-1,hp:-2})},{name:"Sword",description:"It’s a sword. Your melee attacks now do 3 Damage. Disabled if the offhand damage penalty exceeds -3"},{name:"Hammer",description:"It’s a hammer. Your melee attacks now do 2 Damage and 1 Break. Disabled if the offhand damage penalty exceeds -3"}],C=[{name:"“Incinerator” Flamecannon",description:"Make an attack roll (1d8) against every creature in a 30 foot cone in front of you. Deal 2 damage to each creature hit."},{name:"“Repeater” Autocannon",description:"Make up to four attack rolls (1d8). You may split these attacks between creatures or you may use more than one on the same creature. Deal 1 damage to each creature hit. If you attack the same target more than once, roll only one attack, but deal full damage on a hit (IE: If you attack the same target twice, make one attack roll, but do 2 damage if you land it). This weapon is affected twice as much by armor."},{name:"“Impact” Railgun",description:"Make an attack roll (1d10). On a hit, deal 2 damage and 1 break. Deal 1 damage to any creature within 10 feet in a line behind the creature you hit."},{name:"“Omen” Coil gun",description:"Chose a target. Roll three attack rolls (1d6 each) against the target. Deal 1 damage for each hit. If all three attacks hit, deal either an additional +2 damage or 1 break."},{name:"“AGL-1” Grenade Launcher",description:"Make an attack roll (1d6). On a hit, deal 3 damage. On a miss, deal 1."}];function O(e){switch(e){case"good":return"gray";case"damaged":return"#ff0";case"crit":return"#f00";case"destroyed":return"black"}}function A(e){switch(e){case"good":return a.createElement(a.Fragment,null);case"damaged":return a.createElement("animate",{attributeName:"fill",values:"gray;#ff0",dur:"1s",repeatCount:"indefinite"});case"crit":return a.createElement("animate",{attributeName:"fill",values:"gray;#f00",dur:"500ms",repeatCount:"indefinite"});case"destroyed":return a.createElement(a.Fragment,null)}}function D(e){const[t,n]=a.useState("good");return a.createElement("div",{style:{flexGrow:1,marginTop:"10px"},className:"center-col"},a.createElement("svg",{viewBox:"0 0 10 12",height:"200px"},a.createElement("path",{fill:O(e.damageStatus.head),d:"M 4,0 L 6,0 L 7,2 L 3,2 Z"},A(e.damageStatus.head)),a.createElement("path",{fill:O(e.damageStatus.body),d:"M 3,3 L 7,3 L 7,7 L 3,7 Z"},A(e.damageStatus.body)),a.createElement("path",{fill:O(e.damageStatus.rarm),d:"M 1,3 L 2,3 L 2,6 L 1,6 Z"},A(e.damageStatus.rarm)),a.createElement("path",{fill:O(e.damageStatus.rhand),d:"M 1,7 L2,7 L2,8 L1,8 Z"},A(e.damageStatus.rhand)),a.createElement("path",{fill:O(e.damageStatus.larm),d:"M 8,3 L 9,3 L 9,6 L 8,6 Z"},A(e.damageStatus.larm)),a.createElement("path",{fill:O(e.damageStatus.lhand),d:"M 8,7 L9,7 L9,8 L8,8 Z"},A(e.damageStatus.lhand)),a.createElement("path",{fill:O(e.damageStatus.rleg),d:"M 3,8 L4.3,8 L4.3,12 L3,12 Z"},A(e.damageStatus.rleg)),a.createElement("path",{fill:O(e.damageStatus.lleg),d:"M 5.7,8 L7,8 L7,12 L5.7,12 Z"},A(e.damageStatus.lleg))),a.createElement("div",{style:{marginBottom:"20px",marginTop:"10px"},className:"center-col"},a.createElement("h3",null,"CORE"),a.createElement(l,{maxArmor:0,permArmor:0,hpSteps:{good:e.coreMaxHp,damaged:0,crit:0},onDamageStatusChange:e=>n(e)})),"destroyed"===t?a.createElement("div",{className:o["eject-bar"]+" flex col justify-space-between"},a.createElement("div",{className:o["eject-bar-frame"]}),a.createElement("div",{className:o["eject-bar-middle"]+" flex col justify-center align-center"},a.createElement("span",{className:o["eject-text"]},"EJECT"),a.createElement("span",{className:o["eject-text-sub"]},"CORE IMPLOSION IMMINENT")),a.createElement("div",{className:o["eject-bar-frame"]+" "+o.reverse})):a.createElement(a.Fragment,null))}function N(){const{width:e,height:t}=Object(r.a)(),[n,i]=a.useState(void 0),[c,l]=a.useState(k),[s,m]=a.useState({head:"good",body:"good",rarm:"good",larm:"good",rhand:"good",lhand:"good",rleg:"good",lleg:"good"}),d=e=>t=>{const n=Object.assign({},s);n[e]=t,m(n)},p=e=>{const t=Object.assign({},c);t[e.component].hp+=e.hp||0,t[e.component].armor+=e.armor||0,t[e.component].permArmor+=e.permArmor||0,l(t)};return a.createElement("div",{className:"full_body "+o.main},a.createElement("div",{className:"border center-col",style:{width:"100%"}},a.createElement("h1",null,"STATUS: ",function(e){return void 0===e?a.createElement("span",{className:o["status-ready"]+" "+o.status},"READY"):a.createElement("span",{className:o["status-operational"]+" "+o.status},"OPERATIONAL")}(n)),a.createElement("div",{className:"flow-row"},a.createElement("div",null,"Chassis:"),a.createElement(u.a,{options:h.map(e=>e.name),placeholder:"CHOOSE",value:void 0===n?void 0:n.name,onChange:e=>i(h.find(t=>t.name===e.value))}))),void 0===n?a.createElement(a.Fragment,null):a.createElement("div",{className:o["flex-col"]+" center-col "+o.body,style:{width:"100%",opacity:void 0===n?0:1}},a.createElement("div",{style:{width:"100%",justifyContent:"space-around"},className:"flow-row "+o["detail-row"]},a.createElement("div",null,"Move Speed: ",n.moveSpeed),a.createElement("div",null,"Dodge: 1d",n.dodgeDice),a.createElement("div",null,"Attack Bonus: ",n.attackBonus),a.createElement("div",null,"Melee: 1d",n.meleeDice)),a.createElement("div",{style:{width:"80%",height:"100%",display:"flex"}},a.createElement("div",{className:o["flex-col"]+" "+o["fixed-col"]},a.createElement(f,{name:"HEAD",align:"left",setDamageStatus:d("head"),damageStatus:s.head,componentHp:w(n.head,c.head),componentOptions:g,addComponentBonus:p}),a.createElement(f,{name:"R-ARM",align:"left",setDamageStatus:d("rarm"),damageStatus:s.rarm,componentHp:w(n.arm,c.rarm),componentOptions:[],addComponentBonus:p}),a.createElement(f,{name:"R-HAND",align:"left",setDamageStatus:d("rhand"),damageStatus:s.rhand,componentHp:w(n.hand,c.rhand),componentOptions:C,addComponentBonus:p}),a.createElement(f,{name:"R-LEG",align:"left",setDamageStatus:d("rleg"),damageStatus:s.rleg,componentHp:w(n.leg,c.rleg),componentOptions:[],addComponentBonus:p})),a.createElement("div",{className:o["flex-col"]+" "+o["fixed-col"]},a.createElement(f,{name:"BODY",align:"center",setDamageStatus:d("body"),damageStatus:s.body,componentHp:w(n.body,c.body),componentOptions:b,addComponentBonus:p}),a.createElement(D,{coreMaxHp:n.core,damageStatus:s})),a.createElement("div",{className:o["flex-col"]+" "+o["fixed-col"]},a.createElement(f,{name:"SHLDR",align:"right",componentHp:n.shldr,componentOptions:E,addComponentBonus:p}),a.createElement(f,{name:"L-ARM",align:"right",setDamageStatus:d("larm"),damageStatus:s.larm,componentHp:w(n.arm,c.larm),componentOptions:[],addComponentBonus:p}),a.createElement(f,{name:"L-HAND",align:"right",setDamageStatus:d("lhand"),damageStatus:s.lhand,componentHp:w(n.hand,c.lhand),componentOptions:x,addComponentBonus:p}),a.createElement(f,{name:"L-LEG",align:"right",setDamageStatus:d("lleg"),damageStatus:s.lleg,componentHp:w(n.leg,c.lleg),componentOptions:[],addComponentBonus:p})))))}}}]);
//# sourceMappingURL=7.bundle.js.map