import styled from "styled-components";

export const HomeStyle = styled.div`
    width: 100vw;
    height: 100vh;
    &>header{
        background-color: #1677ff;
        padding: 1em 0em;
        color: white;
        text-align: center;
    }
    &>main{
        display: flex;
        overflow: hidden;
    }
`;

export const ItemStyle = styled.div`
    width: 100%;
    flex: 0 0 auto;
    &>header{
        padding: 0.2em 0.2em 0.6em;
        font-size: 16px;
    }
    &>main{
        display: flex;
        flex-wrap: wrap;
    }
`;

export const SelectItem = styled.div<{selected?:boolean}>`
    width: 100%;
    padding: 0.5em 1em;
    border-bottom: 1px solid #999;
    background-color: ${({selected})=>{
        return selected ? "#008c8c": "white"
    }};
    color: ${({selected})=>{
        return selected ? "white": "black"
    }};
`;