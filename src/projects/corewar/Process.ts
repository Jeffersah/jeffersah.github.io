import Queue from '../common/data/queue';

export class Process {
    pspace: number[];
    processQueue: Queue<number>;

    constructor(startLocation: number, lastResult: number, pSpaceSize: number) {
        this.processQueue = new Queue([startLocation]);
        this.initPSpace(lastResult, pSpaceSize);
    }

    private initPSpace(result: number, pLength: number) {
        if (pLength !== 0) {
            this.pspace = new Array(pLength);
            for (let i = 1; i < this.pspace.length; i++) {
                this.pspace[i] = 0;
            }
            this.pspace[0] = result;
        }
    }
}