(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{73:function(t,e,n){"use strict";n.d(e,"a",(function(){return i}));class i{constructor(t,e){this.x=t,this.y=e}static zero(){return new i(0,0)}static fromAngle(t,e){return new i(Math.cos(t)*(null!=e?e:1),Math.sin(t)*(null!=e?e:1))}LengthSq(){return i.Dot(this,this)}Length(){return Math.sqrt(this.LengthSq())}Clone(){return new i(this.x,this.y)}Negate(){return new i(-this.x,-this.y)}NegateInPlace(){return this.x=-this.x,this.y=-this.y,this}static Dot(t,e){return t.x*e.x+t.y*e.y}DotWith(t){return i.Dot(this,t)}normalize(){let t=this.Length();return i.Multiply(this,1/t)}Direction(){return Math.atan2(this.y,this.x)}AddWith(t,e){const{x:n,y:i}=s(t,e);return this.x+=n,this.y+=i,this}MultWith(t,e){const{x:n,y:i}=s(t,e);return this.x*=n,this.y*=i,this}SubtractWith(t,e){const{x:n,y:i}=s(t,e);return this.x-=n,this.y-=i,this}DivideWith(t,e){const{x:n,y:i}=s(t,e);return this.x/=n,this.y/=i,this}Equals(t){return this.x===t.x&&this.y===t.y}static add(t,e,n){const{x:a,y:l}=s(e,n);return new i(t.x+a,t.y+l)}static subtract(t,e,n){const{x:a,y:l}=s(e,n);return new i(t.x-a,t.y-l)}static Multiply(t,e,n){return void 0!==n?new i(t.x*e,t.y*n):void 0!==e.x?new i(t.x*e.x,t.y*e.y):new i(t.x*e,t.y*e)}static interpolate(t,e,n){return new i(t.x+(e.x-t.x)*n,t.y+(e.y-t.y)*n)}static componentMin(t,e){return t.x<=e.x&&t.y<=e.y?t:e.x<=t.x&&e.y<=t.y?e:new i(Math.min(t.x,e.x),Math.min(t.y,e.y))}static componentMax(t,e){return t.x>=e.x&&t.y>=e.y?t:e.x>=t.x&&e.y>=t.y?e:new i(Math.max(t.x,e.x),Math.max(t.y,e.y))}rotate(t){const e=Math.atan2(this.y,this.x),n=this.Length();return i.fromAngle(e+t,n)}}function s(t,e){return void 0===e?{x:t.x,y:t.y}:{x:t,y:e}}},98:function(t,e,n){"use strict";n.r(e),n.d(e,"default",(function(){return x}));var i=n(0),s=n(11),a=n(13),l=n(73);class o{constructor(t,e){this.path=t,this.cost=e}static runPath(t,e,n,i){const s=[],a=[i];let l=0,r=i;for(let e=0;e<t.points.length;e++)s.push(e===i);for(let i=0;i<t.points.length-1;i++){let i=this.runStep(t,e,n,s,r);l+=t.distance(r,i),a.push(i),r=i,s[i]=!0}return new o(a,l)}static runStep(t,e,n,i,s){let a=[],l=0;for(let o=0;o<t.points.length;o++)if(s===o||i[o])a[o]=0;else{let i=Math.pow(1/t.distance(s,o),n)*Math.pow(t.weight(s,o),e);a.push(i),l+=i}let o=Math.random()*l;for(let t=0;t<a.length;t++)if(!i[t]&&(o-=a[t],o<=0))return t;return-1}}class r{constructor(t){this.points=t,this.initSignals()}initSignals(){this.signals=[],this.distances=[],this.maxDist=0;for(let t=0;t<this.points.length;t++){let e=[],n=[];for(let i=t+1;i<this.points.length;i++){e.push(1);let s=l.a.subtract(this.points[t],this.points[i]).Length();n.push(s),s>this.maxDist&&(this.maxDist=s)}this.signals.push(e),this.distances.push(n)}}setPoints(t){this.points=t,this.initSignals()}clearWeights(){for(let t=0;t<this.signals.length;t++)for(let e=0;e<this.signals[t].length;e++)this.signals[t][e]=1}multWeights(t){for(let e=0;e<this.signals.length;e++)for(let n=0;n<this.signals[e].length;n++)this.signals[e][n]*=t}addWeights(t,e){for(let n=0;n<t.length;n++){let i=(n+1)%t.length;this.weight(t[n],t[i],Math.max(0,Math.min(1,this.weight(t[n],t[i])+e)))}}weight(t,e,n){const i=Math.min(t,e),s=Math.max(t,e)-i-1;if(void 0===n)return this.signals[i][s];if(isNaN(n))throw"WHAT";this.signals[i][s]=n}distance(t,e){const n=Math.min(t,e),i=Math.max(t,e)-n-1;return this.distances[n][i]}point(t,e){if(void 0===e)return this.points[t];this.points[t]=e}}let h=-1;function c(t,e){g(),Object(a.b)(e,800,600);const n=e.getContext("2d");!function t(e,n,i,a){const l=function(t,e){let n=[];for(let i=0;i<t.numAnts;i++)n.push(o.runPath(e,t.signalPower,t.distancePower,0));e.multWeights(t.signalDecay);let i=1/t.numAnts,a=Object(s.a)(n,t=>t.cost),l=Object(s.d)(n,t=>t.cost);for(const t of n){let n;n=a.cost===l?1:1-(t.cost-a.cost)/(l-a.cost),e.addWeights(t.path,n*i)}return a}(i,a);(null===m||l.cost<m.cost)&&(m=l);(function(t,e,n,i,s){y(t,e,n.points),e.strokeStyle="#aaa";for(let t=0;t<n.points.length;t++)for(let i=0;i<n.points.length;i++)t!==i&&(e.beginPath(),e.lineWidth=5*n.weight(t,i),e.moveTo(n.point(t).x,n.point(t).y),e.lineTo(n.point(i).x,n.point(i).y),e.stroke());if(e.lineWidth=2,e.strokeStyle="green",void 0!==i){e.beginPath(),e.moveTo(n.point(i[0]).x,n.point(i[0]).y);for(let t=1;t<i.length;t++)e.lineTo(n.point(i[t]).x,n.point(i[t]).y);e.stroke()}if(e.lineWidth=2,e.strokeStyle="red",void 0!==s){e.beginPath(),e.moveTo(n.point(s[0]).x,n.point(s[0]).y);for(let t=1;t<s.length;t++)e.lineTo(n.point(s[t]).x,n.point(s[t]).y);e.stroke()}})(e,n,a,l.path,m.path),h=setTimeout(()=>t(e,n,i,a),i.delayPerFrame)}(e,n,t,function(t,e,n){const i=[];for(let e=0;e<n;e++)i.push(new l.a(Math.floor(Math.random()*t.width),Math.floor(Math.random()*t.height)));return y(t,e,i),new r(i)}(e,n,t.numPts))}function u(){g()}function g(){m=null,-1!==h&&clearTimeout(h)}let m=null;function y(t,e,n){e.fillStyle="black",e.fillRect(0,0,t.clientWidth,t.clientHeight),e.fillStyle="#aaa",e.beginPath();for(let t=0;t<n.length;t++){const i=n[t];e.moveTo(i.x,i.y),e.ellipse(i.x,i.y,3,3,0,0,2*Math.PI)}e.fill()}function x(){let t=i.useRef(),[e,n]=i.useState({numPts:100,signalDecay:.7,signalPower:1.2,distancePower:4,delayPerFrame:6,numAnts:30});return i.useEffect(()=>(c(e,t.current),u),[e,t]),i.createElement("div",{className:"flex row"},i.createElement("canvas",{id:"canvas",ref:t}),i.createElement("div",{className:"flex col"},i.createElement(p,{label:"Number of Points: ",value:e.numPts,onChange:t=>n(Object.assign(Object.assign({},e),{numPts:t})),min:3,max:200,step:1,type:"number"}),i.createElement(p,{label:"Number of Ants: ",value:e.numAnts,onChange:t=>n(Object.assign(Object.assign({},e),{numAnts:t})),min:1,max:100,step:1,type:"number"}),i.createElement(p,{label:"Signal Decay: ",value:e.signalDecay,onChange:t=>n(Object.assign(Object.assign({},e),{signalDecay:t})),min:0,max:1,step:.1,type:"float"}),i.createElement(p,{label:"Signal Power: ",value:e.signalPower,onChange:t=>n(Object.assign(Object.assign({},e),{signalPower:t})),min:1,max:8,step:.5,type:"float"}),i.createElement(p,{label:"Distance Power: ",value:e.distancePower,onChange:t=>n(Object.assign(Object.assign({},e),{distancePower:t})),min:1,max:8,step:.5,type:"float"}),i.createElement(p,{label:"Delay per Frame: ",value:e.delayPerFrame,onChange:t=>n(Object.assign(Object.assign({},e),{delayPerFrame:t})),min:6,max:600,step:30,type:"number"})))}function p(t){return i.createElement("div",null,i.createElement("label",null,t.label),i.createElement("input",{value:t.value,onChange:e=>t.onChange(e.target.valueAsNumber),type:"range",min:t.min,max:t.max,step:t.step}),i.createElement("input",{value:t.value,onChange:e=>t.onChange(e.target.valueAsNumber),type:t.type,min:t.min,max:t.max}))}}}]);
//# sourceMappingURL=14.bundle.js.map