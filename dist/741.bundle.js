"use strict";(self.webpackChunktrading_game=self.webpackChunktrading_game||[]).push([[741],{7774:(t,n,e)=>{e.d(n,{Z:()=>i});var s=e(2294);class i{constructor(t=!0){this.components=t?[[1,0,0,0],[0,1,0,0],[0,0,1,0],[0,0,0,1]]:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,1]]}transform(t){let n=this.multRow(this.components[0],t),e=this.multRow(this.components[1],t),i=this.multRow(this.components[2],t),r=this.multRow(this.components[3],t);return new s.Z(n/r,e/r,i/r)}mult(t){const n=new i;for(let e=0;e<4;e++)for(let s=0;s<4;s++){n.components[e][s]=0;for(let i=0;i<4;i++)n.components[e][s]+=this.components[e][i]*t.components[i][s]}return n}multRow(t,n){return t[0]*n.x+t[1]*n.y+t[2]*n.z+t[3]}colMajor(){let t=new Array(16),n=0;for(let e=0;e<4;e++)for(let s=0;s<4;s++)t[n++]=this.components[e][s];return t}rowMajor(){let t=new Array(16),n=0;for(let e=0;e<4;e++)for(let s=0;s<4;s++)t[n++]=this.components[s][e];return t}static translate(t){let n=new i;return n.components[0][3]=t.x,n.components[1][3]=t.y,n.components[2][3]=t.z,n}}},2294:(t,n,e)=>{e.d(n,{Z:()=>s});class s{constructor(t,n,e){this.x=t,this.y=n,this.z=e}static zero(){return new s(0,0,0)}lengthSq(){return this.dot(this)}length(){return Math.sqrt(this.lengthSq())}clone(){return new s(this.x,this.y,this.z)}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}normalize(){let t=this.length();return this.div(t)}mult(t,n,e){let{x:r,y:o,z:a}=i(t,n,e,!0);return new s(r*this.x,o*this.y,a*this.z)}div(t,n,e){let{x:r,y:o,z:a}=i(t,n,e,!0);return new s(this.x/r,this.y/o,this.z/a)}add(t,n,e){let{x:r,y:o,z:a}=i(t,n,e);return new s(this.x+r,this.y+o,this.z+a)}sub(t,n,e){let{x:r,y:o,z:a}=i(t,n,e);return new s(this.x-r,this.y-o,this.z-a)}}function i(t,n,e,s=!1){return void 0===n?s&&void 0===t.x?{x:t,y:t,z:t}:t:{x:t,y:n,z:e}}},7550:(t,n,e)=>{e.d(n,{Z:()=>r});var s=e(2751),i=e(7774);class r{constructor(t,n,e,s){this.real=t,this.i=n,this.j=e,this.k=s}inverse(){const t=r.Dot(this,this);return new r(this.real/t,-this.i/t,-this.j/t,-this.k/t)}static Dot(t,n){return t.real*n.real+t.i*n.i+t.j*n.j+t.k*n.k}static axisRotation(t,n){const e=Math.cos(n/2),s=Math.sin(n/2),i=t.length();return new r(e,s*t.x/i,s*t.y/i,s*t.z/i)}static multiply(t,n){return new r(t.real*n.real-t.i*n.i-t.j*n.j-t.k*n.k,t.real*n.i+t.i*n.real+t.j*n.k-t.k*n.j,t.real*n.j-t.i*n.k+t.j*n.real+t.k*n.i,t.real*n.k+t.i*n.j-t.j*n.i+t.k*n.real)}applyTransform(t){if(void 0!==t.real)return r.multiply(this,r.multiply(t,this.inverse()));{const n=new r(0,t.x,t.y,t.z),e=r.multiply(this,r.multiply(n,this.inverse()));return new s.Z(e.i,e.j,e.k)}}toMatrix(){const t=new i.Z;return t.components[0][0]=1-2*this.j*this.j-2*this.k*this.k,t.components[0][1]=2*this.i*this.j-2*this.k*this.real,t.components[0][2]=2*this.i*this.k+2*this.j*this.real,t.components[1][0]=2*this.i*this.j+2*this.k*this.real,t.components[1][1]=1-2*this.i*this.i-2*this.k*this.k,t.components[1][2]=2*this.j*this.k-2*this.i*this.real,t.components[2][0]=2*this.i*this.k-2*this.j*this.real,t.components[2][1]=2*this.j*this.k+2*this.i*this.real,t.components[2][2]=1-2*this.i*this.i-2*this.j*this.j,t}}},2751:(t,n,e)=>{e.d(n,{Z:()=>s});class s{constructor(t,n,e){this.x=t,this.y=n,this.z=e}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}length(){return Math.sqrt(this.lengthSq())}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}normalize(){return this.multiply(1/this.lengthSq())}negate(){return new s(-this.x,-this.y,-this.z)}multiply(t,n,e){i(t)||(n=null!=n?n:t,e=null!=e?e:t);var[r,o,a]=s.getxyz(t,n,e);return new s(this.x*r,this.y*o,this.z*a)}add(t,n,e){var[i,r,o]=s.getxyz(t,n,e);return new s(this.x+i,this.y+r,this.z+o)}subtract(t,n,e){var[i,r,o]=s.getxyz(t,n,e);return new s(this.x-i,this.y-r,this.z-o)}static getxyz(t,n,e){return i(t)?[t.x,t.y,t.z]:[t,n,e]}}function i(t){return void 0!==t.x}},6718:(t,n,e)=>{e.d(n,{Z:()=>r});class s{constructor(t,n){this.keys=t,this.changes=n}isKeyDown(t){return-1!==this.keys.indexOf(t)}isKeyUp(t){return-1===this.keys.indexOf(t)}}class i{constructor(t,n){this.attachedElement=t,this.logKeyNames=n,void 0===this.logKeyNames&&(this.logKeyNames=!1),t.addEventListener("keydown",(t=>this.onKeyDown(t))),t.addEventListener("keyup",(t=>this.onKeyUp(t))),this.downKeys=[],this.changes=[]}onKeyDown(t){this.logKeyNames&&console.log(t.key),-1===this.downKeys.indexOf(t.key)&&(this.changes.push({key:t.key,change:"press"}),this.downKeys.push(t.key))}onKeyUp(t){this.changes.push({key:t.key,change:"release"});const n=this.downKeys.indexOf(t.key);this.downKeys.splice(n,1)}Update(){const t=this.downKeys,n=this.changes;return this.downKeys=t.slice(),this.changes=[],new s(t,n)}}class r{constructor(t,n){this.watcher=new i(t,n),this.prvState=this.currentState=this.watcher.Update()}update(){this.prvState=this.currentState,this.currentState=this.watcher.Update()}isKeyDown(t){return this.currentState.isKeyDown(t)}isKeyUp(t){return this.currentState.isKeyUp(t)}isKeyPressed(t){return this.currentState.isKeyDown(t)&&this.prvState.isKeyUp(t)}isKeyReleased(t){return this.currentState.isKeyUp(t)&&this.prvState.isKeyDown(t)}changes(){return this.currentState.changes}}},9741:(t,n,e)=>{e.r(n),e.d(n,{default:()=>A});var s=e(7363),i=e(5901);function r(t,n,e){return new a("sin",void 0===n?-1:n,void 0===e?1:e,t)}function o(t,n,e){return new a("cos",void 0===n?-1:n,void 0===e?1:e,t)}class a{constructor(t,n,e,s){this.timeFunc=t,this.min=n,this.max=e,this.rate=s}}function c(t){if(void 0===t.timeFunc){const n=t.toString();return-1===n.indexOf(".")?n+".0":n}{const n=(t.max-t.min)/2,e=(t.max+t.min)/2,s=`(t/60.0 * ${c(t.rate)})`;switch(t.timeFunc){case"sin":return`sin(${s} * PI * 2.0) * ${c(n)} + ${c(e)}`;case"cos":return`cos(${s} * PI * 2.0) * ${c(n)} + ${c(e)}`}}}function l(t,n,e){return"vec3("+c(t)+","+c(n)+","+c(e)+")"}var h=e(6718),m=e(7550),u=e(2751);const p=new class{constructor(t){this.primitive=t,this.nextTempVar=0,this.glsl="float dist(vec3 p) {\r\n"}getTempVarName(){return"t"+this.nextTempVar++}elongate(t,n,e){return this.glsl+=`p = p - clamp(p, -${l(t,n,e)}, ${l(t,n,e)} );\r\n`,this}repeat(t,n,e){const s=l(t,n,e);return this.glsl+=`p = mod(p+0.5*${s},${s})-0.5*${s};\r\n`,this}symX(){return this.glsl+="p.x = abs(p.x);\r\n",this}symY(){return this.glsl+="p.y = abs(p.y);\r\n",this}symZ(){return this.glsl+="p.z = abs(p.z);\r\n",this}symAxis(t,n,e){const s=(i=n,r=e,"normalize(vec3("+c(t)+","+c(i)+","+c(r)+"))");var i,r;return this.glsl+=`p -= 2.0 * min(0.00, dot(p, ${s})) * ${s};\r\n`,this}rXt(t){const n=this.getTempVarName(),e="PI * t/30.0 * "+c(t);return this.glsl+=`mat3 ${n} = mat3(\n            1.0, 0.0, 0.0,\n            0.0, cos(${e}), sin(${e}),\n            0.0, -sin(${e}), cos(${e})\n        );\n        p = ${n} * p;\r\n`,this}rYt(t){const n=this.getTempVarName(),e="PI * t/30.0 * "+c(t);return this.glsl+=`mat3 ${n} = mat3(\n            cos(${e}), 0.0, -sin(${e}),\n            0.0, 1.0, 0.0,\n            sin(${e}), 0.0, cos(${e})\n        );\n        p = ${n} * p;\r\n`,this}rZt(t){const n=this.getTempVarName(),e="PI * t/30.0 * "+c(t);return this.glsl+=`mat3 ${n} = mat3(\n            cos(${e}), sin(${e}), 0.0,\n            -sin(${e}), cos(${e}), 0.0,\n            0.0, 0.0, 1.0\n        );\n        p = ${n} * p;\r\n`,this}rX(t){const n=this.getTempVarName(),e=c(t);return this.glsl+=`mat3 ${n} = mat3(\n            1.0, 0.0, 0.0,\n            0.0, cos(${e}), sin(${e}),\n            0.0, -sin(${e}), cos(${e})\n        );\n        p = ${n} * p;\r\n`,this}rY(t){const n=this.getTempVarName(),e=c(t);return this.glsl+=`mat3 ${n} = mat3(\n            cos(${e}), 0.0, -sin(${e}),\n            0.0, 1.0, 0.0,\n            sin(${e}), 0.0, cos(${e})\n        );\n        p = ${n} * p;\r\n`,this}rZ(t){const n=this.getTempVarName(),e=c(t);return this.glsl+=`mat3 ${n} = mat3(\n            cos(${e}), sin(${e}), 0.0,\n            -sin(${e}), cos(${e}), 0.0,\n            0.0, 0.0, 1.0\n        );\n        p = ${n} * p;\r\n`,this}translate(t,n,e){return this.glsl+=`p = p-vec3(${c(t)},${c(n)},${c(e)});\r\n`,this}customGlsl(t){return this.glsl+=t,this}emitGlsl(){return this.glsl+=this.primitive.emitGlsl(),this.glsl+="}",this.glsl}}(new class{constructor(t,n,e,s){this.scale=t,this.c=n,this.maxIterations=e,this.bailoutRange=s}emitGlsl(){return`\nconst float bailout = ${c(this.bailoutRange)};\nconst vec3 C = ${l(this.c.x,this.c.y,this.c.z)};\nconst float scale = ${c(this.scale)};\nconst int MI = ${this.maxIterations};\nfloat r = dot(p, p);\nint numi = 0;\nfor(int i = 0; i < MI; i++){\n    numi = i;\n    if(r >= bailout) break;\n\n    // Rotate 1\n    \n    p = abs(p);\n    if(p.x - p.y < 0.0){ float x1=p.y; p.y=p.x; p.x=x1;}\n    if(p.x - p.z < 0.0){ float x1=p.z; p.z=p.x; p.x=x1;}\n    if(p.y - p.z < 0.0){ float y1=p.z; p.z=p.y; p.y=y1;}\n\n    // Rotate 2\n\n    p.xy = scale * p.xy - C.xy * (scale-1.0);\n    p.z=scale*p.z;\n    if(p.z>0.5*C.z*(scale-1.0)) p.z-=C.z*(scale-1.0);\n    \n    r = dot(p, p);\n}\nreturn (length(p)-2.0)*pow(scale,-float(numi));\r\n`}}(3,new u.Z(1,1,1),100,100)).symAxis(r(.03),o(.03),o(1,-.01,.01)).symAxis(-.8,.2,0).symAxis(.4,.6,0).symAxis(-.4,.6,0).rXt(.03).rYt(.003).rZt(-9e-4).translate(r(.1,-.4,.4),o(.2,-.2,.2),0).emitGlsl();console.log("DISTF: "),console.log(p);const y=`\nprecision mediump float;\n#define PI 3.1415926538\n\nuniform vec2 WindowSize;\nuniform vec3 cam_pos;\nuniform vec4 cam_orient;\nuniform float t;\n\nconst int MaximumRaySteps = 50;\nconst float MinimumDistance = 0.001;\nconst float MaxFogDist = 20.0;\n\nconst float nscale = 0.001;\nconst vec3 xdir = vec3(1.0, 0.0, 0.0);\nconst vec3 ydir = vec3(0.0, 1.0, 0.0);\nconst vec3 zdir = vec3(0.0, 0.0, 1.0);\nconst vec3 lightdir = normalize(vec3(1.0, 0.0, -1.0));\nconst vec3 lightsrc = lightdir * 10.0;\nconst vec3 amblight = vec3(0.1, 0.1, 0.1);\nconst vec3 normlight = vec3(1, .95, .9);\nconst float ambocc = 0.2;\nconst float shadowLightness = .3;\n\nconst float scale = 3.0;\nconst vec3 C = vec3(1, 1, 1);\nconst int MI = 100;\nconst float bailout = 10.0;\n\nvec4 qInverse(vec4 q) {\n    float denom = dot(q, q);\n    return vec4(-q.x / denom, -q.y / denom, -q.z / denom, q.w / denom);\n}\n\nvec4 qMult(vec4 a, vec4 b) {\n    vec4 res = vec4(0.0, 0.0, 0.0, 0.0);\n    res.x = a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y;\n    res.y = a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x;\n    res.z = a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w;\n    res.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return res;\n}\n\nvec4 qTransform(vec4 f, vec4 pt) {\n    return qMult(f, qMult(pt, qInverse(f)));\n}\n\n${p}\n\nvec3 trace(vec3 from, vec3 direction) {\n\tfloat totalDistance = 0.0;\n    int nsteps;\n    bool hit = false;\n\tfor (int steps = 0; steps < MaximumRaySteps; steps++) {\n        nsteps = steps;\n\t\tvec3 p = from + totalDistance * direction;\n\t\tfloat distance = dist(p);\n\t\ttotalDistance += distance;\n        if (distance < MinimumDistance) \n        {\n            hit = true;\n            break;\n        }\n    }\n\treturn vec3(totalDistance, 1.0-float(nsteps)/float(MaximumRaySteps), hit ? 1.0 : 0.0);\n}\n\nfloat derel(float f) {\n    return f + 1.0 / 2.0;\n}\n\nvoid main() {\n\n    float losx = (gl_FragCoord.x / WindowSize.x) * 2.0 - 1.0;\n    float losy = (gl_FragCoord.y / WindowSize.y) * 2.0 - 1.0;\n    vec3 losFwd = normalize(vec3(losx, losy, 1));\n    vec3 dir = qTransform(cam_orient, vec4(losFwd.x, losFwd.y, losFwd.z, 0)).xyz;\n\n    vec3 colis = trace(cam_pos, dir);\n\n    if(colis.z == 0.0)\n    {\n        gl_FragColor = vec4(0, 0, 0, 1.0);\n    }\n    else\n    {\n        vec3 pos = cam_pos + colis.x * dir;\n        vec3 dlight = 1.0 - amblight;\n        vec3 n = normalize(vec3(\n            dist(pos+xdir*nscale)-dist(pos-xdir*nscale),\n            dist(pos+ydir*nscale)-dist(pos-ydir*nscale),\n            dist(pos+zdir*nscale)-dist(pos-zdir*nscale)\n        ));\n\n        vec3 lightCastSrc = pos + n * MinimumDistance * 2.0;\n        vec3 lcolis = trace(lightCastSrc, normalize(lightsrc - lightCastSrc));\n\n        float shadow = 1.0 - lcolis.z;\n        shadow = min(shadow + shadowLightness, 1.0);\n\n        float normalLightAmt = clamp(dot(n, lightdir), 0.0, 1.0);\n                        \n        float fog = 1.0 - min(1.0, colis.x / MaxFogDist);\n        float cplx = colis.y;\n\n        vec3 color = (amblight + (1.0 - amblight) * normlight * normalLightAmt * (1.0 - ambocc + ambocc * colis.y)) * fog * shadow;\n        gl_FragColor = vec4(color.x, color.y, color.z, 1.0);\n    }\n}\n`,d={x:0,y:0,z:-2};let f,g=0,x=new m.Z(1,0,0,0);const w=[["w",new u.Z(0,0,1)],["a",new u.Z(-1,0,0)],["s",new u.Z(0,0,-1)],["d",new u.Z(1,0,0)],["q",new u.Z(0,1,0)],["z",new u.Z(0,-1,0)]],v=-Math.PI/120,z=[["ArrowUp",new u.Z(1,0,0)],["ArrowDown",new u.Z(-1,0,0)],["ArrowLeft",new u.Z(0,1,0)],["ArrowRight",new u.Z(0,-1,0)]];function b(){const t=document.getElementById("canvas");(0,i.f5)(t,800,600);const n=t.getContext("webgl");if(null===n)return void alert("Unable to initialize WebGL. Your browser may not support it.");n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT);const e=function(t,n,e){const s=k(t,t.VERTEX_SHADER,"\nattribute vec4 aVertexPosition;\nvoid main() {\n  gl_Position = aVertexPosition;\n}\n"),i=k(t,t.FRAGMENT_SHADER,e),r=t.createProgram();if(t.attachShader(r,s),t.attachShader(r,i),t.linkProgram(r),t.getProgramParameter(r,t.LINK_STATUS))return r;alert("Unable to initialize the shader program: "+t.getProgramInfoLog(r))}(n,0,y),s=function(t){const n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n);return t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,1,1,1,-1,-1,1,-1]),t.STATIC_DRAW),{position:n}}(n);S(n,e,s,t),f=new h.Z(document.body,!1),$(n,e,s,t)}function $(t,n,e,s){f.update();let i=!1;for(const[t,n]of w)if(f.isKeyDown(t)){const t=f.isKeyDown("Shift")?.05:.005,e=x.applyTransform(n);d.x+=e.x*t,d.y+=e.y*t,d.z+=e.z*t,i=!0}for(const[t,n]of z)f.isKeyDown(t)&&(x=m.Z.multiply(x,m.Z.axisRotation(n,v)));S(t,n,e,s),requestAnimationFrame((()=>$(t,n,e,s)))}function S(t,n,e,s){t.clearColor(0,0,0,1),t.clearDepth(1),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);{const s=2,i=t.FLOAT,r=!1,o=0,a=0;t.bindBuffer(t.ARRAY_BUFFER,e.position),t.vertexAttribPointer(t.getAttribLocation(n,"aVertexPosition"),s,i,r,o,a),t.enableVertexAttribArray(t.getAttribLocation(n,"aVertexPosition"))}t.useProgram(n),t.uniform2fv(t.getUniformLocation(n,"WindowSize"),[s.width,s.height]),t.uniform3fv(t.getUniformLocation(n,"cam_pos"),[d.x,d.y,d.z]),t.uniform4fv(t.getUniformLocation(n,"cam_orient"),[x.i,x.j,x.k,x.real]),t.uniform1f(t.getUniformLocation(n,"t"),g),g+=1;{const n=0,e=4;t.drawArrays(t.TRIANGLE_STRIP,n,e)}}function k(t,n,e){const s=t.createShader(n);return t.shaderSource(s,e),t.compileShader(s),t.getShaderParameter(s,t.COMPILE_STATUS)?s:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(s)),void t.deleteShader(s))}function A(){return s.useEffect((()=>b())),s.createElement("div",{className:"conway conway_body full_body"},s.createElement("canvas",{id:"canvas"}))}}}]);
//# sourceMappingURL=741.bundle.js.map