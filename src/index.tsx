/**
 * @file Index
 */
import React from "react";
// import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./app";

const root = createRoot(document.getElementById("root") as HTMLElement);
root.render(<App />);