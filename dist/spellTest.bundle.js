(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{102:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return d}));var s,r,i=n(24),o=n(25),p=n(83),a=n(13);!function(e){e[e.Up=0]="Up",e[e.Right=1]="Right",e[e.Down=2]="Down",e[e.Left=3]="Left",e[e.UpDown=4]="UpDown",e[e.LeftRight=5]="LeftRight",e[e.Any=6]="Any",e[e.Stop=7]="Stop"}(s||(s={})),function(e){e[e.None=0]="None",e[e.Optional=1]="Optional",e[e.Repeatable=2]="Repeatable"}(r||(r={}));class c{constructor(e,t,n,i){if(this.gid=e.Increment(),void 0===t.length)this.content=[t],this.repeatType=n,this.parent=i;else for(t=t,this.repeatType=r.None,this.content=[],this.parent=n;t.length>0;){switch(t.pop()){case"u":this.content.push(s.Up);break;case"d":this.content.push(s.Down);break;case"l":this.content.push(s.Left);break;case"r":this.content.push(s.Right);break;case"h":this.content.push(s.LeftRight);break;case"v":this.content.push(s.UpDown);break;case"a":this.content.push(s.Any);break;case"s":this.content.push(s.Stop);break;case"(":this.content.push(new c(e,t,{parent:this,parentIndex:this.content.length}));break;case")":return;case"?":this.pushToPrevious(e,r.Optional);break;case"+":this.pushToPrevious(e,r.Repeatable)}}}static Parse(e){return new c(new h,e.split("").reverse(),void 0)}static isArrow(e){return void 0===e.content}pushToPrevious(e,t){if(0===this.content.length)throw new Error("Can't push repeat group: Spell is empty");const n=this.content.length-1,s=this.content[n];c.isArrow(s)?this.content[n]=new c(e,s,t,{parent:this,parentIndex:n}):s.repeatType=t}}class h{constructor(){this.nextGid=0}Increment(){return this.nextGid++}}class l{constructor(e,t){this.spell=e,this.index=t}static FirstSteps(e){return new l(e,-1).NextSteps()}ArrowHere(){return this.spell.content[this.index]}NextSteps(){const e=this.index+1;if(e>=this.spell.content.length){if(void 0===this.spell.parent)return[];const e=new l(this.spell.parent.parent,this.spell.parent.parentIndex).NextSteps();if(this.spell.repeatType===r.Repeatable){const t=l.FirstSteps(this.spell);e.splice(e.length,0,...t)}return e}if(c.isArrow(this.spell.content[e]))return[new l(this.spell,e)];{const t=this.spell.content[e],n=l.FirstSteps(t);if(t.repeatType===r.Optional){const e=new l(this.spell,this.index+1).NextSteps();n.splice(n.length,0,...e)}return n}}Equals(e){return this.spell===e.spell&&this.index===e.index}}const u=["ArrowUp","ArrowDown","ArrowLeft","ArrowRight"," "];function d(){const e=new i.a,t=new o.a(16,16,p.a,e.registerAssetLoadCallback());e.onAllFinished(()=>function(e){const t=document.getElementById("canvas");console.log(t),Object(a.b)(t,500,500);const n=t.getContext("2d");n.scale(2,2),Object(a.a)(n);const r=c.Parse("ud(lr(lru)?)+as"),i=l.FirstSteps(r);w(r,e,n,i,0),document.addEventListener("keydown",t=>{-1!==u.indexOf(t.key)&&(!function(e,t,n,r,i){if(" "===t)e.splice(0,e.length,...l.FirstSteps(n));else{const n="ArrowUp"===t?s.Up:"ArrowDown"===t?s.Down:"ArrowLeft"===t?s.Left:s.Right,r=e.length;for(let t=e.length-1;t>=0;t--){const r=e[t];o=n,((p=r.ArrowHere())===s.Any||(p===s.Stop?o===s.Stop:o===p||p>=4&&o<=3&&o%2==p%2))&&e.splice(e.length,0,...r.NextSteps())}e.splice(0,r)}var o,p;i.clearRect(0,0,500,500),w(n,r,i,e,0)}(i,t.key,r,e,n),t.preventDefault())})}(t))}function w(e,t,n,s,i){const o=void 0!==e.parent&&e.content.length>1;o&&(t.renderCustom(n,i,0,8,16,0,4,8,16),i+=8);const p=s.filter(t=>t.spell===e).sort((e,t)=>t.index-e.index);for(const[r,o]of e.content.entries())c.isArrow(o)?(t.render(n,i,0,16,16,o%4,2+Math.floor(o/4)),p.length>0&&p[p.length-1].index===r&&(t.render(n,i,2,16,16,2,4),p.pop()),i+=16):i=w(o,t,n,s,i);return o&&(t.renderCustom(n,i,0,8,16,1,4,8,16),i+=8),e.repeatType===r.Optional?(n.drawImage(t.image,24,64,8,8,i,0,8,8),i+=8):e.repeatType===r.Repeatable&&(n.drawImage(t.image,16,64,8,8,i,0,8,8),i+=8),i}},83:function(e,t,n){"use strict";t.a=n.p+"bbb298f00b41bbd627d27aa0529a20ba.png"}}]);
//# sourceMappingURL=spellTest.bundle.js.map