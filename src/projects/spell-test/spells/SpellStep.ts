import { SpellGroup } from './SpellGroup';
import { EArrow, ERepeat } from '../EArrow';

export class SpellStep {
    constructor(public spell: SpellGroup, public index: number) {

    }

    public static FirstSteps(group: SpellGroup): SpellStep[] {
        return new SpellStep(group, -1).NextSteps();
    }

    public ArrowHere(): EArrow {
        return this.spell.content[this.index] as EArrow;
    }

    public NextSteps(): SpellStep[] {
        const nextIndex = this.index + 1;
        if (nextIndex >= this.spell.content.length) {
            // This is a step-out
            if (this.spell.parent === undefined) return [];
            // Step out and forward
            const parentNextSteps = new SpellStep(this.spell.parent.parent, this.spell.parent.parentIndex).NextSteps();
            if (this.spell.repeatType === ERepeat.Repeatable) {
                const firsts = SpellStep.FirstSteps(this.spell);
                parentNextSteps.splice(parentNextSteps.length, 0, ...firsts);
            }
            return parentNextSteps;
        }
        else {
            // If the next spot is an arrow, return just it
            if (SpellGroup.isArrow(this.spell.content[nextIndex])) {
                return [ new SpellStep(this.spell, nextIndex) ];
            }
            else {
                const group = this.spell.content[nextIndex] as SpellGroup;
                const stepInto = SpellStep.FirstSteps(group);
                if (group.repeatType === ERepeat.Optional) {
                    // see if we can step-over
                    const stepOver = new SpellStep(this.spell, this.index + 1).NextSteps();
                    stepInto.splice(stepInto.length, 0, ...stepOver);
                }
                return stepInto;
            }
        }
    }

    public Equals(other: SpellStep) {
        return this.spell === other.spell && this.index === other.index;
    }
}