import * as React from "react";
import * as ReactDOM from "react-dom";
import RouterComponent from "./routerComponent";

// We look for this in our fallback-load script for testing locally
(window as any).PAGE_LOADED = true;

ReactDOM.render(
    <RouterComponent />,
    document.getElementById("react_content")
);