
import { MandelbrotComponent } from './mandelbrot/MandelbrotComponent';
import { TileBlendTest1Component } from './tile-blend-test-1/TileBlendTest1Component';
import { SpellTestComponent } from './spell-test/SpellTestComponent';
import { QTreeConwayComponent } from './qtree-conway/QTreeConwayComponent';
import { RpgTestComponent } from './rpgt/RpgTest';
import { DndMechComponent } from './dndmech/DndMechComponent';
import { SignalrTestComponent } from './signalr-test/SignalrTestComponent';

export interface IProject {
    projectName: string;
    projectTitle: string;
    subCategory?: string;
    projectComponent: React.ComponentType<{}>;
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
    },

    // {
    //     projectName: 'qtree-conway',
    //     projectTitle: 'QTree Conway',
    //     projectComponent: QTreeConwayComponent
    // },

    {
        projectName: 'rpgt',
        projectTitle: 'Rpg Test',
        projectComponent: RpgTestComponent
    },

    {
        projectName: 'dndmech',
        projectTitle: 'D&D Mech',
        projectComponent: DndMechComponent
    },

    {
        projectName: 'signalr-test',
        projectTitle: 'SignalR Test',
        subCategory: 'Test',
        projectComponent: SignalrTestComponent
    }
];