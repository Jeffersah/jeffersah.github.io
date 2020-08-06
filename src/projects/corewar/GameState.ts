import ICoreSettings from './ICoreSettings';
import Program from './Program';
import CoreState from './CoreState';
import Queue from '../common/data/queue';
import { Process } from './Process';
import Instruction from './Instruction';
import AllImplementers from './Instructions';

export default class GameState {
    core: CoreState;
    processes: Queue<Process>;

    constructor(public settings: ICoreSettings, progA: Program, progB: Program) {
        this.core = new CoreState(settings);
        this.processes = new Queue<Process>();
        this.core.init(progA, 0);
        this.processes.push(new Process(progA.startOffset, -1, settings.pSpaceSize));

        const progBStart = Math.floor(Math.random() * (settings.coreLength - settings.programMaxLength * 2)) + settings.coreLength;
        this.core.init(progB, progBStart);
        this.processes.push(new Process(progBStart + progB.startOffset, -1, settings.pSpaceSize));
    }

    tick() {
        const executing = this.processes.pop();
        const index = executing.processQueue.pop();
        const instr = this.core.get(index);

        const pushToQueue = AllImplementers[instr.instr](executing, this.core, index, instr);
        for (const nextStep of pushToQueue) {
            executing.processQueue.push(nextStep);
        }

        this.processes.push(executing);
    }
}