import * as React from 'react';

const WaveCollapseComponent = React.lazy(() => import(
    /* webpackChunkName: "wave-collapse" */
    /* webpackMode: "lazy" */
    './WaveCollapseComponent'));

export default function WaveCollapseComponentWrapper() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <WaveCollapseComponent></WaveCollapseComponent>
    </React.Suspense>;
}
