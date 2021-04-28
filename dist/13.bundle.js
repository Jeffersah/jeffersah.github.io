(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{79:function(t,n,e){"use strict";e.d(n,"a",(function(){return r}));class s{constructor(t,n){this.keys=t,this.changes=n}isKeyDown(t){return-1!==this.keys.indexOf(t)}isKeyUp(t){return-1===this.keys.indexOf(t)}}class i{constructor(t,n){this.attachedElement=t,this.logKeyNames=n,void 0===this.logKeyNames&&(this.logKeyNames=!1),t.addEventListener("keydown",t=>this.onKeyDown(t)),t.addEventListener("keyup",t=>this.onKeyUp(t)),this.downKeys=[],this.changes=[]}onKeyDown(t){this.logKeyNames&&console.log(t.key);-1===this.downKeys.indexOf(t.key)&&(this.changes.push({key:t.key,change:"press"}),this.downKeys.push(t.key))}onKeyUp(t){this.changes.push({key:t.key,change:"release"});const n=this.downKeys.indexOf(t.key);this.downKeys.splice(n,1)}Update(){const t=this.downKeys,n=this.changes;return this.downKeys=t.slice(),this.changes=[],new s(t,n)}}class r{constructor(t,n){this.watcher=new i(t,n),this.prvState=this.currentState=this.watcher.Update()}update(){this.prvState=this.currentState,this.currentState=this.watcher.Update()}isKeyDown(t){return this.currentState.isKeyDown(t)}isKeyUp(t){return this.currentState.isKeyUp(t)}isKeyPressed(t){return this.currentState.isKeyDown(t)&&this.prvState.isKeyUp(t)}isKeyReleased(t){return this.currentState.isKeyUp(t)&&this.prvState.isKeyDown(t)}changes(){return this.currentState.changes}}},83:function(t,n,e){"use strict";e.d(n,"a",(function(){return s}));class s{constructor(t,n,e){this.x=t,this.y=n,this.z=e}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}length(){return Math.sqrt(this.lengthSq())}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}normalize(){return this.multiply(1/this.lengthSq())}negate(){return new s(-this.x,-this.y,-this.z)}multiply(t,n,e){i(t)||(n=null!=n?n:t,e=null!=e?e:t);var[r,o,a]=s.getxyz(t,n,e);return new s(this.x*r,this.y*o,this.z*a)}add(t,n,e){var[i,r,o]=s.getxyz(t,n,e);return new s(this.x+i,this.y+r,this.z+o)}subtract(t,n,e){var[i,r,o]=s.getxyz(t,n,e);return new s(this.x-i,this.y-r,this.z-o)}static getxyz(t,n,e){return i(t)?[t.x,t.y,t.z]:[t,n,e]}}function i(t){return void 0!==t.x}},99:function(t,n,e){"use strict";e.r(n),e.d(n,"default",(function(){return A}));var s=e(0),i=e(13);function r(t,n,e){return new a("sin",void 0===n?-1:n,void 0===e?1:e,t)}function o(t,n,e){return new a("cos",void 0===n?-1:n,void 0===e?1:e,t)}class a{constructor(t,n,e,s){this.timeFunc=t,this.min=n,this.max=e,this.rate=s}}function c(t){if(void 0===t.timeFunc){const n=t.toString();return-1===n.indexOf(".")?n+".0":n}{const n=(t.max-t.min)/2,e=(t.max+t.min)/2,s=`(t/60.0 * ${c(t.rate)})`;switch(t.timeFunc){case"sin":return`sin(${s} * PI * 2.0) * ${c(n)} + ${c(e)}`;case"cos":return`cos(${s} * PI * 2.0) * ${c(n)} + ${c(e)}`}}}function l(t,n,e){return"vec3("+c(t)+","+c(n)+","+c(e)+")"}var h=e(79),u=e(83);class m{constructor(t,n,e,s){this.real=t,this.i=n,this.j=e,this.k=s}inverse(){const t=m.Dot(this,this);return new m(this.real/t,-this.i/t,-this.j/t,-this.k/t)}static Dot(t,n){return t.real*n.real+t.i*n.i+t.j*n.j+t.k*n.k}static axisRotation(t,n){const e=Math.cos(n/2),s=Math.sin(n/2),i=t.length();return new m(e,s*t.x/i,s*t.y/i,s*t.z/i)}static multiply(t,n){return new m(t.real*n.real-t.i*n.i-t.j*n.j-t.k*n.k,t.real*n.i+t.i*n.real+t.j*n.k-t.k*n.j,t.real*n.j-t.i*n.k+t.j*n.real+t.k*n.i,t.real*n.k+t.i*n.j-t.j*n.i+t.k*n.real)}applyTransform(t){if(void 0!==t.real)return m.multiply(this,m.multiply(t,this.inverse()));{const n=new m(0,t.x,t.y,t.z),e=m.multiply(this,m.multiply(n,this.inverse()));return new u.a(e.i,e.j,e.k)}}}const p=new class{constructor(t){this.primitive=t,this.nextTempVar=0,this.glsl="float dist(vec3 p) {\r\n"}getTempVarName(){return"t"+this.nextTempVar++}elongate(t,n,e){return this.glsl+=`p = p - clamp(p, -${l(t,n,e)}, ${l(t,n,e)} );\r\n`,this}repeat(t,n,e){const s=l(t,n,e);return this.glsl+=`p = mod(p+0.5*${s},${s})-0.5*${s};\r\n`,this}symX(){return this.glsl+="p.x = abs(p.x);\r\n",this}symY(){return this.glsl+="p.y = abs(p.y);\r\n",this}symZ(){return this.glsl+="p.z = abs(p.z);\r\n",this}symAxis(t,n,e){const s=(i=n,r=e,"normalize(vec3("+c(t)+","+c(i)+","+c(r)+"))");var i,r;return this.glsl+=`p -= 2.0 * min(0.00, dot(p, ${s})) * ${s};\r\n`,this}rXt(t){const n=this.getTempVarName(),e="PI * t/30.0 * "+c(t);return this.glsl+=`mat3 ${n} = mat3(\n            1.0, 0.0, 0.0,\n            0.0, cos(${e}), sin(${e}),\n            0.0, -sin(${e}), cos(${e})\n        );\n        p = ${n} * p;\r\n`,this}rYt(t){const n=this.getTempVarName(),e="PI * t/30.0 * "+c(t);return this.glsl+=`mat3 ${n} = mat3(\n            cos(${e}), 0.0, -sin(${e}),\n            0.0, 1.0, 0.0,\n            sin(${e}), 0.0, cos(${e})\n        );\n        p = ${n} * p;\r\n`,this}rZt(t){const n=this.getTempVarName(),e="PI * t/30.0 * "+c(t);return this.glsl+=`mat3 ${n} = mat3(\n            cos(${e}), sin(${e}), 0.0,\n            -sin(${e}), cos(${e}), 0.0,\n            0.0, 0.0, 1.0\n        );\n        p = ${n} * p;\r\n`,this}rX(t){const n=this.getTempVarName(),e=c(t);return this.glsl+=`mat3 ${n} = mat3(\n            1.0, 0.0, 0.0,\n            0.0, cos(${e}), sin(${e}),\n            0.0, -sin(${e}), cos(${e})\n        );\n        p = ${n} * p;\r\n`,this}rY(t){const n=this.getTempVarName(),e=c(t);return this.glsl+=`mat3 ${n} = mat3(\n            cos(${e}), 0.0, -sin(${e}),\n            0.0, 1.0, 0.0,\n            sin(${e}), 0.0, cos(${e})\n        );\n        p = ${n} * p;\r\n`,this}rZ(t){const n=this.getTempVarName(),e=c(t);return this.glsl+=`mat3 ${n} = mat3(\n            cos(${e}), sin(${e}), 0.0,\n            -sin(${e}), cos(${e}), 0.0,\n            0.0, 0.0, 1.0\n        );\n        p = ${n} * p;\r\n`,this}translate(t,n,e){return this.glsl+=`p = p-vec3(${c(t)},${c(n)},${c(e)});\r\n`,this}customGlsl(t){return this.glsl+=t,this}emitGlsl(){return this.glsl+=this.primitive.emitGlsl(),this.glsl+="}",this.glsl}}(new class{constructor(t,n,e,s){this.scale=t,this.c=n,this.maxIterations=e,this.bailoutRange=s}emitGlsl(){return`\nconst float bailout = ${c(this.bailoutRange)};\nconst vec3 C = ${l(this.c.x,this.c.y,this.c.z)};\nconst float scale = ${c(this.scale)};\nconst int MI = ${this.maxIterations};\nfloat r = dot(p, p);\nint numi = 0;\nfor(int i = 0; i < MI; i++){\n    numi = i;\n    if(r >= bailout) break;\n\n    // Rotate 1\n    \n    p = abs(p);\n    if(p.x - p.y < 0.0){ float x1=p.y; p.y=p.x; p.x=x1;}\n    if(p.x - p.z < 0.0){ float x1=p.z; p.z=p.x; p.x=x1;}\n    if(p.y - p.z < 0.0){ float y1=p.z; p.z=p.y; p.y=y1;}\n\n    // Rotate 2\n\n    p.xy = scale * p.xy - C.xy * (scale-1.0);\n    p.z=scale*p.z;\n    if(p.z>0.5*C.z*(scale-1.0)) p.z-=C.z*(scale-1.0);\n    \n    r = dot(p, p);\n}\nreturn (length(p)-2.0)*pow(scale,-float(numi));\r\n`}}(3,new u.a(1,1,1),100,100)).symAxis(r(.03),o(.03),o(1,-.01,.01)).symAxis(-.8,.2,0).symAxis(.4,.6,0).symAxis(-.4,.6,0).rXt(.03).rYt(.003).rZt(-9e-4).translate(r(.1,-.4,.4),o(.2,-.2,.2),0).emitGlsl();console.log("DISTF: "),console.log(p);const d=`\nprecision mediump float;\n#define PI 3.1415926538\n\nuniform vec2 WindowSize;\nuniform vec3 cam_pos;\nuniform vec4 cam_orient;\nuniform float t;\n\nconst int MaximumRaySteps = 50;\nconst float MinimumDistance = 0.001;\nconst float MaxFogDist = 20.0;\n\nconst float nscale = 0.001;\nconst vec3 xdir = vec3(1.0, 0.0, 0.0);\nconst vec3 ydir = vec3(0.0, 1.0, 0.0);\nconst vec3 zdir = vec3(0.0, 0.0, 1.0);\nconst vec3 lightdir = normalize(vec3(1.0, 0.0, -1.0));\nconst vec3 lightsrc = lightdir * 10.0;\nconst vec3 amblight = vec3(0.1, 0.1, 0.1);\nconst vec3 normlight = vec3(1, .95, .9);\nconst float ambocc = 0.2;\nconst float shadowLightness = .3;\n\nconst float scale = 3.0;\nconst vec3 C = vec3(1, 1, 1);\nconst int MI = 100;\nconst float bailout = 10.0;\n\nvec4 qInverse(vec4 q) {\n    float denom = dot(q, q);\n    return vec4(-q.x / denom, -q.y / denom, -q.z / denom, q.w / denom);\n}\n\nvec4 qMult(vec4 a, vec4 b) {\n    vec4 res = vec4(0.0, 0.0, 0.0, 0.0);\n    res.x = a.w * b.x + a.x * b.w + a.y * b.z - a.z * b.y;\n    res.y = a.w * b.y - a.x * b.z + a.y * b.w + a.z * b.x;\n    res.z = a.w * b.z + a.x * b.y - a.y * b.x + a.z * b.w;\n    res.w = a.w * b.w - a.x * b.x - a.y * b.y - a.z * b.z;\n    return res;\n}\n\nvec4 qTransform(vec4 f, vec4 pt) {\n    return qMult(f, qMult(pt, qInverse(f)));\n}\n\n${p}\n\nvec3 trace(vec3 from, vec3 direction) {\n\tfloat totalDistance = 0.0;\n    int nsteps;\n    bool hit = false;\n\tfor (int steps = 0; steps < MaximumRaySteps; steps++) {\n        nsteps = steps;\n\t\tvec3 p = from + totalDistance * direction;\n\t\tfloat distance = dist(p);\n\t\ttotalDistance += distance;\n        if (distance < MinimumDistance) \n        {\n            hit = true;\n            break;\n        }\n    }\n\treturn vec3(totalDistance, 1.0-float(nsteps)/float(MaximumRaySteps), hit ? 1.0 : 0.0);\n}\n\nfloat derel(float f) {\n    return f + 1.0 / 2.0;\n}\n\nvoid main() {\n\n    float losx = (gl_FragCoord.x / WindowSize.x) * 2.0 - 1.0;\n    float losy = (gl_FragCoord.y / WindowSize.y) * 2.0 - 1.0;\n    vec3 losFwd = normalize(vec3(losx, losy, 1));\n    vec3 dir = qTransform(cam_orient, vec4(losFwd.x, losFwd.y, losFwd.z, 0)).xyz;\n\n    vec3 colis = trace(cam_pos, dir);\n\n    if(colis.z == 0.0)\n    {\n        gl_FragColor = vec4(0, 0, 0, 1.0);\n    }\n    else\n    {\n        vec3 pos = cam_pos + colis.x * dir;\n        vec3 dlight = 1.0 - amblight;\n        vec3 n = normalize(vec3(\n            dist(pos+xdir*nscale)-dist(pos-xdir*nscale),\n            dist(pos+ydir*nscale)-dist(pos-ydir*nscale),\n            dist(pos+zdir*nscale)-dist(pos-zdir*nscale)\n        ));\n\n        vec3 lightCastSrc = pos + n * MinimumDistance * 2.0;\n        vec3 lcolis = trace(lightCastSrc, normalize(lightsrc - lightCastSrc));\n\n        float shadow = 1.0 - lcolis.z;\n        shadow = min(shadow + shadowLightness, 1.0);\n\n        float normalLightAmt = clamp(dot(n, lightdir), 0.0, 1.0);\n                        \n        float fog = 1.0 - min(1.0, colis.x / MaxFogDist);\n        float cplx = colis.y;\n\n        vec3 color = (amblight + (1.0 - amblight) * normlight * normalLightAmt * (1.0 - ambocc + ambocc * colis.y)) * fog * shadow;\n        gl_FragColor = vec4(color.x, color.y, color.z, 1.0);\n    }\n}\n`,y={x:0,y:0,z:-2};let f,g=0,v=new m(1,0,0,0);const w=[["w",new u.a(0,0,1)],["a",new u.a(-1,0,0)],["s",new u.a(0,0,-1)],["d",new u.a(1,0,0)],["q",new u.a(0,1,0)],["z",new u.a(0,-1,0)]],x=-Math.PI/120,z=[["ArrowUp",new u.a(1,0,0)],["ArrowDown",new u.a(-1,0,0)],["ArrowLeft",new u.a(0,1,0)],["ArrowRight",new u.a(0,-1,0)]];function b(){const t=document.getElementById("canvas");Object(i.b)(t,800,600);const n=t.getContext("webgl");if(null===n)return void alert("Unable to initialize WebGL. Your browser may not support it.");n.clearColor(0,0,0,1),n.clear(n.COLOR_BUFFER_BIT);const e=function(t,n,e){const s=S(t,t.VERTEX_SHADER,n),i=S(t,t.FRAGMENT_SHADER,e),r=t.createProgram();if(t.attachShader(r,s),t.attachShader(r,i),t.linkProgram(r),!t.getProgramParameter(r,t.LINK_STATUS))return void alert("Unable to initialize the shader program: "+t.getProgramInfoLog(r));return r}(n,"\nattribute vec4 aVertexPosition;\nvoid main() {\n  gl_Position = aVertexPosition;\n}\n",d),s=function(t){const n=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,n);return t.bufferData(t.ARRAY_BUFFER,new Float32Array([-1,1,1,1,-1,-1,1,-1]),t.STATIC_DRAW),{position:n}}(n);$(n,e,s,t),f=new h.a(document.body,!1),function t(n,e,s,i){f.update();let r=!1;for(const[t,n]of w)if(f.isKeyDown(t)){const t=f.isKeyDown("Shift")?.05:.005,e=v.applyTransform(n);y.x+=e.x*t,y.y+=e.y*t,y.z+=e.z*t,r=!0}for(const[t,n]of z)f.isKeyDown(t)&&(v=m.multiply(v,m.axisRotation(n,x)));$(n,e,s,i),requestAnimationFrame(()=>t(n,e,s,i))}(n,e,s,t)}function $(t,n,e,s){t.clearColor(0,0,0,1),t.clearDepth(1),t.enable(t.DEPTH_TEST),t.depthFunc(t.LEQUAL),t.clear(t.COLOR_BUFFER_BIT|t.DEPTH_BUFFER_BIT);{const s=2,i=t.FLOAT,r=!1,o=0,a=0;t.bindBuffer(t.ARRAY_BUFFER,e.position),t.vertexAttribPointer(t.getAttribLocation(n,"aVertexPosition"),s,i,r,o,a),t.enableVertexAttribArray(t.getAttribLocation(n,"aVertexPosition"))}t.useProgram(n),t.uniform2fv(t.getUniformLocation(n,"WindowSize"),[s.width,s.height]),t.uniform3fv(t.getUniformLocation(n,"cam_pos"),[y.x,y.y,y.z]),t.uniform4fv(t.getUniformLocation(n,"cam_orient"),[v.i,v.j,v.k,v.real]),t.uniform1f(t.getUniformLocation(n,"t"),g),g+=1;{const n=0,e=4;t.drawArrays(t.TRIANGLE_STRIP,n,e)}}function S(t,n,e){const s=t.createShader(n);return t.shaderSource(s,e),t.compileShader(s),t.getShaderParameter(s,t.COMPILE_STATUS)?s:(alert("An error occurred compiling the shaders: "+t.getShaderInfoLog(s)),void t.deleteShader(s))}function A(){return s.useEffect(()=>b()),s.createElement("div",{className:"conway conway_body full_body"},s.createElement("canvas",{id:"canvas"}))}}}]);
//# sourceMappingURL=13.bundle.js.map