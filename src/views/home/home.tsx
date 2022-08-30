import * as React from 'react';
import { Link } from 'react-router-dom';
import { RenderFromUrlComponent, CodeFromUrlComponent } from '../../components';

export function HomeComponent() {
    return <div>
        <h1>Hi!</h1>
        <ul style={{ listStyleType: 'none' }}>
            <li><Link to='/projects/'>Projects</Link></li>
            <li><a href='/notebook/index.html'>Notebook (?)</a></li>
        </ul>
        {/* <h2>Test below:</h2>
        <CodeFromUrlComponent url='/dist/content/testContent.txt' /> */}
    </div>;
}