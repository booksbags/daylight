import { ReactElement } from "react";
import { createRoot } from "react-dom/client";

export function renderToBody(ele:ReactElement){
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(ele);
    function unmount(){
        root.unmount();
        container.parentElement?.removeChild(container);
    }
    return unmount;
}