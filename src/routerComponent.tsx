import * as React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import { HomeComponent, ProjectsComponent } from './views';
import { MandelbrotComponent } from "./views/projects/";

export default function RouterComponent() {
    return <BrowserRouter basename='/'>
        <Route exact path='/' component={HomeComponent} />
        <Route exact path='/projects/' component={ProjectsComponent} />
        <Route path='/projects/mandelbrot' component={MandelbrotComponent} />
    </BrowserRouter>;
}