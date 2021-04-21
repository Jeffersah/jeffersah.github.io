import * as React from 'react';
import { Link } from 'react-router-dom';
import { AllProjects } from './index';
import { groupBy } from '../../LinqLike';

export function ProjectsComponent() {
    const projectGroups = groupBy(AllProjects.filter(p => p.subCategory !== undefined), p => p.subCategory);

    return <div>
        <h1>Let's see some projects!</h1>
        <ul>
            {
                AllProjects.filter(p => p.subCategory === undefined).map(project => {
                    return <li key={project.projectName}><Link to={'/projects/' + project.projectName}>{project.projectTitle}</Link></li>;
                })
            }
        </ul>
        {
            Array.from(projectGroups.entries()).map(([key, value]) =>
                <div key={key}>
                    <h2>{key}</h2>
                    <ul>
                        {value.map(project => <li key={project.projectName}><Link to={'/projects/' + project.projectName}>{project.projectTitle}</Link></li>)}
                    </ul>
                </div>
            )
        }
    </div>;
}