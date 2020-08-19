import * as React from 'react';

const RaymarchComponent = React.lazy(() => import('./RaymarchComponent'));

export default function RaymarchComponentWrapper() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <RaymarchComponent></RaymarchComponent>
    </React.Suspense>;
}
