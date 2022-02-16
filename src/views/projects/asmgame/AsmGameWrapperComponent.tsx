import * as React from 'react';
import LazyLoadWrapperComponent from '../../common/LazyLoadWrapperComponent';

export default function AsmGameWrapperComponent() {
    return <LazyLoadWrapperComponent factory={() => import(
        /* webpackChunkName: "asm_game" */
        /* webpackMode: "lazy" */
        './AsmGameComponent')} />
}