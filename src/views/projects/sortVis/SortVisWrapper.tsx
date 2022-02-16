import * as React from 'react';

const SortVisComponent = React.lazy(() => import(
    /* webpackChunkName: "sortVis" */
    /* webpackMode: "lazy" */
    './SortVisComponent'));

export function SortVisWrapper() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <SortVisComponent></SortVisComponent>
    </React.Suspense>
}