import IGenerator from "./IGenerator";

export default class FibonacciPlusOneGenerator implements IGenerator {
    public name:string;
    constructor() {
        this.name = "Fibonacci +1";
    }

    generateSeries(seed: number[], mod: number): number[] {
        let result = [];
        for(let i = 0; i < seed.length; i++)
        {
            result.push(seed[i] % mod);
            seed[i] %= mod;
        }

        let validateSeed = true;
        for(let i = 0; i < result.length - 2; i++)
        {
            if((seed[i] + seed[i+1] + 1) % mod !== seed[i+2]) {
                validateSeed = false;
            }
        }

        // If the provided seed isn't valid following fibonacci rules, it'll never ENTIRELY loop, so we just look for when we get caught in ANY loop.
        const search = validateSeed ? seed : seed.slice(seed.length - 2, seed.length);

        do {
            result.push((result[result.length - 1] + result[result.length - 2] + 1) % mod);
        } while(!this.hasLooped(result, search));

        result.splice(result.length - search.length + 1, search.length - 1);
        return result;
    }
    
    hasLooped(seq: number[], search: number[]): boolean
    {
        var seqStart = seq.length - search.length;
        for(let i = 0; i < search.length; i++) {
            if(seq[i + seqStart] !== search[i]) return false;
        }
        return true;
    }
}