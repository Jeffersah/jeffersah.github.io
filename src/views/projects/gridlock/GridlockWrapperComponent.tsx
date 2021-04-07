import * as React from 'react';

const Component = React.lazy(() => import('./GridlockComponent'));

export function GridlockWrapperComponent() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <Component></Component>
    </React.Suspense>;
}
