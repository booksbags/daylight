import React from "react"
import {createRoot} from "react-dom/client";
import App from "./app";

const rootEle = document.querySelector("#root")!;

const root = createRoot(rootEle).render(React.createElement(App))