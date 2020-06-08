
import { MandelbrotComponent } from './mandelbrot/MandelbrotComponent';
import { TileBlendTest1Component } from './tile-blend-test-1/TileBlendTest1Component';
import { SpellTestComponent } from './spell-test/SpellTestComponent';

export interface IProject {
    projectName: string;
    projectTitle: string;
    projectComponent: () => JSX.Element;
}

// tslint:disable-next-line: variable-name
export const AllProjects: IProject[] = [
    {
        projectName: 'mandelbrot',
        projectTitle: 'Mandelbrot',
        projectComponent: MandelbrotComponent
    },

    {
        projectName: 'tile-blend-test-1',
        projectTitle: 'Tile Blending Test 1',
        projectComponent: TileBlendTest1Component
    },

    {
        projectName: 'spell-test',
        projectTitle: 'Spell Test',
        projectComponent: SpellTestComponent
    }
];