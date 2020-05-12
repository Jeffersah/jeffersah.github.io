import * as React from "react";
import { HashRouter, Route, Link } from "react-router-dom";
import { HomeComponent, ProjectsComponent } from './views';

export default function RouterComponent() {
    return <HashRouter basename='/'>
        <Route exact path='/' component={HomeComponent} />
        <Route path='/projects/' component={ProjectsComponent} />
    </HashRouter>;
}