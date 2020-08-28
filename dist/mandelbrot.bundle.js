(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{77:function(t,e,i){"use strict";function s(t){return void 0!==t.real}i.d(e,"b",(function(){return s})),i.d(e,"a",(function(){return n}));class n{constructor(t,e){this.real=t,this.imaginary=e}absSq(){return this.real*this.real+this.imaginary*this.imaginary}abs(){return Math.sqrt(this.absSq())}addWith(t){return this.real+=t.real,this.imaginary+=t.imaginary,this}multiplyWith(t){const e=this.real*t.real-this.imaginary*t.imaginary;return this.imaginary=this.real*t.imaginary+t.real*this.imaginary,this.real=e,this}scalarMultiplyWith(t,e){return s(t)?(this.real*=t.real,this.imaginary*=t.imaginary):(this.real*=t,this.imaginary*=e),this}negate(){return this.real=-this.real,this.imaginary=-this.imaginary,this}pow(t){const e=this.absSq(),i=Math.atan2(this.imaginary,this.real);return this.real=Math.pow(e,t/2)*Math.cos(i),this.imaginary=Math.pow(e,t/2)*Math.sin(i),this}static add(t,e){return new n(t.real+e.real,t.imaginary+e.imaginary)}static mult(t,e){return new n(t.real*e.real-t.imaginary*e.imaginary,t.real*e.imaginary+t.imaginary*e.real)}static scalarMultiply(t,e,i){return s(e)?new n(t.real*e.real,t.imaginary*e.imaginary):new n(t.real*e,t.imaginary*i)}static conjugate(t){return new n(t.real,-t.imaginary)}static negate(t){return new n(-t.real,-t.imaginary)}static inverse(t){const e=n.conjugate(t),i=1/t.absSq();return e.scalarMultiplyWith(i,i)}static expi(t){return new n(Math.cos(t),Math.sin(t))}static exp(t){return this.expi(t.imaginary).multiplyWith(new n(Math.exp(t.real),0))}}},85:function(t,e,i){"use strict";i.r(e),i.d(e,"default",(function(){return d}));var s=i(86);class n{constructor(t,e){this.canvasWidth=t,this.canvasHeight=e,this.finished=!1,this.scale=this.maxScale=1<<this.fastLog2(Math.min(t,e)),this.x=this.y=0}fastLog2(t){let e=0;for(;t>0;)e++,t>>=1;return e}X(){return this.x*this.scale}Y(){return this.y*this.scale}Scale(){return this.scale}Advance(){if(this.x++,this.x*this.scale>=this.canvasWidth&&(this.x=0,this.y++,this.y*this.scale>=this.canvasHeight)){if(this.y=0,1===this.scale)return this.finished=!0,!0;this.scale/=2}return!1}Reset(){this.finished=!1,this.scale=this.maxScale,this.x=this.y=0}}const a=new s.a(0,255,0,200,0,0);class r{constructor(t,e){this.canvas=t,this.func=e,this.repainter=new n(800,800),this.ctx=t.getContext("2d"),this.screenRange=new s.d(new s.c(0,t.offsetWidth),new s.c(0,t.offsetHeight))}Paint(t){for(let e=0;e<16e3&&!this.repainter.finished;e++){const e=this.repainter.X(),i=this.repainter.Y(),s=this.repainter.Scale(),n=this.screenRange.ConvertTo({x:e,y:i},t);this.ctx.fillStyle=this.CalcColor(n),this.ctx.fillRect(e,i,s,s),this.repainter.Advance()}}CalcColor(t){const e=new s.b(t.x,t.y);let i=new s.b(t.x,t.y),n=0;for(;n<255&&i.absSq()<this.func.MaxAbsSq();)i=this.func.Iterate(i,e),n++;if(i.absSq()<this.func.MaxAbsSq())return"white";const r=n/255;return a.ToColor(r)}ResetPaint(){this.repainter.Reset()}}class h{Iterate(t,e){return t.multiplyWith(t),t.addWith(e),t}MaxAbsSq(){return 2}}class o{constructor(t){this.c=t,this.radius=(Math.sqrt(4*t.abs()+1)+1)/2}Iterate(t,e){return t.multiplyWith(t),t.addWith(this.c),t}MaxAbsSq(){return this.radius}}class c{constructor(t,e,i,n){this.control=t,this.paintWindow=e,this.renderer=i,this.onSelect=n,t.addEventListener("mousedown",this.handleMouseDown.bind(this)),t.addEventListener("mouseup",this.handleMouseUp.bind(this)),t.addEventListener("mouseleave",this.handleMouseLeave.bind(this)),t.addEventListener("mousemove",this.handleMouseMove.bind(this)),t.addEventListener("wheel",this.handleScroll.bind(this)),this.screenBounds=new s.d(new s.c(0,t.offsetWidth),new s.c(0,t.offsetHeight))}reset(){this.paintWindow=new s.d(new s.c(-1,1),new s.c(-1,1)),this.renderer.ResetPaint()}handleMouseDown(t){if(0===t.button)this.grabX=t.offsetX,this.grabY=t.offsetY,this.isGrabbed=!0,t.preventDefault();else if(1===t.button){const e=this.screenBounds.ConvertTo({x:t.offsetX,y:t.offsetY},this.paintWindow);this.onSelect(e.x,e.y),t.preventDefault()}}handleMouseUp(){this.isGrabbed=!1}handleMouseLeave(){this.isGrabbed=!1}handleMouseMove(t){if(4===t.buttons){const e=this.screenBounds.ConvertTo({x:t.offsetX,y:t.offsetY},this.paintWindow);this.onSelect(e.x,e.y),t.preventDefault()}if(!this.isGrabbed)return;const e=t.offsetX-this.grabX,i=t.offsetY-this.grabY,s=this.screenBounds.GetPercentage(e,i);this.paintWindow.ShiftByPercentage(-s.x,-s.y),this.assertBounds(),this.renderer.ResetPaint(),this.grabX=t.offsetX,this.grabY=t.offsetY}handleScroll(t){const e=t.deltaY/3,i=Math.pow(1.1,e),s=this.screenBounds.GetPercentage(t.offsetX,t.offsetY);this.paintWindow.AspectScale(i,s.x,s.y),this.assertBounds(),this.renderer.ResetPaint(),t.preventDefault()}assertBounds(){(this.paintWindow.xRange.Length()>4||this.paintWindow.yRange.Length()>4)&&(this.paintWindow.xRange.ScaleTo(4,.5),this.paintWindow.yRange.ScaleTo(4,.5)),this.assertRangeBounds(this.paintWindow.xRange),this.assertRangeBounds(this.paintWindow.yRange)}assertRangeBounds(t){t.min<-2&&t.Shift(-2-t.min),t.max>2&&t.Shift(2-t.max)}Tick(){this.renderer.Paint(this.paintWindow)}}let l,u;function d(){const t=document.getElementById("mainCanvas"),e=document.getElementById("subCanvas");t.setAttribute("width","800"),t.setAttribute("height","800"),t.style.width="800px",t.style.height="800px",e.setAttribute("width","800"),e.setAttribute("height","800"),e.style.width="800px",e.style.height="800px",l=new c(t,new s.d(new s.c(-1,1),new s.c(-1,1)),new r(t,new h),g),u=new c(e,new s.d(new s.c(-1,1),new s.c(-1,1)),new r(e,new o(new s.b(0,0))),(t,e)=>{}),setTimeout(f,0)}function g(t,e){u.renderer.func=new o(new s.b(t,e)),u.reset()}function f(){l.Tick(),u.Tick(),requestAnimationFrame(f)}},86:function(t,e,i){"use strict";i.d(e,"c",(function(){return s})),i.d(e,"d",(function(){return n})),i.d(e,"a",(function(){return a})),i.d(e,"b",(function(){return r.a}));class s{constructor(t,e){this.min=t,this.max=e}Length(){return this.max-this.min}GetValue(t){return this.min+(this.max-this.min)*t}GetPercentage(t){return(t-this.min)/(this.max-this.min)}Shift(t){this.min+=t,this.max+=t}ShiftByPercentage(t){const e=this.max-this.min;this.min+=e*t,this.max+=e*t}Scale(t,e=.5){this.ScaleTo(this.Length()*t,e)}ScaleTo(t,e){const i=t-(this.max-this.min);this.min-=i*e,this.max+=i*(1-e)}ConvertTo(t,e){return e.GetValue(this.GetPercentage(t))}ConvertFrom(t,e){return e.ConvertTo(t,this)}}new s(0,1);window.range=s;class n{constructor(t,e){this.xRange=t,this.yRange=e}GetValue(t,e){return{x:this.xRange.GetValue(t),y:this.yRange.GetValue(e)}}GetPercentage(t,e){return{x:this.xRange.GetPercentage(t),y:this.yRange.GetPercentage(e)}}Shift(t,e){this.xRange.Shift(t),this.yRange.Shift(e)}ShiftByPercentage(t,e){this.xRange.ShiftByPercentage(t),this.yRange.ShiftByPercentage(e)}AspectScale(t,e=.5,i=.5){return this.Scale(t,e,t,i)}Scale(t,e,i,s){this.xRange.Scale(t,e),this.yRange.Scale(i,s)}ConvertTo(t,e){const i=this.GetPercentage(t.x,t.y);return e.GetValue(i.x,i.y)}}class a{constructor(t,e,i,n,a,r){this.rRange=new s(t,e),this.gRange=new s(i,n),this.bRange=new s(a,r)}ToColor(t){return"rgb("+Math.floor(this.rRange.GetValue(t))+","+Math.floor(this.gRange.GetValue(t))+","+Math.floor(this.bRange.GetValue(t))+")"}}var r=i(77)}}]);
//# sourceMappingURL=mandelbrot.bundle.js.map