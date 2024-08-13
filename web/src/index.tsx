import React from "react"
import {createRoot} from "react-dom/client";
import App from "./app";
import "./global/initCss.css";
import { init } from "@utils/getDatabase";

init("daylight", 1.0)?.then(()=>{
    const rootEle = document.querySelector("#root")!;
    createRoot(rootEle).render(React.createElement(App));
});
