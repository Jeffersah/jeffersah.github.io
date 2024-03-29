import * as React from 'react';

export function TechRenderComponent() {
    React.useEffect(() => {
        import(
            /* webpackChunkName: "tech_render" */
            /* webpackMode: "lazy" */
            '../../../projects/tech-render').then(({ default: Run }) => {
            Run();
        });
    }, []);
    return <div className='full_body center'>
        <canvas id='canvas'></canvas>
    </div>;
}