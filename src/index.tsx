/**
 * @file Initiates the ui react layer
 */
import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";

// const uiElement = document.createElement("div");
// uiElement.style.zIndex = "100";
// uiElement.style.position = "absolute";

// document.getElementById("root")?.appendChild(uiElement);

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<>
    Hello World
</>)