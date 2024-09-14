import styled from "styled-components";

export const NetworkUseStyle = styled.div`
    padding: 2em;
`;

export const InterfaceItemStyle = styled.div`
    background-color: #008c8c;
    padding: 1em 1em;
    border-radius: 10px;
    width: 30vw;
    &>span{
        font-size: 20px;
        font-weight: bold;
    }
`;

export const InterfaceNameItemStyle = styled.div`
    margin-top: .5em;
    cursor: pointer;
    background-color: #FFEB00;
    color: #333;
    padding: 0.5em 1em 0.5em;
    border-radius: 1em;
    &:hover{
        color: #008c8c;
    }
`;

export const InterfaceNameContainerStyle = styled.div`
    margin-top: 1em;
`;