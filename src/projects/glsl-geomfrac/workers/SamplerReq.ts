
export interface ISamplerRequest {
    from: [number, number, number];
    to: [number, number, number];
    resolution: number;
    fractalName: string;
    sampleFloor?: number;
}

export interface ISamplerResponse {
    /// 4 elements per sample, [x, y, z, depth]
    data: Float32Array;
    resolution: number;
}