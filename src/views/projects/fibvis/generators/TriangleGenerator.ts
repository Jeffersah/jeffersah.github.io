import IGenerator from "./IGenerator";

export default class TriangleGenerator implements IGenerator {
    public name:string;
    constructor() {
        this.name = "Triangle";
    }

    generateSeries(seed: number[], mod: number): number[] {
        let result = [];
        for(let i = 0; i < seed.length; i++)
        {
            result.push(seed[i] % mod);
            seed[i] %= mod;
        }

        let validateSeed = true;
        for(let i = 0; i < result.length - 1; i++)
        {
            if((seed[i] + i + 1) % mod !== seed[i+1]) {
                validateSeed = false;
            }
        }

        // If the provided seed isn't valid following triangle rules, it'll (probably?) never ENTIRELY loop, so we just look for when we get caught in ANY loop.
        const search = validateSeed ? seed[0] : seed[seed.length - 1];
        const searchMod = validateSeed ? 0 : (seed.length - 1) % mod;
        // We've looped once we hit the search digit, and the search mod the index mod

        do {
            result.push((result[result.length - 1] + result.length) % mod);
        } while(!this.hasLooped(result, mod, search, searchMod));

        if(validateSeed) {
            result.splice(result.length - seed.length + 1, seed.length - 1);
        }
        return result;
    }
    
    hasLooped(seq: number[], mod: number, search: number, searchMod: number): boolean
    {
        return seq[seq.length - 1] === search && (seq.length - 1)%mod === searchMod;
    }
}