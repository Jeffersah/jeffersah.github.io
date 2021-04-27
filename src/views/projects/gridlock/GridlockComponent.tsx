import * as React from 'react';
import Runner from '../../../projects/gridlock/Runner';
import levelJson from '../../../projects/gridlock/assets/leveldata/levels.json';
import previewUrl  from '../../../projects/gridlock/assets/gridlock_preview.png';
import ILevelData from "../../../projects/gridlock/ILevelData";
import useLoader from '../../../hooks/useLoader';
import { SpriteSheet } from '../../../projects/common/assets/SpriteSheet';
import GridlockLevelPreviewComponent, { PREVIEW_TILE_SIZE } from './GridlockLevelPreviewComponent';

export default function GridlockComponent() {
    const ref = React.useRef<HTMLCanvasElement>();
    const previewImage = useLoader(onFinish => new SpriteSheet(PREVIEW_TILE_SIZE, PREVIEW_TILE_SIZE, previewUrl, onFinish), []);
    const [runner, setRunner] = React.useState<Runner>(undefined);
    const [showLevels, setShowLevels] = React.useState<boolean>(false);
    
    React.useEffect(()=>{
        if(ref.current === undefined) return;

        const runner = new Runner(ref.current);
        setRunner(runner);
        runner.start();
        return ()=>runner.stop();
    }, [ref.current, previewImage]);

    if(previewImage === undefined) {
        return <div>Loading...</div>;
    }

    return <div className='flex row'>
        <canvas ref={ref} />
        <div className='flex col'>
            <button onClick={ev => {
                if(runner) {
                    runner.toggleRunning();
                }
            }}>Start/Reset</button>
            
            <button onClick={() => setShowLevels(!showLevels)}>{showLevels ? 'Hide Level Select' : 'Show Level Select'}</button>
            {showLevels ? levelJson.map(level => 
                <GridlockLevelPreviewComponent key={level.id} level={level} previewSheet={previewImage} onClick={(ev) => {
                    runner?.loadLevel(level);
                    ev.preventDefault();
                    ev.stopImmediatePropagation();
                }} />) : <></>}
        </div>
    </div>;
}
