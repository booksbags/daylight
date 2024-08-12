import React, { useState } from "react";
import { ReactElement, useImperativeHandle } from "react";
import { renderToBody } from "./renderToBody";

export type WrapperHandle = {
    replace:(ele:ReactElement)=>void;
}

export function renderImperatively(ele:ReactElement){
    const Wrapper = React.forwardRef<WrapperHandle>((_, ref)=>{
        const [renderEle, setRenderEle] = useState(ele);
        useImperativeHandle(ref, ()=>{
            return {
                replace:(ele:ReactElement)=>{
                    setRenderEle(ele);
                }
            }
        })
        return (
            renderEle
        );
    });
    const ref = React.createRef<WrapperHandle>();
    const unmount = renderToBody(<Wrapper ref={ref}/>);
    return {
        clear:()=>{
            unmount();
        },
        replace:(ele:ReactElement)=>{
            ref.current!.replace(ele);
        }
    }
}