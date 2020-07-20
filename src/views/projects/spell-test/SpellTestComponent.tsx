import * as React from 'react';

export function SpellTestComponent() {
    React.useEffect(() => {
        import(
            /* webpackChunkName: "spellTest" */
            /* webpackMode: "lazy" */
            '../../../projects/spell-test').then(({ default: Run }) => {
            console.log('Loaded!');
            Run();
        });
    }, []);
    return <div className='full_body center'>
        <canvas id='canvas'></canvas>
    </div>;
}