import * as React from 'react';

const DndMech2Component = React.lazy(() => import('./DndMech2Component'));

export function DndMech2Wrapper() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <DndMech2Component></DndMech2Component>
    </React.Suspense>;
}
