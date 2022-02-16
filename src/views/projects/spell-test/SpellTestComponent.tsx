import * as React from 'react';

export function SpellTestComponent() {
    React.useEffect(() => {
        import(
            /* webpackChunkName: "spell_test" */
            /* webpackMode: "lazy" */
            '../../../projects/spell-test').then(({ default: Run }) => {
            Run();
        });
    }, []);
    return <div className='full_body center'>
        <canvas id='canvas'></canvas>
    </div>;
}