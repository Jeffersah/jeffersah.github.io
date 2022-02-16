import * as React from 'react';

const ParserComponent = React.lazy(() => import(
    /* webpackChunkName: "lr1_parser" */
    /* webpackMode: "lazy" */
    './Lr1ParserComponent'));

export default function Lr1ParserComponentWrapper() {
    return <React.Suspense fallback={<div>loading...</div>}>
        <ParserComponent></ParserComponent>
    </React.Suspense>;
}
