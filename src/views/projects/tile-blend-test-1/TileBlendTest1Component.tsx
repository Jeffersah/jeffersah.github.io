import * as React from 'react';

export function TileBlendTest1Component() {
    React.useEffect(() => {
        import(
            /* webpackChunkName: "tile_blend_test_1" */
            /* webpackMode: "lazy" */
            '../../../projects/tile-blend-test-1').then(({ default: Run }) => {
            Run();
        });
    }, []);
    return <div className='full_body center'>
        <canvas id='canvas'></canvas>
    </div>;
}