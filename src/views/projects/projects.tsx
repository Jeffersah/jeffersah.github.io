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
            projectGroups.map(group =>
                <div key={group.key}>
                    <h2>{group.key}</h2>
                    <ul>
                        {group.items.map(project => <li key={project.projectName}><Link to={'/projects/' + project.projectName}>{project.projectTitle}</Link></li>)}
                    </ul>
                </div>
            )
        }
    </div>;
}