"use strict";(self.webpackChunktrading_game=self.webpackChunktrading_game||[]).push([[153],{615:(t,e,i)=>{i.d(e,{Nm:()=>s,Dz:()=>o,jR:()=>h});var s,n=i(8785);!function(t){t[t.Up=0]="Up",t[t.UpRight=1]="UpRight",t[t.Right=2]="Right",t[t.DownRight=3]="DownRight",t[t.Down=4]="Down",t[t.DownLeft=5]="DownLeft",t[t.Left=6]="Left",t[t.UpLeft=7]="UpLeft"}(s||(s={}));const r=[new n.Z(0,-1),new n.Z(1,-1),new n.Z(1,0),new n.Z(1,1),new n.Z(0,1),new n.Z(-1,1),new n.Z(-1,0),new n.Z(-1,-1)],o=[s.Up,s.UpRight,s.Right,s.DownRight,s.Down,s.DownLeft,s.Left,s.UpLeft];function h(t){return r[t]}s.Up,s.Right,s.Down,s.Left,s.UpRight,s.DownRight,s.DownLeft,s.UpLeft},8785:(t,e,i)=>{i.d(e,{Z:()=>s});class s{constructor(t,e){this.x=t,this.y=e}static zero(){return new s(0,0)}static fromAngle(t,e){return new s(Math.cos(t)*(null!=e?e:1),Math.sin(t)*(null!=e?e:1))}LengthSq(){return s.Dot(this,this)}Length(){return Math.sqrt(this.LengthSq())}Clone(){return new s(this.x,this.y)}Negate(){return new s(-this.x,-this.y)}NegateInPlace(){return this.x=-this.x,this.y=-this.y,this}static Dot(t,e){return t.x*e.x+t.y*e.y}DotWith(t){return s.Dot(this,t)}normalize(){let t=this.Length();return s.Multiply(this,1/t)}Direction(){return Math.atan2(this.y,this.x)}AddWith(t,e){const{x:i,y:s}=n(t,e);return this.x+=i,this.y+=s,this}MultWith(t,e){const{x:i,y:s}=function(t,e){return void 0===e?void 0!==t.x?{x:t.x,y:t.y}:{x:t,y:t}:{x:t,y:e}}(t,e);return this.x*=i,this.y*=s,this}SubtractWith(t,e){const{x:i,y:s}=n(t,e);return this.x-=i,this.y-=s,this}DivideWith(t,e){const{x:i,y:s}=n(t,e);return this.x/=i,this.y/=s,this}Equals(t){return this.x===t.x&&this.y===t.y}static add(t,e,i){const{x:r,y:o}=n(e,i);return new s(t.x+r,t.y+o)}static subtract(t,e,i){const{x:r,y:o}=n(e,i);return new s(t.x-r,t.y-o)}static Multiply(t,e,i){return void 0!==i?new s(t.x*e,t.y*i):void 0!==e.x?new s(t.x*e.x,t.y*e.y):new s(t.x*e,t.y*e)}static interpolate(t,e,i){return new s(t.x+(e.x-t.x)*i,t.y+(e.y-t.y)*i)}static componentMin(t,e){return t.x<=e.x&&t.y<=e.y?t:e.x<=t.x&&e.y<=t.y?e:new s(Math.min(t.x,e.x),Math.min(t.y,e.y))}static componentMax(t,e){return t.x>=e.x&&t.y>=e.y?t:e.x>=t.x&&e.y>=t.y?e:new s(Math.max(t.x,e.x),Math.max(t.y,e.y))}static Bezier(t,e){return 1===t.length?t[0]:2===t.length?s.add(s.Multiply(t[1],e),s.Multiply(t[0],1-e)):s.add(s.Multiply(s.Bezier(t.slice(1),e),e),s.Multiply(s.Bezier(t.slice(0,t.length-1),e),1-e))}rotate(t){const e=Math.atan2(this.y,this.x),i=this.Length();return s.fromAngle(e+t,i)}}function n(t,e){return void 0===e?{x:t.x,y:t.y}:{x:t,y:e}}},2126:(t,e,i)=>{i.r(e),i.d(e,{default:()=>R});var s=i(127),n=i(3486),r=i(5901);const o=i.p+"e6ca7ebcac9136ce5511288e898c8371.png",h=i.p+"f1cd5c392c5447559f3a20ac58e20646.png";var l,a=i(615);!function(t){t[t.Rock=0]="Rock",t[t.Lava=1]="Lava"}(l||(l={}));class u{constructor(t,e){this.tilesWide=t,this.tilesHigh=e,this.tiles=new Array(e*t);for(let i=0;i<t*e;i++)this.tiles[i]=l.Rock;this.subTileIds=new Array(e*t*4);for(let i=0;i<t*e*4;i++)this.subTileIds[i]=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++)this.updateTile(i,t)}fixCoords(t,e){return t+e*this.tilesWide}fixSubCoords(t,e,i){return 4*t+e*this.tilesWide*4+(i-a.Nm.UpRight)/2}getTile(t,e){return t<0||e<0||t>=this.tilesWide||e>=this.tilesWide?l.Lava:(this.fixCoords(t,e),this.tiles[this.fixCoords(t,e)])}getSubTileId(t,e,i){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return 0;const s=this.fixSubCoords(t,e,i);return this.subTileIds[s]}setTile(t,e,i){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return;const s=this.fixCoords(t,e);this.tiles[s]!==i&&(this.tiles[s]=i,this.updateSelfAndAdjacent(t,e))}updateSelfAndAdjacent(t,e){for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)this.updateTile(t+i,e+s)}updateTile(t,e){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return;const i=this.fixCoords(t,e),s=this.tiles[i];let n=0;a.Dz.forEach(((i,r)=>{const o=1<<r,h=(0,a.jR)(i);this.getTile(h.x+t,h.y+e)!==s&&(n|=o)})),this.subTileIds[this.fixSubCoords(t,e,a.Nm.UpRight)]=7&n,this.subTileIds[this.fixSubCoords(t,e,a.Nm.DownRight)]=n>>2&7,this.subTileIds[this.fixSubCoords(t,e,a.Nm.DownLeft)]=n>>4&7,this.subTileIds[this.fixSubCoords(t,e,a.Nm.UpLeft)]=n>>6|(1&n)<<2&7}}var d=i(8785);let c,x,f,y,g;function w(){const t=document.getElementById("canvas");y=new u(20,20),(0,r.f5)(t,16*y.tilesWide*3,16*y.tilesHigh*3),g=t.getContext("2d"),(0,r.Ci)(g),function(t,e,i){for(let s=0;s<e.tilesWide;s++)for(let n=0;n<e.tilesHigh;n++)p(t,e,i,s,n)}(g,y,c),t.addEventListener("mousemove",L),t.addEventListener("mouseleave",v),t.addEventListener("mousedown",m)}function p(t,e,i,s,n){for(let r=0;r<4;r++){const o=a.Nm.UpRight+2*r,h=e.getSubTileId(s,n,o);let u=r;e.getTile(s,n)===l.Lava&&(u+=4);const d=16*s+(1===(0,a.jR)(o).x?8:0),c=16*n+(1===(0,a.jR)(o).y?8:0);i.render(t,3*d,3*c,24,24,h,u)}}function L(t){const e=new d.Z(Math.floor(t.offsetX/48),Math.floor(t.offsetY/48));void 0!==f?e.Equals(f)||(p(g,y,c,f.x,f.y),x.render(g,16*e.x*3,16*e.y*3,48,48,1,0),f=e):(x.render(g,16*e.x*3,16*e.y*3,48,48,1,0),f=e)}function v(t){void 0!==f&&(f=void 0)}function m(t){const e=new d.Z(Math.floor(t.offsetX/48),Math.floor(t.offsetY/48)),i=y.getTile(e.x,e.y);y.setTile(e.x,e.y,i===l.Lava?l.Rock:l.Lava);for(let t=-1;t<=1;t++)for(let e=-1;e<=1;e++)p(g,y,c,f.x+t,f.y+e);x.render(g,16*e.x*3,16*e.y*3,48,48,1,0)}const R=function(){const t=new s.Z;c=new n.V(8,8,o,t.registerAssetLoadCallback()),x=new n.V(16,16,h,t.registerAssetLoadCallback()),f=void 0,t.onAllFinished(w)}}}]);
//# sourceMappingURL=blendTest.bundle.js.map