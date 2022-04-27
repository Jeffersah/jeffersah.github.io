import * as React from 'react';

const WaveCollapse2Component = React.lazy(() => import(
    /* webpackChunkName: "wave-collapse" */
    /* webpackMode: "lazy" */
    './WaveCollapse2Component'));

export default function WaveCollapse2ComponentWrapper() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <WaveCollapse2Component></WaveCollapse2Component>
    </React.Suspense>;
}
