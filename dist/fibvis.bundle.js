/*! For license information please see fibvis.bundle.js.LICENSE.txt */
(self.webpackChunktrading_game=self.webpackChunktrading_game||[]).push([[554],{4403:(t,e)=>{var n;!function(){"use strict";var s={}.hasOwnProperty;function i(){for(var t=[],e=0;e<arguments.length;e++){var n=arguments[e];if(n){var a=typeof n;if("string"===a||"number"===a)t.push(n);else if(Array.isArray(n)&&n.length){var r=i.apply(null,n);r&&t.push(r)}else if("object"===a)for(var o in n)s.call(n,o)&&n[o]&&t.push(o)}}return t.join(" ")}t.exports?(i.default=i,t.exports=i):void 0===(n=function(){return i}.apply(e,[]))||(t.exports=n)}()},8167:(t,e,n)=>{"use strict";e.Z=void 0;var s,i=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!==o(t)&&"function"!=typeof t)return{default:t};var e=r();if(e&&e.has(t))return e.get(t);var n={},s=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var i in t)if(Object.prototype.hasOwnProperty.call(t,i)){var a=s?Object.getOwnPropertyDescriptor(t,i):null;a&&(a.get||a.set)?Object.defineProperty(n,i,a):n[i]=t[i]}return n.default=t,e&&e.set(t,n),n}(n(7363)),a=(s=n(4403))&&s.__esModule?s:{default:s};function r(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return r=function(){return t},t}function o(t){return o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o(t)}function l(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function h(t,e){for(var n=0;n<e.length;n++){var s=e[n];s.enumerable=s.enumerable||!1,s.configurable=!0,"value"in s&&(s.writable=!0),Object.defineProperty(t,s.key,s)}}function c(t){return c=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},c(t)}function u(t){if(void 0===t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return t}function p(t,e){return p=Object.setPrototypeOf||function(t,e){return t.__proto__=e,t},p(t,e)}var m="Select...",d=function(t){function e(t){var n;return function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e),(n=function(t,e){return!e||"object"!==o(e)&&"function"!=typeof e?u(t):e}(this,c(e).call(this,t))).state={selected:n.parseValue(t.value,t.options)||{label:void 0===t.placeholder?m:t.placeholder,value:""},isOpen:!1},n.dropdownRef=(0,i.createRef)(),n.mounted=!0,n.handleDocumentClick=n.handleDocumentClick.bind(u(n)),n.fireChangeEvent=n.fireChangeEvent.bind(u(n)),n}var n,s;return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function");t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,writable:!0,configurable:!0}}),e&&p(t,e)}(e,t),n=e,(s=[{key:"componentDidUpdate",value:function(t){if(this.props.value!==t.value)if(this.props.value){var e=this.parseValue(this.props.value,this.props.options);e!==this.state.selected&&this.setState({selected:e})}else this.setState({selected:{label:void 0===this.props.placeholder?m:this.props.placeholder,value:""}})}},{key:"componentDidMount",value:function(){document.addEventListener("click",this.handleDocumentClick,!1),document.addEventListener("touchend",this.handleDocumentClick,!1)}},{key:"componentWillUnmount",value:function(){this.mounted=!1,document.removeEventListener("click",this.handleDocumentClick,!1),document.removeEventListener("touchend",this.handleDocumentClick,!1)}},{key:"handleMouseDown",value:function(t){this.props.onFocus&&"function"==typeof this.props.onFocus&&this.props.onFocus(this.state.isOpen),"mousedown"===t.type&&0!==t.button||(t.stopPropagation(),t.preventDefault(),this.props.disabled||this.setState({isOpen:!this.state.isOpen}))}},{key:"parseValue",value:function(t,e){var n;if("string"==typeof t)for(var s=0,i=e.length;s<i;s++)if("group"===e[s].type){var a=e[s].items.filter((function(e){return e.value===t}));a.length&&(n=a[0])}else void 0!==e[s].value&&e[s].value===t&&(n=e[s]);return n||t}},{key:"setValue",value:function(t,e){var n={selected:{value:t,label:e},isOpen:!1};this.fireChangeEvent(n),this.setState(n)}},{key:"fireChangeEvent",value:function(t){t.selected!==this.state.selected&&this.props.onChange&&this.props.onChange(t.selected)}},{key:"renderOption",value:function(t){var e,n=t.value;void 0===n&&(n=t.label||t);var s=t.label||t.value||t,r=n===this.state.selected.value||n===this.state.selected,o=(l(e={},"".concat(this.props.baseClassName,"-option"),!0),l(e,t.className,!!t.className),l(e,"is-selected",r),e),h=(0,a.default)(o);return i.default.createElement("div",{key:n,className:h,onMouseDown:this.setValue.bind(this,n,s),onClick:this.setValue.bind(this,n,s),role:"option","aria-selected":r?"true":"false"},s)}},{key:"buildMenu",value:function(){var t=this,e=this.props,n=e.options,s=e.baseClassName,a=n.map((function(e){if("group"===e.type){var n=i.default.createElement("div",{className:"".concat(s,"-title")},e.name),a=e.items.map((function(e){return t.renderOption(e)}));return i.default.createElement("div",{className:"".concat(s,"-group"),key:e.name,role:"listbox",tabIndex:"-1"},n,a)}return t.renderOption(e)}));return a.length?a:i.default.createElement("div",{className:"".concat(s,"-noresults")},"No options found")}},{key:"handleDocumentClick",value:function(t){this.mounted&&(this.dropdownRef.current.contains(t.target)||this.state.isOpen&&this.setState({isOpen:!1}))}},{key:"isValueSelected",value:function(){return"string"==typeof this.state.selected||""!==this.state.selected.value}},{key:"render",value:function(){var t,e,n,s,r,o=this.props,h=o.baseClassName,c=o.controlClassName,u=o.placeholderClassName,p=o.menuClassName,m=o.arrowClassName,d=o.arrowClosed,x=o.arrowOpen,f=o.className,y=this.props.disabled?"Dropdown-disabled":"",g="string"==typeof this.state.selected?this.state.selected:this.state.selected.label,v=(0,a.default)((l(t={},"".concat(h,"-root"),!0),l(t,f,!!f),l(t,"is-open",this.state.isOpen),t)),E=(0,a.default)((l(e={},"".concat(h,"-control"),!0),l(e,c,!!c),l(e,y,!!y),e)),b=(0,a.default)((l(n={},"".concat(h,"-placeholder"),!0),l(n,u,!!u),l(n,"is-selected",this.isValueSelected()),n)),w=(0,a.default)((l(s={},"".concat(h,"-menu"),!0),l(s,p,!!p),s)),k=(0,a.default)((l(r={},"".concat(h,"-arrow"),!0),l(r,m,!!m),r)),P=i.default.createElement("div",{className:b},g),M=this.state.isOpen?i.default.createElement("div",{className:w,"aria-expanded":"true"},this.buildMenu()):null;return i.default.createElement("div",{ref:this.dropdownRef,className:v},i.default.createElement("div",{className:E,onMouseDown:this.handleMouseDown.bind(this),onTouchEnd:this.handleMouseDown.bind(this),"aria-haspopup":"listbox"},P,i.default.createElement("div",{className:"".concat(h,"-arrow-wrapper")},x&&d?this.state.isOpen?x:d:i.default.createElement("span",{className:k}))),M)}}])&&h(n.prototype,s),e}(i.Component);d.defaultProps={baseClassName:"Dropdown"};var x=d;e.Z=x},8785:(t,e,n)=>{"use strict";n.d(e,{Z:()=>s});class s{constructor(t,e){this.x=t,this.y=e}static zero(){return new s(0,0)}static fromAngle(t,e){return new s(Math.cos(t)*(null!=e?e:1),Math.sin(t)*(null!=e?e:1))}lengthSq(){return s.dot(this,this)}length(){return Math.sqrt(this.lengthSq())}clone(){return new s(this.x,this.y)}negate(){return new s(-this.x,-this.y)}negateInPlace(){return this.x=-this.x,this.y=-this.y,this}static dot(t,e){return t.x*e.x+t.y*e.y}dotWith(t){return s.dot(this,t)}normalize(){let t=this.length();return s.multiply(this,1/t)}direction(){return Math.atan2(this.y,this.x)}truncate(){return new s(Math.trunc(this.x),Math.trunc(this.y))}addWith(t,e){const{x:n,y:s}=i(t,e);return this.x+=n,this.y+=s,this}multWith(t,e){const{x:n,y:s}=function(t,e){return void 0===e?void 0!==t.x?{x:t.x,y:t.y}:{x:t,y:t}:{x:t,y:e}}(t,e);return this.x*=n,this.y*=s,this}subtractWith(t,e){const{x:n,y:s}=i(t,e);return this.x-=n,this.y-=s,this}divideWith(t,e){const{x:n,y:s}=i(t,e);return this.x/=n,this.y/=s,this}equals(t){return this.x===t.x&&this.y===t.y}static add(t,e,n){const{x:a,y:r}=i(e,n);return new s(t.x+a,t.y+r)}static subtract(t,e,n){const{x:a,y:r}=i(e,n);return new s(t.x-a,t.y-r)}static multiply(t,e,n){return void 0!==n?new s(t.x*e,t.y*n):void 0!==e.x?new s(t.x*e.x,t.y*e.y):new s(t.x*e,t.y*e)}static interpolate(t,e,n){return 0===n?t:1===n?e:new s(t.x+(e.x-t.x)*n,t.y+(e.y-t.y)*n)}static componentMin(t,e){return t.x<=e.x&&t.y<=e.y?t:e.x<=t.x&&e.y<=t.y?e:new s(Math.min(t.x,e.x),Math.min(t.y,e.y))}static componentMax(t,e){return t.x>=e.x&&t.y>=e.y?t:e.x>=t.x&&e.y>=t.y?e:new s(Math.max(t.x,e.x),Math.max(t.y,e.y))}static Bezier(t,e){return 1===t.length?t[0]:2===t.length?s.add(s.multiply(t[1],e),s.multiply(t[0],1-e)):s.add(s.multiply(s.Bezier(t.slice(1),e),e),s.multiply(s.Bezier(t.slice(0,t.length-1),e),1-e))}rotate(t){const e=Math.atan2(this.y,this.x),n=this.length();return s.fromAngle(e+t,n)}}function i(t,e){return void 0===e?{x:t.x,y:t.y}:{x:t,y:e}}},4077:(t,e,n)=>{"use strict";n.d(e,{f:()=>a});var s=n(7363),i=n(8167);function a(t){const e=t.options.map(t.getName);return s.createElement(i.Z,{options:e,value:t.getName(t.value),onChange:e=>t.onChange(t.options.find((n=>t.getName(n)===e.value)))})}},9005:(t,e,n)=>{"use strict";n.r(e),n.d(e,{default:()=>P});var s=n(7363),i=n(4077);const a=[new class{constructor(){this.name="Fibonacci"}generateSeries(t,e){let n=[];for(let s=0;s<t.length;s++)n.push(t[s]%e),t[s]%=e;let s=!0;for(let i=0;i<n.length-2;i++)(t[i]+t[i+1])%e!==t[i+2]&&(s=!1);const i=s?t:t.slice(t.length-2,t.length);do{n.push((n[n.length-1]+n[n.length-2])%e)}while(!this.hasLooped(n,i));return n.splice(n.length-i.length+1,i.length-1),n}hasLooped(t,e){var n=t.length-e.length;for(let s=0;s<e.length;s++)if(t[s+n]!==e[s])return!1;return!0}},new class{constructor(){this.name="Fibonacci +1"}generateSeries(t,e){let n=[];for(let s=0;s<t.length;s++)n.push(t[s]%e),t[s]%=e;let s=!0;for(let i=0;i<n.length-2;i++)(t[i]+t[i+1]+1)%e!==t[i+2]&&(s=!1);const i=s?t:t.slice(t.length-2,t.length);do{n.push((n[n.length-1]+n[n.length-2]+1)%e)}while(!this.hasLooped(n,i));return n.splice(n.length-i.length+1,i.length-1),n}hasLooped(t,e){var n=t.length-e.length;for(let s=0;s<e.length;s++)if(t[s+n]!==e[s])return!1;return!0}},new class{constructor(){this.name="Triangle"}generateSeries(t,e){let n=[];for(let s=0;s<t.length;s++)n.push(t[s]%e),t[s]%=e;let s=!0;for(let i=0;i<n.length-1;i++)(t[i]+i+1)%e!==t[i+1]&&(s=!1);const i=s?t[0]:t[t.length-1],a=s?0:(t.length-1)%e;do{n.push((n[n.length-1]+n.length)%e)}while(!this.hasLooped(n,e,i,a));return s&&n.splice(n.length-t.length+1,t.length-1),n}hasLooped(t,e,n,s){return t[t.length-1]===n&&(t.length-1)%e===s}},new class{constructor(){this.name="Sum Of Three"}generateSeries(t,e){let n=[];for(;t.length<3;)t.splice(0,0,0);for(let s=0;s<t.length;s++)n.push(t[s]%e),t[s]%=e;let s=!0;for(let i=0;i<n.length-3;i++)(t[i]+t[i+1]+t[i+2])%e!==t[i+3]&&(s=!1);const i=s?t:t.slice(t.length-3,t.length);do{n.push((n[n.length-1]+n[n.length-2]+n[n.length-3])%e)}while(!this.hasLooped(n,i));return n.splice(n.length-i.length+1,i.length-1),n}hasLooped(t,e){var n=t.length-e.length;for(let s=0;s<e.length;s++)if(t[s+n]!==e[s])return!1;return!0}}];var r=n(5901);const o=500;class l extends s.Component{constructor(t){super(t),this.canvasRef=s.createRef(),this.animationTick=0,this.animationTimer=0,this.isRunningAnimation=!1}render(){return s.createElement("canvas",{ref:this.canvasRef})}componentDidMount(){this.startPaint()}componentDidUpdate(t,e){t.animate===this.props.animate&&t.visualizer===this.props.visualizer&&t.animationDuration===this.props.animationDuration||(this.stopPreviousPaint(),this.startPaint())}startPaint(){const t=this.canvasRef.current;(0,r.f5)(t,o,o);const e=t.getContext("2d");e.lineWidth=3,this.clearCanvas(e),this.props.animate?(this.animationTick=0,this.isRunningAnimation=!0,this.animationTimer=requestAnimationFrame((()=>this.paintFrame(e)))):this.props.visualizer.paintTotal(e,o,o)}clearCanvas(t){t.fillStyle="black",t.fillRect(0,0,o,o)}stopPreviousPaint(){this.isRunningAnimation&&cancelAnimationFrame(this.animationTimer)}paintFrame(t){this.animationTick++,this.clearCanvas(t),this.animationTick>=60*this.props.animationDuration?(this.props.visualizer.paintTotal(t,o,o),this.isRunningAnimation=!1,this.animationTick=this.animationTimer=0):(this.props.visualizer.paintFrame(t,o,o,this.animationTick/(60*this.props.animationDuration)),this.animationTimer=requestAnimationFrame((()=>this.paintFrame(t))))}}var h=n(8785);class c{constructor(t,e,n){this.modulo=t,this.series=e,this.fixedMinorRadius=n,this.anchorPoints=[],this.anchorArcCenterAngles=[];const s=2*Math.PI/t;for(let t=0;t<this.modulo;t++){const e=t*s;this.anchorPoints.push(h.Z.fromAngle(e,1)),this.anchorArcCenterAngles.push((Math.PI+e)%(2*Math.PI))}}paintFrame(t,e,n,s){const i=Math.min(e,n)/2-t.lineWidth;let a=i/this.anchorPoints.length;void 0!==this.fixedMinorRadius&&(a=this.fixedMinorRadius*i);const r=s*(this.series.length-1);t.strokeStyle="white",t.beginPath(),t.arc(e/2,n/2,i,0,2*Math.PI,!1),t.stroke(),t.strokeStyle="gray",t.lineJoin=t.lineCap="round",t.beginPath();for(let s=0;s<this.series.length&&s<r;s++){let r=this.anchorPoints[this.series[s]].clone();if(r.multWith(i,i),r.addWith(e/2,n/2),0===s)t.moveTo(r.x,r.y);else if(this.series[s]!==this.series[s-1])t.lineTo(r.x,r.y);else{let r=this.anchorArcCenterAngles[this.series[s]],o=h.Z.multiply(this.anchorPoints[this.series[s]],i);o.addWith(e/2,n/2),o.addWith(h.Z.fromAngle(r,a)),t.arc(o.x,o.y,a,r+Math.PI,r+3*Math.PI,!1)}}const o=Math.floor(r),l=r%1;let c=this.anchorPoints[this.series[o]],u=this.anchorPoints[this.series[o+1]],p=new h.Z(0,0);if(this.series[o]!==this.series[o+1])p=h.Z.interpolate(c,u,l),p.multWith(i,i),p.addWith(e/2,n/2),t.lineTo(p.x,p.y),t.stroke();else{let s=this.anchorArcCenterAngles[this.series[o]],r=h.Z.multiply(c,i);r.addWith(e/2,n/2),r.addWith(h.Z.fromAngle(s,a));const u=s+Math.PI+2*Math.PI*l;p.x=Math.cos(u)*a+r.x,p.y=Math.sin(u)*a+r.y,t.arc(r.x,r.y,a,s+Math.PI,u,!1),t.stroke()}t.strokeStyle="red",t.beginPath(),t.arc(p.x,p.y,2*t.lineWidth,0,2*Math.PI,!1),t.stroke()}paintTotal(t,e,n){const s=Math.min(e,n)/2-t.lineWidth;let i=s/this.anchorPoints.length;void 0!==this.fixedMinorRadius&&(i=this.fixedMinorRadius*s),t.strokeStyle="white",t.beginPath(),t.arc(e/2,n/2,s,0,2*Math.PI,!1),t.stroke(),t.strokeStyle="gray",t.lineJoin=t.lineCap="round",t.beginPath();for(let a=0;a<this.series.length;a++){let r=this.anchorPoints[this.series[a]].clone();if(r.multWith(s,s),r.addWith(e/2,n/2),0===a)t.moveTo(r.x,r.y);else if(this.series[a]!==this.series[a-1])t.lineTo(r.x,r.y);else{let r=this.anchorArcCenterAngles[this.series[a]],o=h.Z.multiply(this.anchorPoints[this.series[a]],s);o.addWith(e/2,n/2),o.addWith(h.Z.fromAngle(r,i)),t.arc(o.x,o.y,i,r+Math.PI,r+3*Math.PI,!1)}}t.stroke()}}class u{constructor(t,e){this.modulo=t,this.series=e,this.anchorPoints=[];const n=2*Math.PI/t;for(let t=0;t<this.modulo;t++){const e=t*n;this.anchorPoints.push(h.Z.fromAngle(e,1))}}paintFrame(t,e,n,s){const i=Math.min(e,n)/2-t.lineWidth,a=s*(this.series.length-1);t.strokeStyle="white",t.beginPath(),t.arc(e/2,n/2,i,0,2*Math.PI,!1),t.stroke(),t.strokeStyle="gray",t.lineJoin=t.lineCap="round",t.beginPath();for(let s=0;s<this.series.length&&s<a;s++){let a=this.anchorPoints[this.series[s]].clone();a.multWith(i,i),a.addWith(e/2,n/2),0===s?t.moveTo(a.x,a.y):t.lineTo(a.x,a.y)}const r=Math.floor(a),o=a%1;let l=this.anchorPoints[this.series[r]],c=this.anchorPoints[this.series[r+1]];const u=h.Z.interpolate(l,c,o);u.multWith(i,i),u.addWith(e/2,n/2),t.lineTo(u.x,u.y),t.stroke(),t.strokeStyle="red",t.beginPath(),t.arc(u.x,u.y,2*t.lineWidth,0,2*Math.PI,!1),t.stroke()}paintTotal(t,e,n){const s=Math.min(e,n)/2-t.lineWidth;t.strokeStyle="white",t.beginPath(),t.arc(e/2,n/2,s,0,2*Math.PI,!1),t.stroke(),t.strokeStyle="gray",t.lineJoin=t.lineCap="round",t.beginPath();for(let i=0;i<this.series.length;i++){let a=this.anchorPoints[this.series[i]].clone();a.multWith(s,s),a.addWith(e/2,n/2),0===i?t.moveTo(a.x,a.y):t.lineTo(a.x,a.y)}t.stroke()}}const p=.1;class m{constructor(t,e){this.modulo=t,this.series=e;const n=new h.Z(0,0);this.pts=[n.clone()],this.minExtent=n.clone(),this.maxExtent=n.clone();let s=2*Math.PI/t,i=0;for(let t=0;t<e.length;t++){i+=s*e[t],n.addWith(h.Z.fromAngle(i));var a=n.clone();this.minExtent=h.Z.componentMin(this.minExtent,a),this.maxExtent=h.Z.componentMax(this.maxExtent,a),this.pts.push(a)}for(let t=0;t<this.pts.length;t++)this.pts[t]=new h.Z((this.pts[t].x-this.minExtent.x)/(this.maxExtent.x-this.minExtent.x),(this.pts[t].y-this.minExtent.y)/(this.maxExtent.y-this.minExtent.y))}paintFrame(t,e,n,s){t.save(),t.translate(e*p/2,n*p/2),t.scale(.9,.9),t.strokeStyle="gray",t.lineJoin=t.lineCap="round";const i=s*(this.pts.length-1),a=Math.floor(i),r=i%1;t.beginPath(),t.moveTo(this.pts[0].x*e,this.pts[0].y*n);for(let s=1;s<this.pts.length&&s<i;s++)t.lineTo(this.pts[s].x*e,this.pts[s].y*n);let o=this.pts[a],l=this.pts[a+1];const c=h.Z.interpolate(o,l,r);c.multWith(e,n),t.lineTo(c.x,c.y),t.stroke(),t.strokeStyle="red",t.beginPath(),t.arc(c.x,c.y,2*t.lineWidth,0,2*Math.PI,!1),t.stroke(),t.restore()}paintTotal(t,e,n){t.save(),t.translate(e*p/2,n*p/2),t.scale(.9,.9),t.strokeStyle="gray",t.lineJoin=t.lineCap="round",t.beginPath(),t.moveTo(this.pts[0].x*e,this.pts[0].y*n);for(let s=1;s<this.pts.length;s++)t.lineTo(this.pts[s].x*e,this.pts[s].y*n);t.stroke(),t.restore()}}const d=.1,x=[new h.Z(1,0),new h.Z(0,1),new h.Z(-1,0),new h.Z(0,-1)];class f{constructor(t,e){this.modulo=t,this.series=e;const n=new h.Z(0,0);this.pts=[n.clone()],this.minExtent=n.clone(),this.maxExtent=n.clone();let s=0;for(let t=0;t<e.length;t++){s=e[t]%2==0?s+1:s-1,s+=x.length,s%=x.length,n.addWith(x[s]);var i=n.clone();this.minExtent=h.Z.componentMin(this.minExtent,i),this.maxExtent=h.Z.componentMax(this.maxExtent,i),this.pts.push(i)}this.minExtent.x===this.maxExtent.x&&(this.minExtent.x=-1,this.maxExtent.x=1),this.minExtent.y===this.maxExtent.y&&(this.minExtent.y=-1,this.maxExtent.y=1);for(let t=0;t<this.pts.length;t++)this.pts[t]=new h.Z((this.pts[t].x-this.minExtent.x)/(this.maxExtent.x-this.minExtent.x),(this.pts[t].y-this.minExtent.y)/(this.maxExtent.y-this.minExtent.y))}paintFrame(t,e,n,s){t.save(),t.translate(e*d/2,n*d/2),t.scale(.9,.9),t.strokeStyle="gray",t.lineJoin=t.lineCap="round";const i=s*(this.pts.length-1),a=Math.floor(i),r=i%1;t.beginPath(),t.moveTo(this.pts[0].x*e,this.pts[0].y*n);for(let s=1;s<this.pts.length&&s<i;s++)t.lineTo(this.pts[s].x*e,this.pts[s].y*n);let o=this.pts[a],l=this.pts[a+1];const c=h.Z.interpolate(o,l,r);c.multWith(e,n),t.lineTo(c.x,c.y),t.stroke(),t.strokeStyle="red",t.beginPath(),t.arc(c.x,c.y,2*t.lineWidth,0,2*Math.PI,!1),t.stroke(),t.restore()}paintTotal(t,e,n){t.save(),t.translate(e*d/2,n*d/2),t.scale(.9,.9),t.strokeStyle="gray",t.lineJoin=t.lineCap="round",t.beginPath(),t.moveTo(this.pts[0].x*e,this.pts[0].y*n);for(let s=1;s<this.pts.length;s++)t.lineTo(this.pts[s].x*e,this.pts[s].y*n);t.stroke(),t.restore()}}const y=.1,g=[new h.Z(1,0),new h.Z(0,1),new h.Z(-1,0),new h.Z(0,-1)];class v{constructor(t,e){this.modulo=t,this.series=e;const n=new h.Z(0,0);this.pts=[n.clone()],this.minExtent=n.clone(),this.maxExtent=n.clone();let s=0;for(let t=0;t<e.length;t++){s=0===e[t]?s:e[t]%2==0?s+1:s-1,s+=g.length,s%=g.length,n.addWith(g[s]);var i=n.clone();this.minExtent=h.Z.componentMin(this.minExtent,i),this.maxExtent=h.Z.componentMax(this.maxExtent,i),this.pts.push(i)}this.minExtent.x===this.maxExtent.x&&(this.minExtent.x=-1,this.maxExtent.x=1),this.minExtent.y===this.maxExtent.y&&(this.minExtent.y=-1,this.maxExtent.y=1);for(let t=0;t<this.pts.length;t++)this.pts[t]=new h.Z((this.pts[t].x-this.minExtent.x)/(this.maxExtent.x-this.minExtent.x),(this.pts[t].y-this.minExtent.y)/(this.maxExtent.y-this.minExtent.y))}paintFrame(t,e,n,s){t.save(),t.translate(e*y/2,n*y/2),t.scale(.9,.9),t.strokeStyle="gray",t.lineJoin=t.lineCap="round";const i=s*(this.pts.length-1),a=Math.floor(i),r=i%1;t.beginPath(),t.moveTo(this.pts[0].x*e,this.pts[0].y*n);for(let s=1;s<this.pts.length&&s<i;s++)t.lineTo(this.pts[s].x*e,this.pts[s].y*n);let o=this.pts[a],l=this.pts[a+1];const c=h.Z.interpolate(o,l,r);c.multWith(e,n),t.lineTo(c.x,c.y),t.stroke(),t.strokeStyle="red",t.beginPath(),t.arc(c.x,c.y,2*t.lineWidth,0,2*Math.PI,!1),t.stroke(),t.restore()}paintTotal(t,e,n){t.save(),t.translate(e*y/2,n*y/2),t.scale(.9,.9),t.strokeStyle="gray",t.lineJoin=t.lineCap="round",t.beginPath(),t.moveTo(this.pts[0].x*e,this.pts[0].y*n);for(let s=1;s<this.pts.length;s++)t.lineTo(this.pts[s].x*e,this.pts[s].y*n);t.stroke(),t.restore()}}class E{constructor(t,e){this.name=t,this.generate=e}}const b=.1;class w{constructor(t,e){this.modulo=t,this.series=e;const n=new h.Z(0,0);this.pts=[n.clone()],this.minExtent=n.clone(),this.maxExtent=n.clone();let s=2*Math.PI/t;for(let t=0;t<e.length;t++){const a=s*e[t];n.addWith(h.Z.fromAngle(a));var i=n.clone();this.minExtent=h.Z.componentMin(this.minExtent,i),this.maxExtent=h.Z.componentMax(this.maxExtent,i),this.pts.push(i)}for(let t=0;t<this.pts.length;t++)this.pts[t]=new h.Z((this.pts[t].x-this.minExtent.x)/(this.maxExtent.x-this.minExtent.x),(this.pts[t].y-this.minExtent.y)/(this.maxExtent.y-this.minExtent.y))}paintFrame(t,e,n,s){t.save(),t.translate(e*b/2,n*b/2),t.scale(.9,.9),t.strokeStyle="gray",t.lineJoin=t.lineCap="round";const i=s*(this.pts.length-1),a=Math.floor(i),r=i%1;t.beginPath(),t.moveTo(this.pts[0].x*e,this.pts[0].y*n);for(let s=1;s<this.pts.length&&s<i;s++)t.lineTo(this.pts[s].x*e,this.pts[s].y*n);let o=this.pts[a],l=this.pts[a+1];const c=h.Z.interpolate(o,l,r);c.multWith(e,n),t.lineTo(c.x,c.y),t.stroke(),t.strokeStyle="red",t.beginPath(),t.arc(c.x,c.y,2*t.lineWidth,0,2*Math.PI,!1),t.stroke(),t.restore()}paintTotal(t,e,n){t.save(),t.translate(e*b/2,n*b/2),t.scale(.9,.9),t.strokeStyle="gray",t.lineJoin=t.lineCap="round",t.beginPath(),t.moveTo(this.pts[0].x*e,this.pts[0].y*n);for(let s=1;s<this.pts.length;s++)t.lineTo(this.pts[s].x*e,this.pts[s].y*n);t.stroke(),t.restore()}}const k=[new E("Dreamcatcher",((t,e)=>new c(t,e,.4))),new E("Dreamcatcher (Small Rings)",((t,e)=>new c(t,e))),new E("Dreamcatcher (No Rings)",((t,e)=>new u(t,e))),new E("Angle Walk (Absolute)",((t,e)=>new w(t,e))),new E("Angle Walk (Relative)",((t,e)=>new m(t,e))),new E("Square Walk",((t,e)=>new v(t,e))),new E("Square Walk (No Zero)",((t,e)=>new f(t,e)))];function P(){let[t,e]=s.useState("0 1"),[n,r]=s.useState("3"),[o,h]=s.useState(!0),[c,u]=s.useState(null),[p,m]=s.useState(k[0]),[d,x]=s.useState(a[0]),[f,y]=s.useState(5),g=function(t,e){const n=t.split(" ").map((t=>t.trim())).filter((t=>""!=t)),s=[];for(let t=0;t<n.length;t++)if(s.push(parseInt(n[t])),isNaN(s[t]))return{seedError:`Failed to parse seed value ${n[t]}`};if(s.length<2)return{seedError:"Seed must have a length of at least 2"};const i=parseInt(e);return isNaN(i)?{moduloError:`Failed to parse modulus ${e}`}:{seed:s,modulo:i}}(t,n),v=void 0!==g.seed;return s.useEffect((()=>{if(v){const t=g.modulo,e=d.generateSeries(g.seed,t);u({animate:o,visualizer:p.generate(t,e),animationDuration:f})}}),[o,v,g.modulo,p,d,f,JSON.stringify(g.seed)]),s.createElement("div",{className:"flex col align-center"},s.createElement("div",{className:"flex col",style:{maxWidth:"800px"}},s.createElement("div",{className:"flex row justify-space-between"},s.createElement("label",null,"Seed Values: "),s.createElement("input",{type:"text",value:t,onChange:t=>e(t.target.value),style:{marginLeft:"8px"}})),s.createElement("div",{className:"flex row justify-space-between"},s.createElement("label",null,"Modulo: "),s.createElement("input",{type:"number",value:n,onChange:t=>r(t.target.value),style:{marginLeft:"8px"}})),s.createElement("div",{className:"flex row justify-space-between"},s.createElement("label",null,"Animation Duration: "),s.createElement("div",null,o?s.createElement("input",{type:"number",value:f,onChange:t=>y(t.target.valueAsNumber)}):s.createElement(s.Fragment,null),s.createElement("input",{type:"checkbox",checked:o,onChange:t=>h(t.target.checked),style:{marginLeft:"8px"}}))),s.createElement("div",{className:"flex row justify-space-between align-center"},s.createElement("label",null,"Generator: "),s.createElement(i.f,{options:a,getName:t=>t.name,value:d,onChange:t=>x(t)})),s.createElement("div",{className:"flex row justify-space-between align-center"},s.createElement("label",null,"Visualizer: "),s.createElement(i.f,{options:k,getName:t=>t.name,value:p,onChange:t=>m(t)}))),null!==c?s.createElement(l,Object.assign({},c)):s.createElement(s.Fragment,null))}}}]);
//# sourceMappingURL=fibvis.bundle.js.map