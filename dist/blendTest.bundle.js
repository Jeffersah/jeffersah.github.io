(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{63:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));class s{constructor(t,e){this.x=t,this.y=e}LengthSq(){return s.Dot(this,this)}Length(){return Math.sqrt(this.LengthSq())}Clone(){return new s(this.x,this.y)}Negate(){return new s(-this.x,-this.y)}NegateInPlace(){return this.x=-this.x,this.y=-this.y,this}static Dot(t,e){return t.x*e.x+t.y*e.y}DotWith(t){return s.Dot(this,t)}AddWith(t,e){const i=void 0===e?t.x:t,s=void 0===e?t.y:e;return this.x+=i,this.y+=s,this}MultWith(t,e){const i=void 0===e?t.x:t,s=void 0===e?t.y:e;return this.x*=i,this.y*=s,this}SubtractWith(t,e){const i=void 0===e?t.x:t,s=void 0===e?t.y:e;return this.x-=i,this.y-=s,this}DivideWith(t,e){const i=void 0===e?t.x:t,s=void 0===e?t.y:e;return this.x/=i,this.y/=s,this}Equals(t){return this.x===t.x&&this.y===t.y}}},64:function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"c",(function(){return r})),i.d(e,"b",(function(){return h}));var s,n=i(63);!function(t){t[t.Up=0]="Up",t[t.UpRight=1]="UpRight",t[t.Right=2]="Right",t[t.DownRight=3]="DownRight",t[t.Down=4]="Down",t[t.DownLeft=5]="DownLeft",t[t.Left=6]="Left",t[t.UpLeft=7]="UpLeft"}(s||(s={}));const o=[new n.a(0,-1),new n.a(1,-1),new n.a(1,0),new n.a(1,1),new n.a(0,1),new n.a(-1,1),new n.a(-1,0),new n.a(-1,-1)],r=[s.Up,s.UpRight,s.Right,s.DownRight,s.Down,s.DownLeft,s.Left,s.UpLeft];s.Up,s.Right,s.Down,s.Left,s.UpRight,s.DownRight,s.DownLeft,s.UpLeft;function h(t){return o[t]}},75:function(t,e,i){"use strict";i.r(e);var s,n=i(15),o=i(16),r=i(10),h=i.p+"e6ca7ebcac9136ce5511288e898c8371.png",d=i.p+"f1cd5c392c5447559f3a20ac58e20646.png",a=i(64);!function(t){t[t.Rock=0]="Rock",t[t.Lava=1]="Lava"}(s||(s={}));class u{constructor(t,e){this.tilesWide=t,this.tilesHigh=e,this.tiles=new Array(e*t);for(let i=0;i<t*e;i++)this.tiles[i]=s.Rock;this.subTileIds=new Array(e*t*4);for(let i=0;i<t*e*4;i++)this.subTileIds[i]=0;for(let i=0;i<t;i++)for(let t=0;t<e;t++)this.updateTile(i,t)}fixCoords(t,e){return t+e*this.tilesWide}fixSubCoords(t,e,i){return 4*t+e*this.tilesWide*4+(i-a.a.UpRight)/2}getTile(t,e){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return s.Lava;this.fixCoords(t,e);return this.tiles[this.fixCoords(t,e)]}getSubTileId(t,e,i){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return 0;const s=this.fixSubCoords(t,e,i);return this.subTileIds[s]}setTile(t,e,i){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return;const s=this.fixCoords(t,e);this.tiles[s]!==i&&(this.tiles[s]=i,this.updateSelfAndAdjacent(t,e))}updateSelfAndAdjacent(t,e){for(let i=-1;i<=1;i++)for(let s=-1;s<=1;s++)this.updateTile(t+i,e+s)}updateTile(t,e){if(t<0||e<0||t>=this.tilesWide||e>=this.tilesWide)return;const i=this.fixCoords(t,e),s=this.tiles[i];let n=0;a.c.forEach((i,o)=>{const r=1<<o,h=Object(a.b)(i);this.getTile(h.x+t,h.y+e)!==s&&(n|=r)}),this.subTileIds[this.fixSubCoords(t,e,a.a.UpRight)]=7&n,this.subTileIds[this.fixSubCoords(t,e,a.a.DownRight)]=n>>2&7,this.subTileIds[this.fixSubCoords(t,e,a.a.DownLeft)]=n>>4&7,this.subTileIds[this.fixSubCoords(t,e,a.a.UpLeft)]=n>>6|(1&n)<<2&7}}var l=i(63);let f,c,w,x,g;function b(){const t=document.getElementById("canvas");x=new u(20,20),Object(r.b)(t,16*x.tilesWide*3,16*x.tilesHigh*3),g=t.getContext("2d"),Object(r.a)(g),function(t,e,i){for(let s=0;s<e.tilesWide;s++)for(let n=0;n<e.tilesHigh;n++)p(t,e,i,s,n)}(g,x,f),t.addEventListener("mousemove",y),t.addEventListener("mouseleave",v),t.addEventListener("mousedown",L)}function p(t,e,i,n,o){for(let r=0;r<4;r++){const h=a.a.UpRight+2*r,d=e.getSubTileId(n,o,h);let u=r;e.getTile(n,o)===s.Lava&&(u+=4);const l=16*n+(1===Object(a.b)(h).x?8:0),f=16*o+(1===Object(a.b)(h).y?8:0);i.render(t,3*l,3*f,24,24,d,u)}}function y(t){const e=new l.a(Math.floor(t.offsetX/48),Math.floor(t.offsetY/48));void 0!==w?e.Equals(w)||(p(g,x,f,w.x,w.y),c.render(g,16*e.x*3,16*e.y*3,48,48,1,0),w=e):(c.render(g,16*e.x*3,16*e.y*3,48,48,1,0),w=e)}function v(t){void 0!==w&&(w=void 0)}function L(t){const e=new l.a(Math.floor(t.offsetX/48),Math.floor(t.offsetY/48)),i=x.getTile(e.x,e.y);x.setTile(e.x,e.y,i===s.Lava?s.Rock:s.Lava);for(let t=-1;t<=1;t++)for(let e=-1;e<=1;e++)p(g,x,f,w.x+t,w.y+e);c.render(g,16*e.x*3,16*e.y*3,48,48,1,0)}e.default=function(){const t=new n.a;f=new o.a(8,8,h,t.registerAssetLoadCallback()),c=new o.a(16,16,d,t.registerAssetLoadCallback()),w=void 0,t.onAllFinished(b)}}}]);
//# sourceMappingURL=blendTest.bundle.js.map