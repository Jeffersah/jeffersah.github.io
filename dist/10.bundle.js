(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{73:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));class n{constructor(t,e){this.x=t,this.y=e}static zero(){return new n(0,0)}static fromAngle(t,e){return new n(Math.cos(t)*(null!=e?e:1),Math.sin(t)*(null!=e?e:1))}LengthSq(){return n.Dot(this,this)}Length(){return Math.sqrt(this.LengthSq())}Clone(){return new n(this.x,this.y)}Negate(){return new n(-this.x,-this.y)}NegateInPlace(){return this.x=-this.x,this.y=-this.y,this}static Dot(t,e){return t.x*e.x+t.y*e.y}DotWith(t){return n.Dot(this,t)}normalize(){let t=this.Length();return n.Multiply(this,1/t)}Direction(){return Math.atan2(this.y,this.x)}AddWith(t,e){const{x:i,y:n}=s(t,e);return this.x+=i,this.y+=n,this}MultWith(t,e){const{x:i,y:n}=s(t,e);return this.x*=i,this.y*=n,this}SubtractWith(t,e){const{x:i,y:n}=s(t,e);return this.x-=i,this.y-=n,this}DivideWith(t,e){const{x:i,y:n}=s(t,e);return this.x/=i,this.y/=n,this}Equals(t){return this.x===t.x&&this.y===t.y}static add(t,e,i){const{x:r,y:o}=s(e,i);return new n(t.x+r,t.y+o)}static subtract(t,e,i){const{x:r,y:o}=s(e,i);return new n(t.x-r,t.y-o)}static Multiply(t,e,i){return void 0!==i?new n(t.x*e,t.y*i):void 0!==e.x?new n(t.x*e.x,t.y*e.y):new n(t.x*e,t.y*e)}static interpolate(t,e,i){return new n(t.x+(e.x-t.x)*i,t.y+(e.y-t.y)*i)}static componentMin(t,e){return t.x<=e.x&&t.y<=e.y?t:e.x<=t.x&&e.y<=t.y?e:new n(Math.min(t.x,e.x),Math.min(t.y,e.y))}static componentMax(t,e){return t.x>=e.x&&t.y>=e.y?t:e.x>=t.x&&e.y>=t.y?e:new n(Math.max(t.x,e.x),Math.max(t.y,e.y))}static Bezier(t,e){return 1===t.length?t[0]:2===t.length?n.add(n.Multiply(t[1],e),n.Multiply(t[0],1-e)):n.add(n.Multiply(n.Bezier(t.slice(1),e),e),n.Multiply(n.Bezier(t.slice(0,t.length-1),e),1-e))}rotate(t){const e=Math.atan2(this.y,this.x),i=this.Length();return n.fromAngle(e+t,i)}}function s(t,e){return void 0===e?{x:t.x,y:t.y}:{x:t,y:e}}},81:function(t,e,i){"use strict";i.d(e,"b",(function(){return o})),i.d(e,"a",(function(){return a}));var n=i(73);class s{constructor(t,e,i,s,r){this.atlas=t,this.sourceOffset=e,this.sourceSize=i,this.numFrames=s,this.origin=null!=r?r:new n.a(0,0)}draw(t,e,i,n,s){t.save(),t.translate(e.x,e.y),void 0!==s&&t.rotate(s),t.scale(i.x,i.y),t.translate(-this.origin.x,-this.origin.y),t.drawImage(this.atlas.image,this.sourceOffset.x+n*this.sourceSize.x,this.sourceOffset.y,this.sourceSize.x,this.sourceSize.y,0,0,1,1),t.restore()}play(t,e){var i;return void 0!==t.animation?new r(this,t.maxTime,null!==(i=t.loop)&&void 0!==i&&i):new r(this,t,null!=e&&e)}}class r{constructor(t,e,i){this.source=t,this.maxTime=e,this.loop=i,this.currentTime=0}tick(){return this.currentTime++,!(this.currentTime<this.maxTime)&&(this.loop&&(this.currentTime=0),!0)}draw(t,e,i,n){const s=Math.floor(this.currentTime*this.source.numFrames/this.maxTime);this.source.draw(t,e,i,s,n)}}class o{constructor(t,e){this.onload=e,this.image=document.createElement("img"),this.image.src=t,this.image.addEventListener("load",()=>this.loadFinished())}loadFinished(){this.onload()}getSprite(t,e,i,n){return new a(this,t,e,i,n)}getAnimation(t,e,i,n){return new s(this,t,e,n,i)}}class a{constructor(t,e,i,s,r){this.atlas=t,this.sourceOffset=e,this.sourceSize=i,this.origin=null!=s?s:new n.a(0,0),this.sourceRotation=null!=r?r:0}draw(t,e,i,n){t.save(),t.translate(e.x,e.y),t.rotate((null!=n?n:0)+this.sourceRotation),t.scale(i.x,i.y),t.translate(-this.origin.x,-this.origin.y),t.drawImage(this.atlas.image,this.sourceOffset.x,this.sourceOffset.y,this.sourceSize.x,this.sourceSize.y,0,0,1,1),t.restore()}}},84:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));const n=2*Math.PI;class s{static normalize(t){return(t%=n)<0&&(t+=n),t}static relativeNormalize(t){return(t%=n)>Math.PI?t-=n:t<-Math.PI&&(t+=n),t}static relativeAngle(t,e){return s.relativeNormalize(t-e)}}},86:function(t){t.exports=JSON.parse('[{"id":0,"name":"testTrack","width":5,"height":8,"mapdata":[25,0,25,0,25,6,13,15,13,9,0,18,2,14,0,0,6,19,9,0,0,7,21,8,0,0,12,2,20,0,7,15,13,15,8,27,0,27,0,27],"spawns":[{"position":{"x":0,"y":0},"color":0},{"position":{"x":2,"y":0},"color":1},{"position":{"x":4,"y":0},"color":2}],"endpoints":[]}]')},94:function(t,e,i){"use strict";i.r(e),i.d(e,"default",(function(){return I}));var n,s=i(0),r=i(24),o=i(81),a=i(13),c=i.p+"f886a0e18541ccfc865ada90e3e6b20c.png",h=i.p+"fa1c16aa643eefa6e885676d2ab141fa.png",l=i(84),u=i(73);class w{constructor(t,e,i,n){this.color=t,this.sprite=e,this.position=i,this.isCrashed=n,this.nextPosition=void 0}}!function(t){t[t.Red=0]="Red",t[t.Green=1]="Green",t[t.Yellow=2]="Yellow",t[t.Blue=3]="Blue",t[t.Gray=-1]="Gray"}(n||(n={}));var d,p=n;!function(t){t[t.Right=0]="Right",t[t.Top=1]="Top",t[t.Left=2]="Left",t[t.Bottom=3]="Bottom",t[t.Center=4]="Center"}(d||(d={}));var x=d;const m=Math.PI/2;class f{static AnchorToIndex(t){switch(t){case d.Right:return 0;case d.Bottom:return 1;case d.Left:return 2;case d.Top:return 3;case d.Center:return 4;default:throw"Bad Anchor"}}static AnchorToTileMove(t){switch(t){case d.Right:return new u.a(1,0);case d.Bottom:return new u.a(0,1);case d.Left:return new u.a(-1,0);case d.Top:return new u.a(0,-1);case d.Center:return new u.a(0,0);default:throw"Bad Anchor"}}static ReverseDirection(t){return t===d.Center?d.Center:(t+2)%4}static IndexToAnchor(t){switch(t){case 0:return d.Right;case 1:return d.Bottom;case 2:return d.Left;case 3:return d.Top;case 4:return d.Center;default:throw"Bad Index"}}static GetAnchorOffset(t){switch(t){case d.Top:return new u.a(.5,0);case d.Bottom:return new u.a(.5,1);case d.Left:return new u.a(0,.5);case d.Right:return new u.a(1,.5);case d.Center:return new u.a(.5,.5);default:throw"Bad Anchor"}}static GetExitRotation(t){switch(t){case d.Top:return 3*m;case d.Bottom:return m;case d.Left:return 2*m;case d.Right:case d.Center:return 0;default:throw"Bad Anchor"}}static GetEntryRotation(t){return(f.GetExitRotation(t)+Math.PI)%(2*Math.PI)}static GetRealPosition(t,e){var i=u.a.Multiply(t.position,e),n=u.a.Multiply(f.GetAnchorOffset(t.anchor),e);return i.AddWith(n)}}f.AllAnchors=[d.Right,d.Bottom,d.Left,d.Top,d.Center];class y{constructor(t){this.connections=[];for(let e=0;e<4;e++){const i=[];for(let n=e+1;n<5;n++)i.push((1&t)>0),t>>=1;this.connections.push(i)}}connection(t,e,i){const n=f.AnchorToIndex(t),s=f.AnchorToIndex(e);if(n===s)throw"From and To must be different values";const r=Math.min(n,s),o=Math.max(n,s);if(void 0===i)return this.connections[r][o-r-1];this.connections[r][o-r-1]=i}allConnections(t){let e=[];for(const i of f.AllAnchors)t!==i&&this.connection(t,i)&&e.push(i);return e}}class g{constructor(t,e){this.tileId=t,this.connections=new y(e)}}const v=128;var C=[null,new g(1,32),new g(2,2),new g(3,34),new g(4,129),new g(5,20),new g(6,4),new g(7,1),new g(8,16),new g(9,v),new g(10,183),new g(11,149),new g(12,5),new g(13,17),new g(14,144),new g(15,132),null,null,new g(18,37),new g(19,19),new g(20,176),new g(21,134),null,null,new g(24,8),new g(25,64),new g(26,256),new g(27,512),null,null];const A=new u.a(48,48),M=new u.a(18,18);class T{constructor(t,e,i){this.level=t,this.tileAtlas=e,this.carAtlas=i,this.map=[];for(let e=0;e<t.width;e++){let e=[];for(let i=0;i<t.height;i++)e.push(null);this.map.push(e)}for(let e=0;e<t.mapdata.length;e++){let i=e%t.width,n=Math.floor(e/t.width);this.map[i][n]=C[t.mapdata[e]]}this.tileSprites=[];for(let t=0;t<C.length;t++){const i=t%6,n=Math.floor(t/6);this.tileSprites.push(null===C[t]?null:e.getSprite(new u.a(48*i,48*n),new u.a(48,48)))}this.ResetLevel()}ResetLevel(){this.cars=[];for(const t of this.level.spawns)t.color!==p.Gray&&this.cars.push(new w(t.color,this.carAtlas.getSprite(new u.a(18*t.color,0),M,new u.a(.5,.5)),{position:new u.a(t.position.x,t.position.y),anchor:x.Center},!1));this.updateCars()}updateCars(){for(const t of this.cars)t.isCrashed||(void 0!==t.nextPosition&&(t.position=t.nextPosition),t.nextPosition=this.CalculateCarNextPosition(t))}CalculateCarNextPosition(t){const e=this.map[t.position.position.x][t.position.position.y].connections.allConnections(t.position.anchor);if(0!==e.length){const i=e[Math.floor(Math.random()*e.length)];return{position:u.a.add(t.position.position,f.AnchorToTileMove(i)),anchor:f.ReverseDirection(i)}}t.isCrashed=!0}draw(t,e,i){for(let t=0;t<this.map.length;t++)for(let i=0;i<this.map[t].length;i++)null!==this.map[t][i]&&this.tileSprites[this.map[t][i].tileId].draw(e,new u.a(48*t,48*i),A);for(const t of this.cars){const n=f.GetRealPosition(t.position,A);if(void 0!==t.nextPosition){const s=f.GetRealPosition(t.nextPosition,A),r=f.GetRealPosition(Object.assign(Object.assign({},t.position),{anchor:x.Center}),A),o=u.a.Bezier([n,r,s],i),a=f.GetEntryRotation(t.position.anchor),c=f.GetExitRotation(t.nextPosition.anchor),h=l.a.relativeAngle(a,c);t.sprite.draw(e,o,t.sprite.sourceSize,a+h*i)}}}}var R=i(86);class S{constructor(t){this.canvas=t,Object(a.b)(t,800,600),this.ctx=t.getContext("2d"),this.repaintTimer=-1,this.interpFrameCount=0}start(){const t=new r.a;this.trackImageAtlas=new o.b(c,t.registerAssetLoadCallback()),this.carImageAtlas=new o.b(h,t.registerAssetLoadCallback()),t.onAllFinished(this.loadComplete.bind(this))}loadComplete(){this.gameState=new T(R[0],this.trackImageAtlas,this.carImageAtlas),this.gameState.updateCars(),this.runTick()}runTick(){this.tick(),this.draw(),this.repaintTimer=requestAnimationFrame(this.runTick.bind(this))}tick(){this.interpFrameCount++,this.interpFrameCount>=20&&(this.interpFrameCount=0,this.gameState.updateCars())}draw(){this.ctx.fillStyle="black",this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height),this.ctx.save(),this.gameState.draw(this.canvas,this.ctx,this.interpFrameCount/20),this.ctx.restore()}stop(){-1!==this.repaintTimer&&cancelAnimationFrame(this.repaintTimer)}}function I(){const t=s.useRef();return s.useEffect(()=>{const e=new S(t.current);return e.start(),()=>e.stop()},[t.current]),s.createElement("canvas",{ref:t})}}}]);
//# sourceMappingURL=10.bundle.js.map