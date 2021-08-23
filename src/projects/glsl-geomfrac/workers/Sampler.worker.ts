import ALL_FRACTALS from "../Fractals";
import { IFractal } from "../Fractals/IFractal";
import Complex3d, { dot } from "../geom/Complex3d";
import { ISamplerRequest, ISamplerResponse } from "./SamplerReq";

const ctx: Worker = self as any;

ctx.addEventListener('message', e => {
    const req = e.data as ISamplerRequest;
    console.log('Beginning sampler req for ' + req.fractalName);
    const fractal = ALL_FRACTALS.find(f => f.Name === req.fractalName);
    let result = [];

    let size = req.from.map((v, i) => req.to[i] - v);

    for (let dx = 0; dx < req.resolution; dx++) {
        for (let dy = 0; dy < req.resolution; dy++) {
            for (let dz = 0; dz < req.resolution; dz++) {
                const x = req.from[0] + dx * size[0] / req.resolution;
                const y = req.from[1] + dy * size[1] / req.resolution;
                const z = req.from[2] + dz * size[2] / req.resolution;
                const sample = Sample(fractal, x, y, z, 100);
                if(sample < req.sampleFloor ?? 0) continue;
                result.push(...[x, y, z, Sample(fractal, x, y, z, 100)]);
            }
        }
    }

    console.log('Done sampler req');
    const response: ISamplerResponse = {
        data: new Float32Array(result),
        resolution: req.resolution
    };
    ctx.postMessage(response);
});

function Sample(fractal: IFractal, xc: number, yc: number, zc: number, maxDepth: number) {
    let z: Complex3d = [0, 0, 0, 0];
    let c: Complex3d = [xc, -yc, zc, 0];
    for(let iter = 0; iter <= maxDepth; iter++){
        if(dot(z, z) > fractal.MaxAmplitude)
            return (iter-1) / maxDepth;
        z = fractal.Iterate(z, c);
    }
    return 1;
}