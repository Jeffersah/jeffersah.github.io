import * as React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { HomeComponent, ProjectsComponent } from './views';
import { AllProjects } from './views/projects/';
import { Page } from './page';

const DEFAULT_TITLE = "Nathan's Github Pages";

export default function RouterComponent() {
    return <BrowserRouter basename='/'>
        <PageRoute exact path='/' component={HomeComponent} />
        <PageRoute exact path='/projects/' component={ProjectsComponent} />
        {
            AllProjects.map(project => {
                return <PageRoute key={project.projectName} path={'/projects/' + project.projectName} title={project.projectTitle} component={project.projectComponent} />;
            })
        }
    </BrowserRouter>;
}

export function PageRoute(props: {exact?: boolean, path: string, title?: string, component: React.ComponentType<{}>}) {
    return <Route exact={props.exact} path={props.path} render={p => <Page {...p} component={props.component} title={props.title || DEFAULT_TITLE} />} />;
}