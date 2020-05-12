import * as React from "react";
import { Link } from "react-router-dom";

export function ProjectsComponent() {
    return <div>
        <h1>Let's see some projects!</h1>
        <Link to='./mandelbrot'>Mandelbrot</Link>
    </div>;
}