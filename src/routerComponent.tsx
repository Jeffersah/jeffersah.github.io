import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { HomeComponent, ProjectsComponent } from './views';
import { MandelbrotComponent, TileBlendTest1Component } from './views/projects/';
import { Page } from './page';

const DEFAULT_TITLE = "Nathan's Github Pages";

export default function RouterComponent() {
    return <BrowserRouter basename='/'>
        <PageRoute exact path='/' component={HomeComponent} />
        <PageRoute exact path='/projects/' component={ProjectsComponent} />
        <PageRoute path='/projects/mandelbrot' title='Mandelbrot Visualizer' component={MandelbrotComponent} />
        <PageRoute path='/projects/tile-blend-test-1' title='TileBlend Test 1' component={TileBlendTest1Component} />
    </BrowserRouter>;
}

export function PageRoute(props: {exact?: boolean, path: string, title?: string, component: () => JSX.Element}) {
    return <Route exact={props.exact} path={props.path} render={p => <Page {...p} component={props.component} title={props.title || DEFAULT_TITLE} />} />;
}