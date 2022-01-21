"use strict";(self.webpackChunktrading_game=self.webpackChunktrading_game||[]).push([[704],{8785:(t,e,s)=>{s.d(e,{Z:()=>n});class n{constructor(t,e){this.x=t,this.y=e}static zero(){return new n(0,0)}static fromAngle(t,e){return new n(Math.cos(t)*(null!=e?e:1),Math.sin(t)*(null!=e?e:1))}LengthSq(){return n.Dot(this,this)}Length(){return Math.sqrt(this.LengthSq())}Clone(){return new n(this.x,this.y)}Negate(){return new n(-this.x,-this.y)}NegateInPlace(){return this.x=-this.x,this.y=-this.y,this}static Dot(t,e){return t.x*e.x+t.y*e.y}DotWith(t){return n.Dot(this,t)}normalize(){let t=this.Length();return n.Multiply(this,1/t)}Direction(){return Math.atan2(this.y,this.x)}Truncate(){return new n(Math.trunc(this.x),Math.trunc(this.y))}AddWith(t,e){const{x:s,y:n}=i(t,e);return this.x+=s,this.y+=n,this}MultWith(t,e){const{x:s,y:n}=function(t,e){return void 0===e?void 0!==t.x?{x:t.x,y:t.y}:{x:t,y:t}:{x:t,y:e}}(t,e);return this.x*=s,this.y*=n,this}SubtractWith(t,e){const{x:s,y:n}=i(t,e);return this.x-=s,this.y-=n,this}DivideWith(t,e){const{x:s,y:n}=i(t,e);return this.x/=s,this.y/=n,this}Equals(t){return this.x===t.x&&this.y===t.y}static add(t,e,s){const{x:r,y:a}=i(e,s);return new n(t.x+r,t.y+a)}static subtract(t,e,s){const{x:r,y:a}=i(e,s);return new n(t.x-r,t.y-a)}static Multiply(t,e,s){return void 0!==s?new n(t.x*e,t.y*s):void 0!==e.x?new n(t.x*e.x,t.y*e.y):new n(t.x*e,t.y*e)}static interpolate(t,e,s){return new n(t.x+(e.x-t.x)*s,t.y+(e.y-t.y)*s)}static componentMin(t,e){return t.x<=e.x&&t.y<=e.y?t:e.x<=t.x&&e.y<=t.y?e:new n(Math.min(t.x,e.x),Math.min(t.y,e.y))}static componentMax(t,e){return t.x>=e.x&&t.y>=e.y?t:e.x>=t.x&&e.y>=t.y?e:new n(Math.max(t.x,e.x),Math.max(t.y,e.y))}static Bezier(t,e){return 1===t.length?t[0]:2===t.length?n.add(n.Multiply(t[1],e),n.Multiply(t[0],1-e)):n.add(n.Multiply(n.Bezier(t.slice(1),e),e),n.Multiply(n.Bezier(t.slice(0,t.length-1),e),1-e))}rotate(t){const e=Math.atan2(this.y,this.x),s=this.Length();return n.fromAngle(e+t,s)}}function i(t,e){return void 0===e?{x:t.x,y:t.y}:{x:t,y:e}}},8704:(t,e,s)=>{s.r(e),s.d(e,{default:()=>u});var n=s(7363),i=s(5901),r=s(8785);class a{constructor(t,e,s){this.bounds=t,this.blockMove=e,this.blockBullets=s}}const h=new class{constructor(t,e){this.recursePosition=t,this.obstructions=e}}({center:new r.Z(400,300),scale:.25,rotation:0},[new a([new r.Z(0,0),new r.Z(100,0),new r.Z(100,600),new r.Z(0,600)],!0,!0),new a([new r.Z(700,0),new r.Z(800,0),new r.Z(800,600),new r.Z(700,600)],!0,!0)]);class c{constructor(t){this.map=t}update(){}initOffscreenCanvas(t){this.offscreenCanvas=document.createElement("canvas"),(0,i.f5)(this.offscreenCanvas,t.width,t.height),this.offscreenCtx=this.offscreenCanvas.getContext("2d")}draw(t,e){null!==this.offscreenCanvas&&void 0!==this.offscreenCanvas||this.initOffscreenCanvas(t),this.renderWorld(this.offscreenCanvas,this.offscreenCtx),e.save(),this.recursiveRender(this.offscreenCanvas,t,e),e.restore()}recursiveRender(t,e,s){for(let n=0;n<8;n++){s.drawImage(t,0,0,e.width,e.height),s.translate(-400,-300),s.scale(this.map.recursePosition.scale,this.map.recursePosition.scale),s.rotate(this.map.recursePosition.rotation);const n=this.map.recursePosition.center.rotate(-this.map.recursePosition.rotation).MultWith(1/this.map.recursePosition.scale,1/this.map.recursePosition.scale);s.translate(n.x,n.y)}}renderWorld(t,e){e.save(),e.fillStyle="black",e.fillRect(0,0,800,600),e.beginPath();for(const t of this.map.obstructions){e.moveTo(t.bounds[0].x,t.bounds[0].y);for(let s=1;s<=t.bounds.length;s++)e.lineTo(t.bounds[s%t.bounds.length].x,t.bounds[s%t.bounds.length].y)}e.fillStyle="#006",e.strokeStyle="blue",e.fill(),e.stroke(),e.restore()}}class o{constructor(t){this.canvas=t,(0,i.f5)(t,800,600),this.ctx=t.getContext("2d"),this.repaintTimer=-1,this.screen=new c(h)}start(){this.runTick()}runTick(){this.tick(),this.repaintTimer=requestAnimationFrame(this.runTick.bind(this))}tick(){this.screen.update((t=>{this.screen=t})),this.ctx.save(),this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.screen.draw(this.canvas,this.ctx),this.ctx.restore()}stop(){-1!==this.repaintTimer&&cancelAnimationFrame(this.repaintTimer)}}function u(){const t=n.useRef();return n.useEffect((()=>{const e=new o(t.current);return e.start(),()=>e.stop()}),[t.current]),n.createElement("canvas",{ref:t})}}}]);
//# sourceMappingURL=704.bundle.js.map