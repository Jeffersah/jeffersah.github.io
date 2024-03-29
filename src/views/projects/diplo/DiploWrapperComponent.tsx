import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function DiploWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import(
        /* webpackChunkName: "diplo" */
        /* webpackMode: "lazy" */
        './DiploComponent')} />
}