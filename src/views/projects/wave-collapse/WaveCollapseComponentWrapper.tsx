import * as React from 'react';

const WaveCollapseComponent = React.lazy(() => import(
    /* webpackChunkName: "raymarch" */
    /* webpackMode: "lazy" */
    './WaveCollapseComponent'));

export default function WaveCollapseComponentWrapper() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <WaveCollapseComponent></WaveCollapseComponent>
    </React.Suspense>;
}
