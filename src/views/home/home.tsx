import * as React from "react";
import { Link } from "react-router-dom";

export function HomeComponent() {
    return <div>
        <h1>Hi!</h1>
        <Link to='/projects/'>Projects</Link>
    </div>;
}