import fireColor from './FireColor';
import grayscaleColor from './GrayscaleColor';
import hueColor from './HueColor';
import { IColorFunction } from './IColorFunction';
import paperColor from './PaperColor';

const ALL_COLORS:IColorFunction[] = [
    paperColor,
    hueColor,
    grayscaleColor,
    fireColor
];
export default ALL_COLORS;