import * as React from 'react';

const Component = React.lazy(() => import(
    /* webpackChunkName: "recurshooter" */
    /* webpackMode: "lazy" */
    './RecursiveShooterComponent'));

export function RecursiveShooterWrapperComponent() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <Component></Component>
    </React.Suspense>;
}
