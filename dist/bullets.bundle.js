(window.webpackJsonp=window.webpackJsonp||[]).push([[1],{73:function(t,i,e){"use strict";e.d(i,"a",(function(){return s}));class s{constructor(t,i){this.x=t,this.y=i}static fromAngle(t,i){return new s(Math.cos(t)*(null!=i?i:1),Math.sin(t)*(null!=i?i:1))}LengthSq(){return s.Dot(this,this)}Length(){return Math.sqrt(this.LengthSq())}Clone(){return new s(this.x,this.y)}Negate(){return new s(-this.x,-this.y)}NegateInPlace(){return this.x=-this.x,this.y=-this.y,this}static Dot(t,i){return t.x*i.x+t.y*i.y}DotWith(t){return s.Dot(this,t)}Direction(){return Math.atan2(this.y,this.x)}AddWith(t,i){const{x:e,y:s}=n(t,i);return this.x+=e,this.y+=s,this}MultWith(t,i){const{x:e,y:s}=n(t,i);return this.x*=e,this.y*=s,this}SubtractWith(t,i){const{x:e,y:s}=n(t,i);return this.x-=e,this.y-=s,this}DivideWith(t,i){const{x:e,y:s}=n(t,i);return this.x/=e,this.y/=s,this}Equals(t){return this.x===t.x&&this.y===t.y}static add(t,i,e){const{x:h,y:r}=n(i,e);return new s(t.x+h,t.y+r)}static subtract(t,i,e){const{x:h,y:r}=n(i,e);return new s(t.x-h,t.y-r)}static Multiply(t,i,e){return void 0!==e?new s(t.x*i,t.y*e):void 0!==i.x?new s(t.x*i.x,t.y*i.y):new s(t.x*i,t.y*i)}}function n(t,i){return void 0===i?{x:t.x,y:t.y}:{x:t,y:i}}},75:function(t,i,e){"use strict";e.d(i,"a",(function(){return s}));class s{constructor(t){t.h||t.s||t.v?(this.hsv=t,this.rgb=void 0):(this.rgb=t,this.hsv=void 0)}static rgb(t,i,e){return new s({r:t,g:i,b:e})}static hsv(t,i,e){return new s({h:t,s:i,v:e})}r(t){if(this.reqRgb(),void 0===t)return this.rgb.r;this.rgb.r=t,this.hsv=void 0}g(t){if(this.reqRgb(),void 0===t)return this.rgb.g;this.rgb.g=t,this.hsv=void 0}b(t){if(this.reqRgb(),void 0===t)return this.rgb.b;this.rgb.b=t,this.hsv=void 0}h(t){if(this.reqHsv(),void 0===t)return this.hsv.h;this.hsv.h=t,this.hsv=void 0}s(t){if(this.reqHsv(),void 0===t)return this.hsv.s;this.hsv.s=t,this.hsv=void 0}v(t){if(this.reqHsv(),void 0===t)return this.hsv.v;this.hsv.v=t,this.hsv=void 0}componentToRgb(t){const i=(t+6*this.hsv.h)%6;return this.hsv.v-this.hsv.v*this.hsv.s*Math.max(Math.min(i,4-i,1),0)}reqRgb(){void 0===this.rgb&&this.calcRgb()}calcRgb(){this.rgb={r:this.componentToRgb(5),g:this.componentToRgb(3),b:this.componentToRgb(1)}}reqHsv(){void 0===this.hsv&&this.calcHsv()}calcHsv(){const{r:t,g:i,b:e}=this.rgb,s=Math.max(t,i,e),n=Math.min(t,i,e);let h=s===n?0:s===t?(i-e)/(s-n):s===i?2+(e-t)/(s-n):4+(t-i)/(s-n);for(h/=6;h<0;)h++;this.hsv={h:h,s:s===n?0:(s-n)/s,v:s}}toString(){return this.reqRgb(),"rgb("+this.toByte(this.rgb.r)+", "+this.toByte(this.rgb.g)+", "+this.toByte(this.rgb.b)+")"}toByte(t){return Math.floor(255*t)}}},77:function(t,i,e){"use strict";e.d(i,"a",(function(){return h}));class s{constructor(t,i){this.keys=t,this.changes=i}isKeyDown(t){return-1!==this.keys.indexOf(t)}isKeyUp(t){return-1===this.keys.indexOf(t)}}class n{constructor(t,i){this.attachedElement=t,this.logKeyNames=i,void 0===this.logKeyNames&&(this.logKeyNames=!1),t.addEventListener("keydown",t=>this.onKeyDown(t)),t.addEventListener("keyup",t=>this.onKeyUp(t)),this.downKeys=[],this.changes=[]}onKeyDown(t){this.logKeyNames&&console.log(t.key);-1===this.downKeys.indexOf(t.key)&&(this.changes.push({key:t.key,change:"press"}),this.downKeys.push(t.key))}onKeyUp(t){this.changes.push({key:t.key,change:"release"});const i=this.downKeys.indexOf(t.key);this.downKeys.splice(i,1)}Update(){const t=this.downKeys,i=this.changes;return this.downKeys=t.slice(),this.changes=[],new s(t,i)}}class h{constructor(t,i){this.watcher=new n(t,i),this.prvState=this.currentState=this.watcher.Update()}update(){this.prvState=this.currentState,this.currentState=this.watcher.Update()}isKeyDown(t){return this.currentState.isKeyDown(t)}isKeyUp(t){return this.currentState.isKeyUp(t)}isKeyPressed(t){return this.currentState.isKeyDown(t)&&this.prvState.isKeyUp(t)}isKeyReleased(t){return this.currentState.isKeyUp(t)&&this.prvState.isKeyDown(t)}changes(){return this.currentState.changes}}},86:function(t,i,e){"use strict";e.r(i),e.d(i,"default",(function(){return Y}));var s=e(24),n=1e3,h=800,r=e(26),a=e(13),o=e(25),l=e.p+"12a4e8650485f6c9e051cf30dfcfc746.png",c=e.p+"025640544516cf152164dd0622114d6c.png",u=e(73);const d=2*Math.PI;class y{static normalize(t){return(t%=d)<0&&(t+=d),t}static relativeNormalize(t){return(t%=d)>Math.PI?t-=d:t<-Math.PI&&(t+=d),t}static relativeAngle(t,i){return y.relativeNormalize(t-i)}}const g=.2,f=20,p=.998,m=.99,w=.06,v=.002,x=.004,M=.98,b=.003,k=120;class D{constructor(t){this.sprites=t,this.position=new u.a(0,0),this.velocity=new u.a(0,0),this.angularVelocity=0,this.rotation=0,this.engineDeflect=0,this.tgtDeflect=0}tick(t){t.isKeyDown("w")?this.isEngineOn=!0:this.isEngineOn=!1,t.isKeyDown("a")?this.tgtDeflect=1:t.isKeyDown("d")?this.tgtDeflect=-1:this.tgtDeflect=0,this.tgtDeflect>=this.engineDeflect?this.engineDeflect=Math.min(this.engineDeflect+w,this.tgtDeflect):this.engineDeflect=Math.max(this.engineDeflect-w,this.tgtDeflect);const i=Math.atan2(this.velocity.y,this.velocity.x),e=y.relativeAngle(this.rotation,i),s=e/Math.PI;this.angularVelocity*=M,this.angularVelocity-=this.tgtDeflect*v+this.engineDeflect*x*(this.isEngineOn?1:0),this.rotation+=this.angularVelocity;const n=(1-Math.abs(s))*p+Math.abs(s)*m;this.velocity.MultWith(n,n),this.isEngineOn&&(this.velocity.x+=g*Math.cos(this.rotation),this.velocity.y+=g*Math.sin(this.rotation));let h=this.velocity.Length(),r=this.velocity.Direction();h>=f&&(h=f);let a=Math.sin(e);a*=Math.min(h/k,1),a*=b,r+=a,this.velocity.x=Math.cos(r)*h,this.velocity.y=Math.sin(r)*h,this.position.AddWith(this.velocity)}render(t){t.save(),Object(a.c)(t,this.position.x,this.position.y,4,8,this.rotation+Math.PI/2),this.isEngineOn&&this.sprites.rotrender(t,4,11,8,16,Math.floor(4*Math.random()),1,this.engineDeflect*Math.PI/4,4,2),this.tgtDeflect>0?this.sprites.rotrender(t,7,4,8,16,Math.floor(2*Math.random()),2,0,3,4):this.tgtDeflect<0&&this.sprites.rotrender(t,1,4,8,16,2+Math.floor(2*Math.random()),2,0,6,4),this.sprites.render(t,0,0,8,16,0,0),t.restore()}}var E,I=e(77);!function(t){t[t.ally=0]="ally",t[t.enemy=1]="enemy",t[t.neutral=2]="neutral"}(E||(E={}));class K{constructor(t,i){this.keys=i,this.Player=t,this.Entities={},this.Entities[E.neutral]=[],this.Entities[E.ally]=[],this.Entities[E.enemy]=[],this.Effects=[]}tick(){this.keys.update();for(let t=this.Effects.length-1;t>=0;t--)this.Effects[t].tick()&&this.Effects.splice(t,1);this.updateEntities(this.Entities[E.neutral]),this.updateEntities(this.Entities[E.ally]),this.updateEntities(this.Entities[E.enemy])}updateEntities(t){for(let i=t.length-1;i>=0;i--)t[i].tick(this.keys,this)||t.splice(i,1)}draw(t){this.drawEntities(t,this.Entities[E.neutral]),this.drawEntities(t,this.Entities[E.ally]),this.drawEntities(t,this.Entities[E.enemy]);for(let i=0;i<this.Effects.length;i++)this.Effects[i].draw(t)}drawEntities(t,i){for(let e=i.length-1;e>=0;e--)i[e].render(t)}}class S{constructor(t,i){this.range=t,this.timingFunction=i}}class P{constructor(t){this.totalTime=t,this.elapsedTime=0}tick(){return this.elapsedTime++,this.elapsedTime>=this.totalTime}sample(t){return t.range.sample(t.timingFunction(this.elapsedTime/this.totalTime))}}class V{constructor(t,i,e,s,n){this.position=t,this.outerRadius=i,this.innerRadius=e,this.fillColor=s,this.timing=new P(n)}tick(){return this.timing.tick()}draw(t){const i=this.timing.sample(this.outerRadius),e=this.timing.sample(this.innerRadius),s=this.timing.sample(this.fillColor);t.beginPath(),t.arc(this.position.x,this.position.y,i,0,2*Math.PI,!1),e>=0&&t.arc(this.position.x,this.position.y,e,0,2*Math.PI,!0),t.closePath(),t.fillStyle=s.toString(),t.fill()}}const A={linear:t=>t,clamp:t=>Math.max(Math.min(t,1),0),fastIn:R(0,.8,1),fastOut:R(0,.2,1)};function R(...t){return i=>function t(i,e,s,n){return 1===n?e[s]:t(i,e,s,n-1)*(1-i)+t(i,e,s+1,n-1)*i}(i,t,0,t.length)}var O=e(75);const T=(t,i,e)=>t+(i-t)*e,B=(t,i,e)=>O.a.rgb(T(t.r(),i.r(),e),T(t.g(),i.g(),e),T(t.b(),i.b(),e));function q(t,...i){void 0===t.arguments&&(i.splice(0,0,t),t=void 0);let e=1/(i.length-1),s=new z(i[0],t);for(let t=1;t<i.length;t++)s.addKeyFrame(e*t,i[t]);return s}class z{constructor(t,i){if(void 0===i)if("number"==typeof t)this.interpolator=T;else{if(void 0===t.r)throw"No default interpolator found";this.interpolator=B}else this.interpolator=i;this.keys=[{time:0,value:t}]}addKeyFrame(t,i){for(let e=0;e<this.keys.length;e++)if(t<this.keys[e].time)return void this.keys.splice(e,0,{time:t,value:i});this.keys.push({time:t,value:i})}sample(t){if(1===this.keys.length)return this.keys[0].value;for(var i=0;this.keys[i+1].time<t&&i+2<this.keys.length;)i++;let e=this.keys[i+1].time-this.keys[i].time,s=(t-this.keys[i].time)/e;return this.interpolator(this.keys[i].value,this.keys[i+1].value,s)}}class H{constructor(t,i,e,s,n,h,r){this.position=t,this.burstXVariance=i,this.burstYVariance=e,this.numBursts=s,this.burstDelay=n,this.burstLifetime=h,this.burstOuterRadius=r,this.currentBurstDelay=0,this.maxExplosionIndex=0;const a=Math.floor(s.GetValue(Math.random()));this.explosions=new Array(a),this.triggerExplosions()}triggerExplosions(){for(;0===this.currentBurstDelay&&this.maxExplosionIndex<this.explosions.length;)this.currentBurstDelay=this.burstDelay,this.spawnBurst()}spawnBurst(){const t=this.position.x+this.burstXVariance.GetValue(Math.random()),i=this.position.y+this.burstYVariance.GetValue(Math.random()),e=this.burstLifetime.GetValue(Math.random()),s=this.burstOuterRadius.GetValue(Math.random()),n=s/4;this.explosions[this.maxExplosionIndex++]=new V(new u.a(t,i),new S(q(n,s),A.linear),new S(q(-n,s),A.fastOut),new S(q(O.a.rgb(1,1,.5),O.a.rgb(1,0,0),O.a.rgb(.2,.2,0)),A.linear),e)}tick(){let t=!1;for(let i=0;i<this.maxExplosionIndex;i++)null!==this.explosions[i]&&void 0!==this.explosions[i]&&(this.explosions[i].tick()?this.explosions[i]=null:t=!0);return this.currentBurstDelay--,0===this.currentBurstDelay&&this.triggerExplosions(),!t&&this.maxExplosionIndex===this.explosions.length}draw(t){for(let i=0;i<this.maxExplosionIndex;i++)null!==this.explosions[i]&&void 0!==this.explosions[i]&&this.explosions[i].draw(t)}}var L=e(15);class N{constructor(t,i){this.onload=i,this.image=document.createElement("img"),this.image.src=t,this.image.addEventListener("load",()=>this.loadFinished())}loadFinished(){this.onload()}getSprite(t,i,e,s){return new U(this,t,i,e,s)}}class U{constructor(t,i,e,s,n){this.atlas=t,this.sourceOffset=i,this.sourceSize=e,this.origin=null!=s?s:new u.a(0,0),this.sourceRotation=null!=n?n:0}draw(t,i,e,s){t.save(),t.translate(i.x,i.y),t.rotate((null!=s?s:0)+this.sourceRotation),t.scale(e.x,e.y),t.translate(-this.origin.x,-this.origin.y),t.drawImage(this.atlas.image,this.sourceOffset.x,this.sourceOffset.y,this.sourceSize.x,this.sourceSize.y,0,0,1,1),t.restore()}}class F{static normalize(t){return(t%=2*Math.PI)<0&&(t+=2*Math.PI),t}static relativeNormalize(t){var i=F.normalize(t);return i>=Math.PI?i-2*Math.PI:i}static accuteAngle(t,i){return F.relativeNormalize(i-t)}static angleBetween(t,i){return Math.atan2(i.y-t.y,i.x-t.x)}}class W{TickAI(t,i){const e=t.Player,s=F.angleBetween(i.position,e.position),n=F.accuteAngle(i.rotation,s);return{tgtVel:(1-Math.max(0,Math.min(1,Math.abs(n)/Math.PI)))*i.definition.maxSpeed,tgtHeading:s}}}class C{constructor(t,i,e,s,n){this.definition=t,this.position=i,this.rotation=e,this.ai=s,this.team=n,this.Velocity=0,this.lastAccel=this.lastDeccel=this.lastTurn=0,this.currentHp=this.definition.maxHp}tick(t,i){const{tgtVel:e,tgtHeading:s}=this.ai.TickAI(i,this);if(e<this.Velocity&&this.definition.maxDeccel>0){var n=this.Velocity-e;this.lastDeccel=Math.min(1,n/this.definition.maxDeccel),this.Velocity-=this.lastDeccel*this.definition.maxDeccel}else if(e>this.Velocity){n=e-this.Velocity;this.lastAccel=Math.min(1,n/this.definition.maxAccel),this.Velocity+=this.lastAccel*this.definition.maxAccel}var h=F.accuteAngle(this.rotation,s),r=Math.sign(h);return h=Math.abs(h),this.lastTurn=Math.min(h/this.definition.maxTurnRate,1)*r,this.rotation+=this.lastTurn*this.definition.maxTurnRate,this.Velocity>=0?this.Velocity=Math.min(this.Velocity,this.definition.maxSpeed):this.Velocity=Math.max(this.Velocity,-this.definition.maxSpeed),this.position.AddWith(u.a.fromAngle(this.rotation,this.Velocity)),this.currentHp>0}render(t){this.definition.sprite.draw(t,this.position,this.definition.size,this.rotation)}getTeam(){return this.team}}class G{constructor(t,i,e,s,n,h,r,a,o,l,c,u,d){this.size=i,this.maxHp=r,this.maxAccel=a,this.maxDeccel=o,this.maxSpeed=l,this.turnAccel=c,this.maxTurnRate=u,this.buildAi=d,this.sprite=t.getSprite(e,s,h,n)}buildShip(t,i,e){return new C(this,i,null!=e?e:0,this.buildAi(),t)}}let j,J,X;function Y(){const t=new s.a,i=new o.a(8,16,l,t.registerAssetLoadCallback());J=new N(c,t.registerAssetLoadCallback()),t.onAllFinished(()=>function(t){const i=document.getElementById("canvas"),e=i.getContext("2d");j=new r.a(i,e,n,h,!0,()=>{}),Object(a.a)(e),X=J.getSprite(new u.a(96,0),new u.a(32,48),new u.a(.5,.5));let s=(o=J,{interceptor:[new G(o,new u.a(32,32),new u.a(32,16),new u.a(16,16),Math.PI/2,new u.a(.5,.5),5,1,1,6,.001,Math.PI/128,()=>new W),new G(o,new u.a(32,32),new u.a(128,16),new u.a(16,16),Math.PI/2,new u.a(.5,.5),5,1,1,6,.001,Math.PI/128,()=>new W)],fighter:[new G(o,new u.a(64,64),new u.a(64,0),new u.a(32,32),Math.PI/2,new u.a(.5,.5),5,.1,.01,8,.001,Math.PI/64,()=>new W),new G(o,new u.a(64,64),new u.a(160,0),new u.a(32,32),Math.PI/2,new u.a(.5,.5),5,1,1,6,.001,Math.PI/128,()=>new W)]});var o;const l=new I.a(document.body,!1),c=new D(t),d=new K(c,l);d.Effects.push(new V(new u.a(0,0),new S(q(0,30),A.linear),new S(q(-10,30),A.fastOut),new S(q(O.a.rgb(1,1,.5),O.a.rgb(1,0,0),O.a.rgb(.2,.2,0)),A.linear),120)),d.Effects.push(new H(new u.a(100,0),new L.c(-30,30),new L.c(-30,30),new L.c(30,30),4,new L.c(20,40),new L.c(20,60))),d.Entities[E.ally].push(s.fighter[0].buildShip(E.ally,new u.a(-100,0),Math.PI/2)),function t(i,e,s,r,o){Q+=Math.PI/60,s.update(),i.tick(),e.tick(s),function(t,i,e,s){Object(a.a)(s),s.fillStyle="black",s.fillRect(0,0,n,h),s.save();const r=u.a.add(i.position,u.a.Multiply(i.velocity,10));s.translate(-(r.x-n/2),-(r.y-h/2)),s.fillStyle="gray";for(let t=400*Math.floor((r.y-h/2)/400);t<=400*Math.floor((r.y+h/2)/400);t+=400)s.fillRect(r.x-n/2,t,n,3);for(let t=400*Math.floor((r.x-n/2)/400);t<=400*Math.floor((r.x+n/2)/400);t+=400)s.fillRect(t,r.y-h/2,3,h);i.render(s),X.draw(s,new u.a(100,0),new u.a(64,96),Q),t.draw(s),s.restore()}(i,e,0,o),requestAnimationFrame(()=>t(i,e,s,r,o))}(d,c,l,i,e)}(i))}let Q=0}}]);
//# sourceMappingURL=bullets.bundle.js.map