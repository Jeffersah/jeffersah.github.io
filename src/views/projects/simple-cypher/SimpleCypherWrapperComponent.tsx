import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function SimpleCypherWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import(
        /* webpackChunkName: "simple_cypher" */
        /* webpackMode: "lazy" */
        './SimpleCypherComponent')} />
}