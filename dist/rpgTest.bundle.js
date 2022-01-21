"use strict";(self.webpackChunktrading_game=self.webpackChunktrading_game||[]).push([[410],{1647:(t,e,s)=>{s.d(e,{Z:()=>i});const i=s.p+"bbb298f00b41bbd627d27aa0529a20ba.png"},6718:(t,e,s)=>{s.d(e,{Z:()=>h});class i{constructor(t,e){this.keys=t,this.changes=e}isKeyDown(t){return-1!==this.keys.indexOf(t)}isKeyUp(t){return-1===this.keys.indexOf(t)}}class n{constructor(t,e){this.attachedElement=t,this.logKeyNames=e,void 0===this.logKeyNames&&(this.logKeyNames=!1),t.addEventListener("keydown",(t=>this.onKeyDown(t))),t.addEventListener("keyup",(t=>this.onKeyUp(t))),this.downKeys=[],this.changes=[]}onKeyDown(t){this.logKeyNames&&console.log(t.key),-1===this.downKeys.indexOf(t.key)&&(this.changes.push({key:t.key,change:"press"}),this.downKeys.push(t.key))}onKeyUp(t){this.changes.push({key:t.key,change:"release"});const e=this.downKeys.indexOf(t.key);this.downKeys.splice(e,1)}Update(){const t=this.downKeys,e=this.changes;return this.downKeys=t.slice(),this.changes=[],new i(t,e)}}class h{constructor(t,e){this.watcher=new n(t,e),this.prvState=this.currentState=this.watcher.Update()}update(){this.prvState=this.currentState,this.currentState=this.watcher.Update()}isKeyDown(t){return this.currentState.isKeyDown(t)}isKeyUp(t){return this.currentState.isKeyUp(t)}isKeyPressed(t){return this.currentState.isKeyDown(t)&&this.prvState.isKeyUp(t)}isKeyReleased(t){return this.currentState.isKeyUp(t)&&this.prvState.isKeyDown(t)}changes(){return this.currentState.changes}}},615:(t,e,s)=>{s.d(e,{Nm:()=>i,Dz:()=>r,jR:()=>a});var i,n=s(8785);!function(t){t[t.Up=0]="Up",t[t.UpRight=1]="UpRight",t[t.Right=2]="Right",t[t.DownRight=3]="DownRight",t[t.Down=4]="Down",t[t.DownLeft=5]="DownLeft",t[t.Left=6]="Left",t[t.UpLeft=7]="UpLeft"}(i||(i={}));const h=[new n.Z(0,-1),new n.Z(1,-1),new n.Z(1,0),new n.Z(1,1),new n.Z(0,1),new n.Z(-1,1),new n.Z(-1,0),new n.Z(-1,-1)],r=[i.Up,i.UpRight,i.Right,i.DownRight,i.Down,i.DownLeft,i.Left,i.UpLeft];function a(t){return h[t]}i.Up,i.Right,i.Down,i.Left,i.UpRight,i.DownRight,i.DownLeft,i.UpLeft},8785:(t,e,s)=>{s.d(e,{Z:()=>i});class i{constructor(t,e){this.x=t,this.y=e}static zero(){return new i(0,0)}static fromAngle(t,e){return new i(Math.cos(t)*(null!=e?e:1),Math.sin(t)*(null!=e?e:1))}lengthSq(){return i.dot(this,this)}length(){return Math.sqrt(this.lengthSq())}clone(){return new i(this.x,this.y)}negate(){return new i(-this.x,-this.y)}negateInPlace(){return this.x=-this.x,this.y=-this.y,this}static dot(t,e){return t.x*e.x+t.y*e.y}dotWith(t){return i.dot(this,t)}normalize(){let t=this.length();return i.multiply(this,1/t)}direction(){return Math.atan2(this.y,this.x)}truncate(){return new i(Math.trunc(this.x),Math.trunc(this.y))}addWith(t,e){const{x:s,y:i}=n(t,e);return this.x+=s,this.y+=i,this}multWith(t,e){const{x:s,y:i}=function(t,e){return void 0===e?void 0!==t.x?{x:t.x,y:t.y}:{x:t,y:t}:{x:t,y:e}}(t,e);return this.x*=s,this.y*=i,this}subtractWith(t,e){const{x:s,y:i}=n(t,e);return this.x-=s,this.y-=i,this}divideWith(t,e){const{x:s,y:i}=n(t,e);return this.x/=s,this.y/=i,this}equals(t){return this.x===t.x&&this.y===t.y}static add(t,e,s){const{x:h,y:r}=n(e,s);return new i(t.x+h,t.y+r)}static subtract(t,e,s){const{x:h,y:r}=n(e,s);return new i(t.x-h,t.y-r)}static multiply(t,e,s){return void 0!==s?new i(t.x*e,t.y*s):void 0!==e.x?new i(t.x*e.x,t.y*e.y):new i(t.x*e,t.y*e)}static interpolate(t,e,s){return new i(t.x+(e.x-t.x)*s,t.y+(e.y-t.y)*s)}static componentMin(t,e){return t.x<=e.x&&t.y<=e.y?t:e.x<=t.x&&e.y<=t.y?e:new i(Math.min(t.x,e.x),Math.min(t.y,e.y))}static componentMax(t,e){return t.x>=e.x&&t.y>=e.y?t:e.x>=t.x&&e.y>=t.y?e:new i(Math.max(t.x,e.x),Math.max(t.y,e.y))}static Bezier(t,e){return 1===t.length?t[0]:2===t.length?i.add(i.multiply(t[1],e),i.multiply(t[0],1-e)):i.add(i.multiply(i.Bezier(t.slice(1),e),e),i.multiply(i.Bezier(t.slice(0,t.length-1),e),1-e))}rotate(t){const e=Math.atan2(this.y,this.x),s=this.length();return i.fromAngle(e+t,s)}}function n(t,e){return void 0===e?{x:t.x,y:t.y}:{x:t,y:e}}},717:(t,e,s)=>{s.r(e),s.d(e,{default:()=>U});const i=16;var n=s(127),h=s(3486),r=s(1647);const a=s.p+"42ace1eb95edbc899165c10bb9cc20ab.png",o=s.p+"e5352b303b79e08de36a8c4248cdbb28.png";var c=s(5901),l=s(7604),y=s(615);function d(t,e,s){let i=!1;const n={break:()=>{i=!0}};if(e===t)return void s(t,n);const h=e>t?1:-1,r=e+h;for(let e=t;e!==r&&!i;e+=h)s(e,n)}class u{constructor(t,e,s){this.width=t,this.height=e,this.cells=[];for(let i=0;i<t;i++){const t=[];for(let i=0;i<e;i++)t.push(s());this.cells.push(t)}this.prerender=document.getElementById("world_prerender")}updatePrerender(){(0,c.f5)(this.prerender,i*this.width,i*this.height);const t=this.prerender.getContext("2d");for(let e=0;e<this.width;e++)for(let s=0;s<this.height;s++)this.cells[e][s].paint(t,e*i,s*i)}tryMoveEntity(t,e,s){const n=e.x>=0?y.Nm.Right:y.Nm.Left,h=e.y>=0?y.Nm.Down:y.Nm.Up;if(0!==e.x){const h=Math.floor(t.edge(n)/i),r=Math.floor((t.edge(n)+e.x)/i),a=Math.floor(t.edge(y.Nm.Up)/i),o=Math.floor((t.edge(y.Nm.Down)-1)/i);let c;d(h,r,((t,e)=>{for(let i=a;i<=o;i++){if(t<0||t>=this.width)return c=t,void e.break();s&&s(t,i),this.cells[t][i].pathable||(e.break(),c=t)}})),void 0===c?t.x+=e.x:e.x>=0?t.x=c*i-t.w:t.x=(c+1)*i}if(0!==e.y){const n=Math.floor(t.edge(h)/i),r=Math.floor((t.edge(h)+e.y)/i),a=Math.floor(t.edge(y.Nm.Left)/i),o=Math.floor((t.edge(y.Nm.Right)-1)/i);let c;d(n,r,((t,e)=>{for(let i=a;i<=o;i++){if(t<0||t>=this.height)return c=t,void e.break();s&&s(i,t),this.cells[i][t].pathable||(e.break(),c=t)}})),void 0===c?t.y+=e.y:e.y>=0?t.y=c*i-t.h:t.y=(c+1)*i}}}class w{constructor(t,e,s){this.sheet=t,this.tileX=e,this.tileY=s,this.width=t.spriteWidth,this.height=t.spriteHeight}paint(t,e,s,i,n){this.sheet.render(t,e,s,i,n,this.tileX,this.tileY)}}const x=[[10,0],[10,0],[10,0],[10,0],[10,0],[7,1],[7,1],[10,1],[10,2],[9,2]];class g{constructor(t,e){this.pathable=t,this.graphic=e}paint(t,e,s){this.graphic.paint(t,e,s,i,i)}static GrassFloor(t){const e=x[Math.floor(Math.random()*x.length)];return new g(!0,new w(t,e[0],e[1]))}static RockWall(t){return new g(!1,new w(t,7,24))}}var p=s(8785);class f{constructor(t,e,s,i){this.x=t,this.y=e,this.w=s,this.h=i}shift(t,e){return void 0===e?new f(this.x+t.x,this.y+t.y,this.w,this.h):new f(this.x+t,this.y+e,this.w,this.h)}shiftBy(t,e){void 0===e?(this.x+=t.x,this.y+=t.y):(this.x+=t,this.y+=e)}edge(t){switch(t){case y.Nm.Up:return this.y;case y.Nm.Down:return this.y+this.h;case y.Nm.Left:return this.x;case y.Nm.Right:return this.x+this.w}}corner(t){switch(t){case y.Nm.UpRight:case y.Nm.DownRight:case y.Nm.DownLeft:case y.Nm.UpLeft:return new p.Z(this.x,this.y)}}equals(t){return t.x===this.x&&t.y===this.y&&t.w===this.w&&t.h===this.h}}var m=s(6718),b=s(6417);class K{constructor(t,e){this.onload=e,b.ZP.get(t).subscribe((t=>{this.body=t.data,this.onload()}))}}let v,M,D,k;function U(){const t=new n.Z;v={tiles:new h.V(16,16,a,t.registerAssetLoadCallback()),wizard:new h.V(16,16,o,t.registerAssetLoadCallback()),arrows:new h.V(16,16,r.Z,t.registerAssetLoadCallback()),tilesets:new K("../dist/assets/rpgtest/tilesets.json",t.registerAssetLoadCallback())},k=new m.Z(document.body),t.onAllFinished(R)}function R(){D=new u(56,56,(()=>Math.random()<=.15?g.RockWall(v.tiles):g.GrassFloor(v.tiles))),D.updatePrerender();const t=document.getElementById("mainCanvas");M=t.getContext("2d"),new l.Z(t,M,448,448,!0,(()=>{})),S()}const L=new p.Z(0,0),N=new f(0,0,14,14);let Z=!1;function S(){M.clearRect(0,0,448,448),(0,c.Ci)(M),M.save();let t=0,e=0;D.width>28&&(t=Math.max(0,Math.min((D.width-28)*i,N.x-224))),D.height>28&&(e=Math.max(0,Math.min((D.height-28)*i,N.y-224))),L.multWith(3,3).addWith(t,e).divideWith(4,4),M.translate(-L.x,-L.y),M.drawImage(D.prerender,0,0),k.update(),M.fillStyle="blue",M.fillRect(N.x,N.y,N.w,N.h);const s=new p.Z(0,0);k.isKeyDown("a")&&(s.x=-3),k.isKeyDown("d")&&(s.x=3),k.isKeyDown("w")&&(s.y=-3),k.isKeyDown("s")&&(s.y=3),M.fillStyle="yellow",M.globalAlpha=.6,D.tryMoveEntity(N,s,((t,e)=>{M.fillRect(t*i,e*i,i,i)})),M.globalAlpha=1,Z=!Z,Z&&(M.fillStyle="white",M.fillRect(0,0,10,10)),M.restore(),requestAnimationFrame((()=>S()))}}}]);
//# sourceMappingURL=rpgTest.bundle.js.map