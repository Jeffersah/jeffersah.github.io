import * as React from 'react';

const Component = React.lazy(() => import(
    /* webpackChunkName: "gridlock" */
    /* webpackMode: "lazy" */
    './GridlockComponent'));

export function GridlockWrapperComponent() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <Component></Component>
    </React.Suspense>;
}
