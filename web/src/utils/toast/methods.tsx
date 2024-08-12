import { renderImperatively, WrapperHandle } from "@utils/renderImperatively";
import { renderToBody } from "@utils/renderToBody";
import React from "react";
import styled from "styled-components";

let handle:ReturnType<typeof renderImperatively>|null = null;
let timeHandle:number|null = null;

const Container = styled.div`
    padding: 1em 2em;
    position: fixed;
    z-index: 1000;
    text-align: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #008c8c;
    border-radius: 5px;
    font-size: 14px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    box-shadow: 0 0 1px white;
`;

export function show(
    msg:string
){
    const container = <Container>{msg}</Container>;
    if(handle){
        handle.replace(container);
    }else{
        handle = renderImperatively(container)
    }
    if(timeHandle){
        clearTimeout(timeHandle);
    }else{
        setTimeout(()=>{
            clear();
        }, 1500);
    }
}

export function clear(){
    handle?.clear();
    handle = null;
}