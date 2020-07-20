import AssetLoader from '../common/assets/AssetLoader';
import { SpriteSheet } from '../common/assets/SpriteSheet';
import arrowsUrl from '../common-assets/arrows.png';
import { ResizeCanvas, NearestNeighborScaling } from '../common/CanvasHelpers';
import { SpellGroup } from './spells/SpellGroup';
import { ERepeat, EArrow, Matches } from './EArrow';
import { SpellStep } from './spells/SpellStep';

const handledKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '];

export default function Run() {
    const assetLoader = new AssetLoader();
    const arrows = new SpriteSheet(16, 16, arrowsUrl, assetLoader.registerAssetLoadCallback());

    assetLoader.onAllFinished(() => Start(arrows));
}

function Start(arrows: SpriteSheet) {

    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    console.log(canvas);
    ResizeCanvas(canvas, 500, 500);

    const ctx = canvas.getContext('2d');
    ctx.scale(2, 2);
    NearestNeighborScaling(ctx);

    const spell = SpellGroup.Parse('ud(lr(lru)?)+as');
    const steps = SpellStep.FirstSteps(spell);

    PrintSpell(spell, arrows, ctx, steps, 0);

    document.addEventListener('keydown', (k) => {
        if (handledKeys.indexOf(k.key) !== -1) {
            AdvanceAndPrint(steps, k.key, spell, arrows, ctx);
            k.preventDefault();
        }
    });
}

function AdvanceAndPrint(currentSteps: SpellStep[], key: string, spell: SpellGroup, arrows: SpriteSheet, ctx: CanvasRenderingContext2D) {
    if (key === ' ') {
        currentSteps.splice(0, currentSteps.length, ...SpellStep.FirstSteps(spell));
    }
    else {
        const pressedArrow = key === 'ArrowUp' ? EArrow.Up : key === 'ArrowDown' ? EArrow.Down : key === 'ArrowLeft' ? EArrow.Left : EArrow.Right;
        const lastLength = currentSteps.length;
        for (let i = currentSteps.length - 1; i >= 0; i--) {
            const step = currentSteps[i];
            if (Matches(pressedArrow, step.ArrowHere())) {
                currentSteps.splice(currentSteps.length, 0, ...step.NextSteps());
            }
        }
        currentSteps.splice(0, lastLength);
    }
    ctx.clearRect(0, 0, 500, 500);
    PrintSpell(spell, arrows, ctx, currentSteps, 0);
}

function PrintSpell(spell: SpellGroup, arrows: SpriteSheet, ctx: CanvasRenderingContext2D, steps: SpellStep[], dx: number): number {
    // Draw parens?
    const drawParens = spell.parent !== undefined && spell.content.length > 1;
    if (drawParens) {
        arrows.renderCustom(ctx, dx, 0, 8, 16, 0, 4, 8, 16);
        dx += 8;
    }

    // Reverse-sort by index
    const selfSteps = steps.filter(s => s.spell === spell).sort((a, b) => b.index - a.index);

    for (const [i, c] of spell.content.entries()) {
        if (SpellGroup.isArrow(c)) {
            arrows.render(ctx, dx, 0, 16, 16, (c as number) % 4, 2 + Math.floor((c as number) / 4));
            if (selfSteps.length > 0 && selfSteps[selfSteps.length - 1].index === i) {
                arrows.render(ctx, dx, 2, 16, 16, 2, 4);
                selfSteps.pop();
            }
            dx += 16;
        }
        else {
            dx = PrintSpell(c, arrows, ctx, steps, dx);
        }
    }

    if (drawParens) {
        arrows.renderCustom(ctx, dx, 0, 8, 16, 1, 4, 8, 16);
        dx += 8;
    }

    if (spell.repeatType === ERepeat.Optional) {
        ctx.drawImage(arrows.image, 16 + 8, 16 * 4, 8, 8, dx, 0, 8, 8);
        dx += 8;
    }
    else if (spell.repeatType === ERepeat.Repeatable) {
        ctx.drawImage(arrows.image, 16, 16 * 4, 8, 8, dx, 0, 8, 8);
        dx += 8;
    }

    return dx;
}