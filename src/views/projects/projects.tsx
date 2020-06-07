import * as React from "react";
import { Link } from "react-router-dom";

export function ProjectsComponent() {
    return <div>
        <h1>Let's see some projects!</h1>
        <ul>
            <li><Link to='./mandelbrot'>Mandelbrot</Link></li>
            <li><Link to='./tile-blend-test-1'>Tile Blend Test 1</Link></li>
        </ul>
    </div>;
}