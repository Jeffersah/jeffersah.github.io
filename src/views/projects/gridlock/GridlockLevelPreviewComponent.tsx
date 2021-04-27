import * as React from 'react';
import { SpriteSheet } from "../../../projects/common/assets/SpriteSheet";
import { ResizeCanvas } from '../../../projects/common/CanvasHelpers';
import { ATLAS_WIDTH } from '../../../projects/gridlock/Constants';
import ILevelData from "../../../projects/gridlock/ILevelData";

export const PREVIEW_TILE_SIZE = 16;

export default function GridlockLevelPreviewComponent(props: { level: ILevelData, previewSheet: SpriteSheet, onClick?: (ev: MouseEvent) => void}) {
    const ref = React.useRef<HTMLCanvasElement>();

    React.useEffect(() => {
        if(ref.current === undefined || props.previewSheet === undefined) return;
        ResizeCanvas(ref.current, PREVIEW_TILE_SIZE * props.level.width, PREVIEW_TILE_SIZE * props.level.height);
        const ctx = ref.current.getContext('2d');
        ctx.clearRect(0, 0, PREVIEW_TILE_SIZE * props.level.width, PREVIEW_TILE_SIZE * props.level.height);
        let mapDataIndex = 0;
        for(var dy = 0; dy < props.level.height; dy++) {
            for(var dx = 0; dx < props.level.width; dx++) {
                const mapData = props.level.mapdata[mapDataIndex++];
                const atlasX = Math.floor(mapData % ATLAS_WIDTH);
                const atlasY = Math.floor(mapData / ATLAS_WIDTH);

                props.previewSheet.render(ctx, PREVIEW_TILE_SIZE * dx, PREVIEW_TILE_SIZE * dy, PREVIEW_TILE_SIZE, PREVIEW_TILE_SIZE, atlasX, atlasY);
            }
        }
    }, [ref.current])

    return <div className='flex row align-center' style={{border: '1px solid black', padding: '0 0 0 8px'}} onClick={ev => props.onClick(ev.nativeEvent)}>
        <span>{props.level.id}: {props.level.name}</span>
        <canvas ref={ref} />
    </div>;
}