(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{73:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));class s{constructor(t,e){this.x=t,this.y=e}static fromAngle(t,e){return new s(Math.cos(t)*(null!=e?e:1),Math.sin(t)*(null!=e?e:1))}LengthSq(){return s.Dot(this,this)}Length(){return Math.sqrt(this.LengthSq())}Clone(){return new s(this.x,this.y)}Negate(){return new s(-this.x,-this.y)}NegateInPlace(){return this.x=-this.x,this.y=-this.y,this}static Dot(t,e){return t.x*e.x+t.y*e.y}DotWith(t){return s.Dot(this,t)}Direction(){return Math.atan2(this.y,this.x)}AddWith(t,e){const{x:i,y:s}=n(t,e);return this.x+=i,this.y+=s,this}MultWith(t,e){const{x:i,y:s}=n(t,e);return this.x*=i,this.y*=s,this}SubtractWith(t,e){const{x:i,y:s}=n(t,e);return this.x-=i,this.y-=s,this}DivideWith(t,e){const{x:i,y:s}=n(t,e);return this.x/=i,this.y/=s,this}Equals(t){return this.x===t.x&&this.y===t.y}static add(t,e,i){const{x:o,y:r}=n(e,i);return new s(t.x+o,t.y+r)}static subtract(t,e,i){const{x:o,y:r}=n(e,i);return new s(t.x-o,t.y-r)}static Multiply(t,e,i){return void 0!==i?new s(t.x*e,t.y*i):void 0!==e.x?new s(t.x*e.x,t.y*e.y):new s(t.x*e,t.y*e)}static interpolate(t,e,i){return new s(t.x+(e.x-t.x)*i,t.y+(e.y-t.y)*i)}static componentMin(t,e){return t.x<=e.x&&t.y<=e.y?t:e.x<=t.x&&e.y<=t.y?e:new s(Math.min(t.x,e.x),Math.min(t.y,e.y))}static componentMax(t,e){return t.x>=e.x&&t.y>=e.y?t:e.x>=t.x&&e.y>=t.y?e:new s(Math.max(t.x,e.x),Math.max(t.y,e.y))}}function n(t,e){return void 0===e?{x:t.x,y:t.y}:{x:t,y:e}}},76:function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"c",(function(){return r})),i.d(e,"b",(function(){return h}));var s,n=i(73);!function(t){t[t.Up=0]="Up",t[t.UpRight=1]="UpRight",t[t.Right=2]="Right",t[t.DownRight=3]="DownRight",t[t.Down=4]="Down",t[t.DownLeft=5]="DownLeft",t[t.Left=6]="Left",t[t.UpLeft=7]="UpLeft"}(s||(s={}));const o=[new n.a(0,-1),new n.a(1,-1),new n.a(1,0),new n.a(1,1),new n.a(0,1),new n.a(-1,1),new n.a(-1,0),new n.a(-1,-1)],r=[s.Up,s.UpRight,s.Right,s.DownRight,s.Down,s.DownLeft,s.Left,s.UpLeft];s.Up,s.Right,s.Down,s.Left,s.UpRight,s.DownRight,s.DownLeft,s.UpLeft;function h(t){return o[t]}},92:function(t,e,i){"use strict";i.r(e);var s,n=i(24),o=i(25),r=i(13),h=i.p+"e6ca7ebcac9136ce5511288e898c8371.png",a=i.p+"f1cd5c392c5447559f3a20ac58e20646.png",u=i(76);!function(t){t[t.Rock=0]="Rock",t[t.Lava=1]="Lava"}(s||(s={}));class c{constructor(t,e){this.tilesWide=t,this.tilesHigh=e,this.tiles=new Array(e*t);for(let i=0;i<t*e;i++)this.tiles[i]=s.Rock;this.subTileIds=new Array(e*t*4);for(let i=0;i<t*e*4;i++)this.subTileIds[i]=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++)this.updateTile(i,t)}fixCoords(t,e){return t+e*this.tilesWide}fixSubCoords(t,e,i){return 4*t+e*this.tilesWide*4+(i-u.a.UpRight)/2}getTile(t,e){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return s.Lava;this.fixCoords(t,e);return this.tiles[this.fixCoords(t,e)]}getSubTileId(t,e,i){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return 0;const s=this.fixSubCoords(t,e,i);return this.subTileIds[s]}setTile(t,e,i){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return;const s=this.fixCoords(t,e);this.tiles[s]!==i&&(this.tiles[s]=i,this.updateSelfAndAdjacent(t,e))}updateSelfAndAdjacent(t,e){for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)this.updateTile(t+i,e+s)}updateTile(t,e){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return;const i=this.fixCoords(t,e),s=this.tiles[i];let n=0;u.c.forEach((i,o)=>{const r=1<<o,h=Object(u.b)(i);this.getTile(h.x+t,h.y+e)!==s&&(n|=r)}),this.subTileIds[this.fixSubCoords(t,e,u.a.UpRight)]=7&n,this.subTileIds[this.fixSubCoords(t,e,u.a.DownRight)]=n>>2&7,this.subTileIds[this.fixSubCoords(t,e,u.a.DownLeft)]=n>>4&7,this.subTileIds[this.fixSubCoords(t,e,u.a.UpLeft)]=n>>6|(1&n)<<2&7}}var l=i(73);let d,f,x,y,w;function g(){const t=document.getElementById("canvas");y=new c(20,20),Object(r.b)(t,16*y.tilesWide*3,16*y.tilesHigh*3),w=t.getContext("2d"),Object(r.a)(w),function(t,e,i){for(let s=0;s<e.tilesWide;s++)for(let n=0;n<e.tilesHigh;n++)p(t,e,i,s,n)}(w,y,d),t.addEventListener("mousemove",b),t.addEventListener("mouseleave",L),t.addEventListener("mousedown",v)}function p(t,e,i,n,o){for(let r=0;r<4;r++){const h=u.a.UpRight+2*r,a=e.getSubTileId(n,o,h);let c=r;e.getTile(n,o)===s.Lava&&(c+=4);const l=16*n+(1===Object(u.b)(h).x?8:0),d=16*o+(1===Object(u.b)(h).y?8:0);i.render(t,3*l,3*d,24,24,a,c)}}function b(t){const e=new l.a(Math.floor(t.offsetX/48),Math.floor(t.offsetY/48));void 0!==x?e.Equals(x)||(p(w,y,d,x.x,x.y),f.render(w,16*e.x*3,16*e.y*3,48,48,1,0),x=e):(f.render(w,16*e.x*3,16*e.y*3,48,48,1,0),x=e)}function L(t){void 0!==x&&(x=void 0)}function v(t){const e=new l.a(Math.floor(t.offsetX/48),Math.floor(t.offsetY/48)),i=y.getTile(e.x,e.y);y.setTile(e.x,e.y,i===s.Lava?s.Rock:s.Lava);for(let t=-1;t<=1;t++)for(let e=-1;e<=1;e++)p(w,y,d,x.x+t,x.y+e);f.render(w,16*e.x*3,16*e.y*3,48,48,1,0)}e.default=function(){const t=new n.a;d=new o.a(8,8,h,t.registerAssetLoadCallback()),f=new o.a(16,16,a,t.registerAssetLoadCallback()),x=void 0,t.onAllFinished(g)}}}]);
//# sourceMappingURL=blendTest.bundle.js.map