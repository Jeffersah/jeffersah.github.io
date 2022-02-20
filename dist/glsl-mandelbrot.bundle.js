"use strict";(self.webpackChunktrading_game=self.webpackChunktrading_game||[]).push([[79],{3130:(e,t,n)=>{function r(e,t,n){const r=e.createShader(t);return e.shaderSource(r,n),e.compileShader(r),e.getShaderParameter(r,e.COMPILE_STATUS)?r:(console.error(n),alert(`An error occurred compiling the ${t===e.VERTEX_SHADER?"vertex":t===e.FRAGMENT_SHADER?"fragment":""} shaders: `+e.getShaderInfoLog(r)),void e.deleteShader(r))}function o(e,t,n){const o=r(e,e.VERTEX_SHADER,t),a=r(e,e.FRAGMENT_SHADER,n),i=e.createProgram();if(e.attachShader(i,o),e.attachShader(i,a),e.linkProgram(i),e.getProgramParameter(i,e.LINK_STATUS))return i;alert("Unable to initialize the shader program: "+e.getProgramInfoLog(i))}function a(e,t,n,r,o,a,i,s){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);{const o=e.FLOAT,a=!1,i=0,s=0;e.bindBuffer(e.ARRAY_BUFFER,n),e.vertexAttribPointer(e.getAttribLocation(t,"aVertexPosition"),r,o,a,i,s),e.enableVertexAttribArray(e.getAttribLocation(t,"aVertexPosition"))}e.useProgram(t);for(let t=0;t<a;t++){s(e,t);let{bufferOffset:n,bufferCount:r}=i(t);e.drawArrays("triangle"===o?e.TRIANGLES:"tristrip"===o?e.TRIANGLE_STRIP:e.TRIANGLE_FAN,n,r)}}function i(e,t,n,r){e.clearColor(0,0,0,1),e.clearDepth(1),e.enable(e.DEPTH_TEST),e.depthFunc(e.LEQUAL),e.clear(e.COLOR_BUFFER_BIT|e.DEPTH_BUFFER_BIT);{const r=2,o=e.FLOAT,a=!1,i=0,s=0;e.bindBuffer(e.ARRAY_BUFFER,n),e.vertexAttribPointer(e.getAttribLocation(t,"aVertexPosition"),r,o,a,i,s),e.enableVertexAttribArray(e.getAttribLocation(t,"aVertexPosition"))}e.useProgram(t),r(e),e.drawArrays(e.TRIANGLE_STRIP,0,4)}function s(e,t,n,r,o){const a=e.createBuffer();e.bindBuffer(e.ARRAY_BUFFER,a);const i=null!=t?t:-1,s=null!=r?r:1,c=null!=n?n:-1,l=null!=o?o:1,h=[l,s,c,s,l,i,c,i];return e.bufferData(e.ARRAY_BUFFER,new Float32Array(h),e.STATIC_DRAW),a}function c(e,t){const n=e.createBuffer();return e.bindBuffer(e.ARRAY_BUFFER,n),e.bufferData(e.ARRAY_BUFFER,new Float32Array(t),e.STATIC_DRAW),n}n.d(t,{nr:()=>o,f:()=>a,os:()=>i,nW:()=>s,jK:()=>c,B_:()=>l,FC:()=>h});const l="attribute vec4 aVertexPosition;\nvarying vec3 vPos;\nvoid main() {\n  vPos = vec3(aVertexPosition.xy, 0.0);\n  gl_Position = aVertexPosition;\n}",h="#version 300 es\nin vec4 aVertexPosition;\nout vec3 vPos;\nvoid main() {\n  vPos = vec3(aVertexPosition.xy, 0.0);\n  gl_Position = aVertexPosition;\n}"},7586:(e,t,n)=>{n.r(t),n.d(t,{default:()=>f});var r=n(7363),o=n(3123),a=n(3130),i=n(5901),s=n(8785);class c{constructor(e,t,n){this.canvas=e,this.fragment_code=t,this.onMiddleClick=n,(0,i.f5)(e,1200,600),this.cursor_anchor=null,this.mm_down=!1,this.gl=e.getContext("webgl"),this.touch_anchors={},this.canvasRange=new o.gS(new o.e6(0,1200),new o.e6(0,600)),this.windowRange=new o.gS(new o.e6(-1,1),new o.e6(-1,e.height/e.width)),this.init()}init(){this.gl.clearColor(0,0,0,1),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.initProgram()}initProgram(){this.program=a.nr(this.gl,a.B_,this.fragment_code),this.buffer=a.nW(this.gl)}run(){this.renderFrame(),this.canvas.addEventListener("mousedown",(e=>{if(0===e.button)this.cursor_anchor=new s.Z(e.offsetX,e.offsetY);else if(1===e.button){this.mm_down=!0;let t=this.canvasRange.GetPercentage(e.offsetX,e.offsetY);t=this.windowRange.GetValue(t.x,1-t.y),void 0!==this.onMiddleClick&&this.onMiddleClick(new s.Z(t.x,t.y))}e.preventDefault()})),this.canvas.addEventListener("mouseup",(e=>{0===e.button?this.cursor_anchor=null:1===e.button&&(this.mm_down=!1),e.preventDefault()})),this.canvas.addEventListener("mousemove",(e=>{if(null!=this.cursor_anchor){const t=e.offsetX-this.cursor_anchor.x,n=e.offsetY-this.cursor_anchor.y;this.panCameraByScreenDelta(new s.Z(t,n)),this.cursor_anchor=new s.Z(e.offsetX,e.offsetY),this.renderFrame(),e.preventDefault()}if(this.mm_down&&void 0!==this.onMiddleClick){let t=this.canvasRange.GetPercentage(e.offsetX,e.offsetY);t=this.windowRange.GetValue(t.x,1-t.y),this.onMiddleClick(new s.Z(t.x,t.y))}})),this.canvas.addEventListener("wheel",(e=>{const t=e.deltaY/3,n=Math.pow(1.1,t),r=this.canvasRange.GetPercentage(e.offsetX,e.offsetY);this.windowRange.AspectScale(n,r.x,1-r.y),this.renderFrame(),e.preventDefault()})),this.canvas.addEventListener("touchstart",(e=>{if(!(e.targetTouches.length>=3||0===e.targetTouches.length)){for(let t=0;t<e.targetTouches.length;t++){const n=e.targetTouches.item(t);this.touch_anchors[n.identifier]=l(n)}e.preventDefault()}})),this.canvas.addEventListener("touchmove",(e=>{if(e.touches.length>=3||0===e.touches.length)return;const t=[];for(let n=0;n<e.targetTouches.length;n++){const r=e.targetTouches.item(n),o=l(r),a=this.touch_anchors[r.identifier];if(void 0===a)return;t.push([a,o]),this.touch_anchors[r.identifier]=o}if(1===t.length)this.panCameraByScreenDelta(s.Z.subtract(t[0][1],t[0][0]));else if(2===t.length){const e=s.Z.multiply(s.Z.add(t[0][0],t[1][0]),.5,.5),n=s.Z.multiply(s.Z.add(t[0][1],t[1][1]),.5,.5),r=this.panCameraByScreenDelta(n.subtractWith(e)),o=s.Z.subtract(t[0][0],t[1][0]).length()/s.Z.subtract(t[0][1],t[1][1]).length();this.windowRange.AspectScale(o,r.x,1-r.y)}this.renderFrame(),e.preventDefault()})),this.canvas.addEventListener("touchend",(e=>{this.touch_anchors={},e.preventDefault()})),this.canvas.addEventListener("touchcancel",(e=>{this.touch_anchors={},e.preventDefault()}))}panCameraByScreenDelta(e){const t=this.canvasRange.GetPercentage(e.x,e.y);return this.windowRange.ShiftByPercentage(-t.x,t.y),t}renderFrame(){a.os(this.gl,this.program,this.buffer,(e=>{e.uniform2fv(e.getUniformLocation(this.program,"window_pos"),[this.windowRange.xRange.min,this.windowRange.yRange.min]),e.uniform2fv(e.getUniformLocation(this.program,"window_size"),[this.windowRange.xRange.Length(),this.windowRange.yRange.Length()])}))}cleanup(){}}function l(e){const t=e.target.getBoundingClientRect();return new s.Z(e.pageX-t.left,e.pageY-t.top)}class h extends c{constructor(e,t){super(e,t),this.setJuliaPoint(new o.Zz(0,0))}setJuliaPoint(e){this.julia_point=new s.Z(e.real,e.imaginary),this.julia_escape=(Math.sqrt(4*e.abs()+1)+1)/2,this.renderFrame()}renderFrame(){a.os(this.gl,this.program,this.buffer,(e=>{e.uniform2fv(e.getUniformLocation(this.program,"window_pos"),[this.windowRange.xRange.min,this.windowRange.yRange.min]),e.uniform2fv(e.getUniformLocation(this.program,"window_size"),[this.windowRange.xRange.Length(),this.windowRange.yRange.Length()]),e.uniform2fv(e.getUniformLocation(this.program,"julia_coord"),[this.julia_point.x,this.julia_point.y]),e.uniform1fv(e.getUniformLocation(this.program,"julia_escape"),[this.julia_escape])}))}}class u{constructor(e,t){this.canvas=e,this.juliaCanvas=t,this.mandelbrot=new c(e,"\nprecision highp float;\nvarying vec3 vPos;\nuniform vec2 window_pos;\nuniform vec2 window_size;\n\nconst int MAX_ITER = 256;\nconst float MAX_ABSSQ = 2.0;\n\nvec2 cplx_mult(vec2 a, vec2 b) {\n    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);\n}\n\nvec2 step_mandelbrot(vec2 v, vec2 c) {\n    return cplx_mult(v, v) + c;\n}\n\nfloat cplx_abssq(vec2 v) {\n    return dot(v, v);\n}\n\nfloat iterate_mandelbrot(vec2 coords) {\n    vec2 roll = coords;\n    for(int iter = 0; iter < MAX_ITER; iter++) {\n        roll = step_mandelbrot(roll, coords);\n        if (cplx_abssq(roll) >= MAX_ABSSQ) {\n            return float(iter)/float(MAX_ITER);\n        }\n    }\n    return 1.0;\n}\n\nvec3 floatToColor(float perc) {\n    if(perc <= 0.5) {\n        return vec3(perc * 2.0, perc, 0.0);\n    }\n    perc = (perc - 0.5) * 2.0;\n    return vec3(1.0, 0.5 + perc / 2.0, perc);\n}\n\nvoid main() {\n    vec2 adjpos = vPos.xy;\n    adjpos += 1.0;\n    adjpos /= 2.0;\n    // adjpos is now 0, 1\n    // Convert that to world-space\n    adjpos = window_pos + adjpos * window_size;\n\n    float mb_perc = iterate_mandelbrot(adjpos);\n    gl_FragColor = vec4(floatToColor(mb_perc), 1.0);\n}",(e=>{this.julia.setJuliaPoint(new o.Zz(e.x,e.y))})),this.julia=new h(t,"\nprecision highp float;\nvarying vec3 vPos;\nuniform vec2 julia_coord;\nuniform float julia_escape;\nuniform vec2 window_pos;\nuniform vec2 window_size;\n\nconst int MAX_ITER = 256;\n\nvec2 cplx_mult(vec2 a, vec2 b) {\n    return vec2(a.x * b.x - a.y * b.y, a.x * b.y + a.y * b.x);\n}\n\nvec2 step_julia(vec2 v) {\n    return cplx_mult(v, v) + julia_coord;\n}\n\nfloat cplx_abssq(vec2 v) {\n    return dot(v, v);\n}\n\nfloat iterate_julia(vec2 coords) {\n    vec2 roll = coords;\n    for(int iter = 0; iter < MAX_ITER; iter++) {\n        roll = step_julia(roll);\n        if (cplx_abssq(roll) >= julia_escape) {\n            return float(iter)/float(MAX_ITER);\n        }\n    }\n    return 1.0;\n}\n\nvec3 floatToColor(float perc) {\n    if(perc <= 0.5) {\n        return vec3(perc * 2.0, perc, 0.0);\n    }\n    perc = (perc - 0.5) * 2.0;\n    return vec3(1.0, 0.5 + perc / 2.0, perc);\n}\n\nvoid main() {\n    vec2 adjpos = vPos.xy;\n    adjpos += 1.0;\n    adjpos /= 2.0;\n    // adjpos is now 0, 1\n    // Convert that to world-space\n    adjpos = window_pos + adjpos * window_size;\n\n    float mb_perc = iterate_julia(adjpos);\n    gl_FragColor = vec4(floatToColor(mb_perc), 1.0);\n}"),this.mandelbrot.run(),this.julia.run()}cleanup(){this.mandelbrot.cleanup(),this.julia.cleanup()}}function f(){const e=r.useRef(),t=r.useRef();return r.useEffect((()=>{const n=new u(e.current,t.current);return()=>n.cleanup()}),[e]),r.createElement("div",{className:"conway conway_body full_body"},r.createElement("canvas",{id:"canvas",ref:e}),r.createElement("canvas",{id:"jcanvas",ref:t}))}}}]);
//# sourceMappingURL=glsl-mandelbrot.bundle.js.map