(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{21:function(t,e,s){"use strict";s.d(e,"a",(function(){return h}));class i{constructor(t,e){this.keys=t,this.changes=e}isKeyDown(t){return-1!==this.keys.indexOf(t)}isKeyUp(t){return-1===this.keys.indexOf(t)}}class n{constructor(t,e){this.attachedElement=t,this.logKeyNames=e,void 0===this.logKeyNames&&(this.logKeyNames=!1),t.addEventListener("keydown",t=>this.onKeyDown(t)),t.addEventListener("keyup",t=>this.onKeyUp(t)),this.downKeys=[],this.changes=[]}onKeyDown(t){this.logKeyNames&&console.log(t.key);-1===this.downKeys.indexOf(t.key)&&(this.changes.push({key:t.key,change:"press"}),this.downKeys.push(t.key))}onKeyUp(t){this.changes.push({key:t.key,change:"release"});const e=this.downKeys.indexOf(t.key);this.downKeys.splice(e,1)}Update(){const t=this.downKeys,e=this.changes;return this.downKeys=t.slice(),this.changes=[],new i(t,e)}}class h{constructor(t,e){this.watcher=new n(t,e),this.prvState=this.currentState=this.watcher.Update()}update(){this.prvState=this.currentState,this.currentState=this.watcher.Update()}isKeyDown(t){return this.currentState.isKeyDown(t)}isKeyUp(t){return this.currentState.isKeyUp(t)}isKeyPressed(t){return this.currentState.isKeyDown(t)&&this.prvState.isKeyUp(t)}isKeyReleased(t){return this.currentState.isKeyUp(t)&&this.prvState.isKeyDown(t)}changes(){return this.currentState.changes}}},64:function(t,e,s){"use strict";s.d(e,"a",(function(){return i}));class i{constructor(t,e){this.x=t,this.y=e}LengthSq(){return i.Dot(this,this)}Length(){return Math.sqrt(this.LengthSq())}Clone(){return new i(this.x,this.y)}Negate(){return new i(-this.x,-this.y)}NegateInPlace(){return this.x=-this.x,this.y=-this.y,this}static Dot(t,e){return t.x*e.x+t.y*e.y}DotWith(t){return i.Dot(this,t)}Direction(){return Math.atan2(this.y,this.x)}AddWith(t,e){const s=void 0===e?t.x:t,i=void 0===e?t.y:e;return this.x+=s,this.y+=i,this}MultWith(t,e){const s=void 0===e?t.x:t,i=void 0===e?t.y:e;return this.x*=s,this.y*=i,this}SubtractWith(t,e){const s=void 0===e?t.x:t,i=void 0===e?t.y:e;return this.x-=s,this.y-=i,this}DivideWith(t,e){const s=void 0===e?t.x:t,i=void 0===e?t.y:e;return this.x/=s,this.y/=i,this}Equals(t){return this.x===t.x&&this.y===t.y}static Add(t,e){return new i(t.x+e.x,t.y+e.y)}static Multiply(t,e,s){return void 0!==s?new i(t.x*e,t.y*s):void 0!==e.x?new i(t.x*e.x,t.y*e.y):new i(t.x*e,t.y*e)}}},66:function(t,e,s){"use strict";s.d(e,"a",(function(){return i})),s.d(e,"c",(function(){return r})),s.d(e,"b",(function(){return a}));var i,n=s(64);!function(t){t[t.Up=0]="Up",t[t.UpRight=1]="UpRight",t[t.Right=2]="Right",t[t.DownRight=3]="DownRight",t[t.Down=4]="Down",t[t.DownLeft=5]="DownLeft",t[t.Left=6]="Left",t[t.UpLeft=7]="UpLeft"}(i||(i={}));const h=[new n.a(0,-1),new n.a(1,-1),new n.a(1,0),new n.a(1,1),new n.a(0,1),new n.a(-1,1),new n.a(-1,0),new n.a(-1,-1)],r=[i.Up,i.UpRight,i.Right,i.DownRight,i.Down,i.DownLeft,i.Left,i.UpLeft];i.Up,i.Right,i.Down,i.Left,i.UpRight,i.DownRight,i.DownLeft,i.UpLeft;function a(t){return h[t]}},68:function(t,e,s){"use strict";e.a=s.p+"bbb298f00b41bbd627d27aa0529a20ba.png"},78:function(t,e,s){"use strict";s.r(e),s.d(e,"default",(function(){return R}));var i=s(16),n=s(17),h=s(68),r=s.p+"42ace1eb95edbc899165c10bb9cc20ab.png",a=s.p+"e5352b303b79e08de36a8c4248cdbb28.png",o=s(7),c=s(20),l=s(66);function d(t,e,s){let i=!1;const n={break:()=>{i=!0}};if(e===t)return void s(t,n);const h=e>t?1:-1,r=e+h;for(let e=t;e!==r&&!i;e+=h)s(e,n)}class y{constructor(t,e,s){this.width=t,this.height=e,this.cells=[];for(let i=0;i<t;i++){const t=[];for(let i=0;i<e;i++)t.push(s());this.cells.push(t)}this.prerender=document.getElementById("world_prerender")}updatePrerender(){Object(o.b)(this.prerender,16*this.width,16*this.height);const t=this.prerender.getContext("2d");for(let e=0;e<this.width;e++)for(let s=0;s<this.height;s++)this.cells[e][s].paint(t,16*e,16*s)}tryMoveEntity(t,e,s){const i=e.x>=0?l.a.Right:l.a.Left,n=e.y>=0?l.a.Down:l.a.Up;if(0!==e.x){const n=Math.floor(t.Edge(i)/16),h=Math.floor((t.Edge(i)+e.x)/16),r=Math.floor(t.Edge(l.a.Up)/16),a=Math.floor((t.Edge(l.a.Down)-1)/16);let o;d(n,h,(t,e)=>{for(let i=r;i<=a;i++){if(t<0||t>=this.width)return o=t,void e.break();s&&s(t,i),this.cells[t][i].pathable||(e.break(),o=t)}}),void 0===o?t.x+=e.x:e.x>=0?t.x=16*o-t.w:t.x=16*(o+1)}if(0!==e.y){const i=Math.floor(t.Edge(n)/16),h=Math.floor((t.Edge(n)+e.y)/16),r=Math.floor(t.Edge(l.a.Left)/16),a=Math.floor((t.Edge(l.a.Right)-1)/16);let o;d(i,h,(t,e)=>{for(let i=r;i<=a;i++){if(t<0||t>=this.height)return o=t,void e.break();s&&s(i,t),this.cells[i][t].pathable||(e.break(),o=t)}}),void 0===o?t.y+=e.y:e.y>=0?t.y=16*o-t.h:t.y=16*(o+1)}}}class u{constructor(t,e,s){this.sheet=t,this.tileX=e,this.tileY=s,this.width=t.spriteWidth,this.height=t.spriteHeight}paint(t,e,s,i,n){this.sheet.render(t,e,s,i,n,this.tileX,this.tileY)}}const w=[[10,0],[10,0],[10,0],[10,0],[10,0],[7,1],[7,1],[10,1],[10,2],[9,2]];class p{constructor(t,e){this.pathable=t,this.graphic=e}paint(t,e,s){this.graphic.paint(t,e,s,16,16)}static GrassFloor(t){const e=w[Math.floor(Math.random()*w.length)];return new p(!0,new u(t,e[0],e[1]))}static RockWall(t){return new p(!1,new u(t,7,24))}}var g=s(64);class f{constructor(t,e,s,i){this.x=t,this.y=e,this.w=s,this.h=i}Shift(t,e){return void 0===e?new f(this.x+t.x,this.y+t.y,this.w,this.h):new f(this.x+t,this.y+e,this.w,this.h)}ShiftBy(t,e){void 0===e?(this.x+=t.x,this.y+=t.y):(this.x+=t,this.y+=e)}Edge(t){switch(t){case l.a.Up:return this.y;case l.a.Down:return this.y+this.h;case l.a.Left:return this.x;case l.a.Right:return this.x+this.w}}Corner(t){switch(t){case l.a.UpRight:case l.a.DownRight:case l.a.DownLeft:case l.a.UpLeft:return new g.a(this.x,this.y)}}equals(t){return t.x===this.x&&t.y===this.y&&t.w===this.w&&t.h===this.h}}var x=s(21),b=s(11),D=s.n(b);class v{constructor(t,e){this.onload=e,D.a.get(t).subscribe(t=>{this.body=t.data,this.onload()})}}let K,U,k,L;function R(){const t=new i.a;K={tiles:new n.a(16,16,r,t.registerAssetLoadCallback()),wizard:new n.a(16,16,a,t.registerAssetLoadCallback()),arrows:new n.a(16,16,h.a,t.registerAssetLoadCallback()),tilesets:new v("../dist/assets/rpgtest/tilesets.json",t.registerAssetLoadCallback())},L=new x.a(document.body),t.onAllFinished(M)}function M(){k=new y(56,56,()=>Math.random()<=.15?p.RockWall(K.tiles):p.GrassFloor(K.tiles)),k.updatePrerender();const t=document.getElementById("mainCanvas");U=t.getContext("2d");new c.a(t,U,448,448,!0,()=>{});!function t(){U.clearRect(0,0,448,448),Object(o.a)(U),U.save();let e=0,s=0;k.width>28&&(e=Math.max(0,Math.min(16*(k.width-28),S.x-224)));k.height>28&&(s=Math.max(0,Math.min(16*(k.height-28),S.y-224)));m.MultWith(3,3).AddWith(e,s).DivideWith(4,4),U.translate(-m.x,-m.y),U.drawImage(k.prerender,0,0),L.update(),U.fillStyle="blue",U.fillRect(S.x,S.y,S.w,S.h);const i=new g.a(0,0);L.isKeyDown("a")&&(i.x=-3);L.isKeyDown("d")&&(i.x=3);L.isKeyDown("w")&&(i.y=-3);L.isKeyDown("s")&&(i.y=3);U.fillStyle="yellow",U.globalAlpha=.6,k.tryMoveEntity(S,i,(t,e)=>{U.fillRect(16*t,16*e,16,16)}),U.globalAlpha=1,E=!E,E&&(U.fillStyle="white",U.fillRect(0,0,10,10));U.restore(),requestAnimationFrame(()=>t())}()}const m=new g.a(0,0),S=new f(0,0,14,14);let E=!1}}]);
//# sourceMappingURL=rpgTest.bundle.js.map