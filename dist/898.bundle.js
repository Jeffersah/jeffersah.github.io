"use strict";(self.webpackChunktrading_game=self.webpackChunktrading_game||[]).push([[898],{8785:(t,e,n)=>{n.d(e,{Z:()=>i});class i{constructor(t,e){this.x=t,this.y=e}static zero(){return new i(0,0)}static fromAngle(t,e){return new i(Math.cos(t)*(null!=e?e:1),Math.sin(t)*(null!=e?e:1))}LengthSq(){return i.Dot(this,this)}Length(){return Math.sqrt(this.LengthSq())}Clone(){return new i(this.x,this.y)}Negate(){return new i(-this.x,-this.y)}NegateInPlace(){return this.x=-this.x,this.y=-this.y,this}static Dot(t,e){return t.x*e.x+t.y*e.y}DotWith(t){return i.Dot(this,t)}normalize(){let t=this.Length();return i.Multiply(this,1/t)}Direction(){return Math.atan2(this.y,this.x)}Truncate(){return new i(Math.trunc(this.x),Math.trunc(this.y))}AddWith(t,e){const{x:n,y:i}=s(t,e);return this.x+=n,this.y+=i,this}MultWith(t,e){const{x:n,y:i}=function(t,e){return void 0===e?void 0!==t.x?{x:t.x,y:t.y}:{x:t,y:t}:{x:t,y:e}}(t,e);return this.x*=n,this.y*=i,this}SubtractWith(t,e){const{x:n,y:i}=s(t,e);return this.x-=n,this.y-=i,this}DivideWith(t,e){const{x:n,y:i}=s(t,e);return this.x/=n,this.y/=i,this}Equals(t){return this.x===t.x&&this.y===t.y}static add(t,e,n){const{x:a,y:l}=s(e,n);return new i(t.x+a,t.y+l)}static subtract(t,e,n){const{x:a,y:l}=s(e,n);return new i(t.x-a,t.y-l)}static Multiply(t,e,n){return void 0!==n?new i(t.x*e,t.y*n):void 0!==e.x?new i(t.x*e.x,t.y*e.y):new i(t.x*e,t.y*e)}static interpolate(t,e,n){return new i(t.x+(e.x-t.x)*n,t.y+(e.y-t.y)*n)}static componentMin(t,e){return t.x<=e.x&&t.y<=e.y?t:e.x<=t.x&&e.y<=t.y?e:new i(Math.min(t.x,e.x),Math.min(t.y,e.y))}static componentMax(t,e){return t.x>=e.x&&t.y>=e.y?t:e.x>=t.x&&e.y>=t.y?e:new i(Math.max(t.x,e.x),Math.max(t.y,e.y))}static Bezier(t,e){return 1===t.length?t[0]:2===t.length?i.add(i.Multiply(t[1],e),i.Multiply(t[0],1-e)):i.add(i.Multiply(i.Bezier(t.slice(1),e),e),i.Multiply(i.Bezier(t.slice(0,t.length-1),e),1-e))}rotate(t){const e=Math.atan2(this.y,this.x),n=this.Length();return i.fromAngle(e+t,n)}}function s(t,e){return void 0===e?{x:t.x,y:t.y}:{x:t,y:e}}},7898:(t,e,n)=>{n.r(e),n.d(e,{default:()=>p});var i=n(7363),s=n(7584),a=n(5901),l=n(8785);class r{constructor(t,e){this.path=t,this.cost=e}static runPath(t,e,n,i){const s=[],a=[i];let l=0,h=i;for(let e=0;e<t.points.length;e++)s.push(e===i);for(let i=0;i<t.points.length-1;i++){let i=this.runStep(t,e,n,s,h);l+=t.distance(h,i),a.push(i),h=i,s[i]=!0}return new r(a,l)}static runStep(t,e,n,i,s){let a=[],l=0;for(let r=0;r<t.points.length;r++)if(s===r||i[r])a[r]=0;else{let i=Math.pow(1/t.distance(s,r),n)*Math.pow(t.weight(s,r),e);a.push(i),l+=i}let r=Math.random()*l;for(let t=0;t<a.length;t++)if(!i[t]&&(r-=a[t],r<=0))return t;return-1}}class h{constructor(t){this.points=t,this.initSignals()}initSignals(){this.signals=[],this.distances=[],this.maxDist=0;for(let t=0;t<this.points.length;t++){let e=[],n=[];for(let i=t+1;i<this.points.length;i++){e.push(1);let s=l.Z.subtract(this.points[t],this.points[i]).Length();n.push(s),s>this.maxDist&&(this.maxDist=s)}this.signals.push(e),this.distances.push(n)}}setPoints(t){this.points=t,this.initSignals()}clearWeights(){for(let t=0;t<this.signals.length;t++)for(let e=0;e<this.signals[t].length;e++)this.signals[t][e]=1}multWeights(t){for(let e=0;e<this.signals.length;e++)for(let n=0;n<this.signals[e].length;n++)this.signals[e][n]*=t}addWeights(t,e){for(let n=0;n<t.length;n++){let i=(n+1)%t.length;this.weight(t[n],t[i],Math.max(0,Math.min(1,this.weight(t[n],t[i])+e)))}}weight(t,e,n){const i=Math.min(t,e),s=Math.max(t,e)-i-1;if(void 0===n)return this.signals[i][s];if(isNaN(n))throw"WHAT";this.signals[i][s]=n}distance(t,e){const n=Math.min(t,e),i=Math.max(t,e)-n-1;return this.distances[n][i]}point(t,e){if(void 0===e)return this.points[t];this.points[t]=e}}let o=-1;function u(t,e){g(),(0,a.f5)(e,800,600);const n=e.getContext("2d");let i=function(t,e,n){const i=[];for(let e=0;e<n;e++)i.push(new l.Z(Math.floor(Math.random()*t.width),Math.floor(Math.random()*t.height)));return x(t,e,i),new h(i)}(e,n,t.numPts);m(e,n,t,i)}function c(){g()}function g(){y=null,-1!==o&&clearTimeout(o)}let y=null;function m(t,e,n,i){const a=function(t,e){let n=[];for(let i=0;i<t.numAnts;i++)n.push(r.runPath(e,t.signalPower,t.distancePower,0));e.multWeights(t.signalDecay);let i=1/t.numAnts,a=(0,s.gN)(n,(t=>t.cost)),l=(0,s.Fp)(n,(t=>t.cost));for(const t of n){let n;n=a.cost===l?1:1-(t.cost-a.cost)/(l-a.cost),e.addWeights(t.path,n*i)}return a}(n,i);(null===y||a.cost<y.cost)&&(y=a),function(t,e,n,i,s){x(t,e,n.points),e.strokeStyle="#aaa";for(let t=0;t<n.points.length;t++)for(let i=0;i<n.points.length;i++)t!==i&&(e.beginPath(),e.lineWidth=5*n.weight(t,i),e.moveTo(n.point(t).x,n.point(t).y),e.lineTo(n.point(i).x,n.point(i).y),e.stroke());if(e.lineWidth=2,e.strokeStyle="green",void 0!==i){e.beginPath(),e.moveTo(n.point(i[0]).x,n.point(i[0]).y);for(let t=1;t<i.length;t++)e.lineTo(n.point(i[t]).x,n.point(i[t]).y);e.stroke()}if(e.lineWidth=2,e.strokeStyle="red",void 0!==s){e.beginPath(),e.moveTo(n.point(s[0]).x,n.point(s[0]).y);for(let t=1;t<s.length;t++)e.lineTo(n.point(s[t]).x,n.point(s[t]).y);e.stroke()}}(t,e,i,a.path,y.path),o=setTimeout((()=>m(t,e,n,i)),n.delayPerFrame)}function x(t,e,n){e.fillStyle="black",e.fillRect(0,0,t.clientWidth,t.clientHeight),e.fillStyle="#aaa",e.beginPath();for(let t=0;t<n.length;t++){const i=n[t];e.moveTo(i.x,i.y),e.ellipse(i.x,i.y,3,3,0,0,2*Math.PI)}e.fill()}function p(){let t=i.useRef(),[e,n]=i.useState({numPts:100,signalDecay:.7,signalPower:1.2,distancePower:4,delayPerFrame:6,numAnts:30});return i.useEffect((()=>(u(e,t.current),c)),[e,t]),i.createElement("div",{className:"flex row"},i.createElement("canvas",{id:"canvas",ref:t}),i.createElement("div",{className:"flex col"},i.createElement(f,{label:"Number of Points: ",value:e.numPts,onChange:t=>n(Object.assign(Object.assign({},e),{numPts:t})),min:3,max:200,step:1,type:"number"}),i.createElement(f,{label:"Number of Ants: ",value:e.numAnts,onChange:t=>n(Object.assign(Object.assign({},e),{numAnts:t})),min:1,max:100,step:1,type:"number"}),i.createElement(f,{label:"Signal Decay: ",value:e.signalDecay,onChange:t=>n(Object.assign(Object.assign({},e),{signalDecay:t})),min:0,max:1,step:.1,type:"float"}),i.createElement(f,{label:"Signal Power: ",value:e.signalPower,onChange:t=>n(Object.assign(Object.assign({},e),{signalPower:t})),min:1,max:8,step:.5,type:"float"}),i.createElement(f,{label:"Distance Power: ",value:e.distancePower,onChange:t=>n(Object.assign(Object.assign({},e),{distancePower:t})),min:1,max:8,step:.5,type:"float"}),i.createElement(f,{label:"Delay per Frame: ",value:e.delayPerFrame,onChange:t=>n(Object.assign(Object.assign({},e),{delayPerFrame:t})),min:6,max:600,step:30,type:"number"})))}function f(t){return i.createElement("div",null,i.createElement("label",null,t.label),i.createElement("input",{value:t.value,onChange:e=>t.onChange(e.target.valueAsNumber),type:"range",min:t.min,max:t.max,step:t.step}),i.createElement("input",{value:t.value,onChange:e=>t.onChange(e.target.valueAsNumber),type:t.type,min:t.min,max:t.max}))}}}]);
//# sourceMappingURL=898.bundle.js.map