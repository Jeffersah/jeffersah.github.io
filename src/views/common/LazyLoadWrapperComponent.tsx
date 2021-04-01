import * as React from 'react';


export default function LazyLoadWrapperComponent(props: { factory: () => Promise<{ default: React.ComponentType<any> }>}) {
    const LazyComponent = React.lazy(props.factory);
    return <React.Suspense fallback={<div>loading...</div>}>
        <LazyComponent />
    </React.Suspense>;
}
