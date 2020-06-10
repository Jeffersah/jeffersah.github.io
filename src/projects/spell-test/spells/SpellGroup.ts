import { EArrow, ERepeat } from '../EArrow';
import { ISpellGroupParent } from './SpellGroupParent';

export class SpellGroup {

    content: (EArrow | SpellGroup)[];
    repeatType: ERepeat;
    parent: ISpellGroupParent | undefined;
    gid: number;

    static Parse(str: string): SpellGroup {
        return new SpellGroup(new GidTracker(), str.split('').reverse(), undefined);
    }

    constructor(gids: GidTracker, data: EArrow, repeat: ERepeat, parent: ISpellGroupParent | undefined);
    constructor(gids: GidTracker, spellData: string[], parent: ISpellGroupParent | undefined);
    constructor(gids: GidTracker, spellData: string[]|EArrow, repeat: ERepeat|ISpellGroupParent|undefined, parent?: ISpellGroupParent|undefined) {
        this.gid = gids.Increment();
        if ((spellData as any).length === undefined) {
            this.content = [spellData as EArrow];
            this.repeatType = repeat as ERepeat;
            this.parent = parent;
        }
        else {
            spellData = spellData as string[];
            this.repeatType = ERepeat.None;
            this.content = [];
            this.parent = repeat as ISpellGroupParent | undefined;

            while (spellData.length > 0) {
                const next = spellData.pop();
                switch (next) {
                    // Push an arrow
                    case 'u': this.content.push(EArrow.Up); break;
                    case 'd': this.content.push(EArrow.Down); break;
                    case 'l': this.content.push(EArrow.Left); break;
                    case 'r': this.content.push(EArrow.Right); break;
                    case 'h': this.content.push(EArrow.LeftRight); break;
                    case 'v': this.content.push(EArrow.UpDown); break;
                    case 'a': this.content.push(EArrow.Any); break;
                    case 's': this.content.push(EArrow.Stop); break;
                    // Push a group OR close the group
                    case '(': this.content.push(new SpellGroup(gids, spellData, { parent: this, parentIndex: this.content.length })); break;
                    case ')': return;
                    // append an optional/repeat to the previous group
                    case '?': this.pushToPrevious(gids, ERepeat.Optional); break;
                    case '+': this.pushToPrevious(gids, ERepeat.Repeatable); break;
                }
            }
        }
    }

    public static isArrow(element: EArrow | SpellGroup): element is EArrow {
        return (element as any).content === undefined;
    }

    private pushToPrevious(gids: GidTracker, rep: ERepeat) {
        if (this.content.length === 0) {
            throw new Error("Can't push repeat group: Spell is empty");
        }
        const lastIndex = this.content.length - 1;
        const lastElement = this.content[lastIndex];
        if (SpellGroup.isArrow(lastElement)) {
            this.content[lastIndex] = new SpellGroup(gids, lastElement, rep, { parent: this, parentIndex: lastIndex });
        }
        else {
            lastElement.repeatType = rep;
        }
    }
}

// tslint:disable-next-line: max-classes-per-file
class GidTracker {
    nextGid: number;
    constructor() {
        this.nextGid = 0;
    }

    Increment(): number {
        return this.nextGid++;
    }
}