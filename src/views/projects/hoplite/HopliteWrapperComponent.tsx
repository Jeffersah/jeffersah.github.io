import * as React from 'react';

const Component = React.lazy(() => import(
    /* webpackChunkName: "hoplite" */
    /* webpackMode: "lazy" */
    './HopliteComponent'));

export function HopliteWrapperComponent() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <Component></Component>
    </React.Suspense>;
}
