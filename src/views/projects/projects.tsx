import * as React from 'react';
import { Link } from 'react-router-dom';
import { AllProjects } from './index';

export function ProjectsComponent() {
    return <div>
        <h1>Let's see some projects!</h1>
        <ul>
            {
                AllProjects.map(project => {
                    return <li key={project.projectName}><Link to={'/projects/' + project.projectName}>{project.projectTitle}</Link></li>;
                })
            }
        </ul>
    </div>;
}