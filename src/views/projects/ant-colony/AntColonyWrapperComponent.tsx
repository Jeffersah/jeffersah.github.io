import * as React from 'react';

const Component = React.lazy(() => import(
    /* webpackChunkName: "ant_colony" */
    /* webpackMode: "lazy" */
    './AntColonyComponent'));

export function AntColonyWrapperComponent() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <Component></Component>
    </React.Suspense>;
}
