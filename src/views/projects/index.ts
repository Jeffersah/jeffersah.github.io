
import { MandelbrotComponent } from './mandelbrot/MandelbrotComponent';
import { TileBlendTest1Component } from './tile-blend-test-1/TileBlendTest1Component';
import { SpellTestComponent } from './spell-test/SpellTestComponent';
import { RpgTestComponent } from './rpgt/RpgTest';
import { DndMechComponent } from './dndmech/DndMechComponent';
import { SignalrTestComponent } from './signalr-test/SignalrTestComponent';
import { DndMech2Wrapper } from './dndmech2/DndMech2Wrapper';
import { TechRenderComponent } from './tech-render/TechRenderComponent';
import BulletsComponent from './bullets/BulletsComponent';
import { SortVisWrapper } from './sortVis/SortVisWrapper';
import { CoreWarComponent } from './corewar/CoreWarComponent';
import RaymarchComponentWrapper from './raymarch/RaymarchComponentWrapper';
import { RpgTextEngineComponent } from './rpg-text-engine/RpgTextEngineComponent';
import Chess3dComponent from './chess3d/Chess3dComponent';
import { SpriteComponent } from './sprite/SpriteComponent';
import { GravitationComponent } from './gravitation/GravitationComponent';
import FibvisComponentWrapper from './fibvis/FibvisComponentWrapper';
import AntColonyComponent from './ant-colony/AntColonyComponent';
import { AntColonyWrapperComponent } from './ant-colony/AntColonyWrapperComponent';

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
        projectName: 'fibvis',
        projectTitle: 'Fibonacci Vis',
        projectComponent: FibvisComponentWrapper
    },

    {
        projectName: 'dndmech2',
        projectTitle: 'D&D Mech 2',
        projectComponent: DndMech2Wrapper
    },

    {
        projectName: 'bullets',
        projectTitle: 'Bullets!',
        projectComponent: BulletsComponent,
        subCategory: 'Maybe some day'
    },

    {
        projectName: 'sortvis',
        projectTitle: 'Sort Visualizer',
        projectComponent: SortVisWrapper
    },

    
    {
        projectName: 'gravitation',
        projectTitle: 'Gravitation',
        projectComponent: GravitationComponent
    },

    {
        projectName: 'corewar',
        projectTitle: 'Core War',
        projectComponent: CoreWarComponent,
        subCategory: 'Maybe some day'
    },

    {
        projectName: 'chess3d',
        projectTitle: '3D Chess',
        projectComponent: Chess3dComponent
    },

    {
        projectName: 'signalr-test',
        projectTitle: 'SignalR Test',
        subCategory: 'Test',
        projectComponent: SignalrTestComponent
    },

    {
        projectName: 'tech-render',
        projectTitle: 'Tech Render Test',
        subCategory: 'Test',
        projectComponent: TechRenderComponent
    },

    {
        projectName: 'raymarch',
        projectTitle: 'Raymarch/GLSL',
        subCategory: 'Test',
        projectComponent: RaymarchComponentWrapper
    },

    {
        projectName: 'rpg-text-engine',
        projectTitle: 'RpgTextEngine',
        subCategory: 'Test',
        projectComponent: RpgTextEngineComponent
    },
    
    {
        projectName: 'sprite',
        projectTitle: 'Sprite Editor',
        projectComponent: SpriteComponent,
        subCategory: 'Maybe some day'
    },

    {
        projectName: 'ant-colony',
        projectTitle: 'Ant Colony Optimization',
        projectComponent: AntColonyWrapperComponent
    }
];