import DreamcatcherVisualizer from "./DreamcatcherVisualizer"
import RelativeWalkVisualizer from "./RelativeWalkVisualizer"
import SquareWalkVisualizer from "./SquareWalkVisualizer"
import VisualizerDef from "./VisualizerDef"
import WalkVisualizer from "./WalkVisualizer"

export const Visualizers: VisualizerDef[] = [
    new VisualizerDef('Dreamcatcher', (m, s) => new DreamcatcherVisualizer(m, s)),
    new VisualizerDef('Angle Walk (Absolute)', (m, s) => new WalkVisualizer(m, s)),
    new VisualizerDef('Angle Walk (Relative)', (m, s) => new RelativeWalkVisualizer(m, s)),
    new VisualizerDef('Square Walk', (m, s) => new SquareWalkVisualizer(m, s)),
]