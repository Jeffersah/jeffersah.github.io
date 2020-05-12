import * as React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { HomeComponent, ProjectsComponent } from './views';

export default function RouterComponent() {
    return <BrowserRouter basename='/'>
        <Route exact path='/' component={HomeComponent} />
        <Route path='/projects/' component={ProjectsComponent} />
    </BrowserRouter>;
}