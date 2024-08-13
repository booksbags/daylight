import { center } from "@style/center";
import styled from "styled-components";

const UploadStyle = styled.div`
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    label{
        flex: 0 0 auto;
        width: 300px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
    }
    input{
        display: none;
    }
    div{
        position: relative;
        border: 1px solid #008c8c;
        width: 100%;
        height: 100%;
        border-radius: 15px;
        background-size: 100%;
        background-repeat: no-repeat;
        &::after, &::before{
            content: "";
            ${center};
            width: 50px;
            border: 1px dashed #008c8c;
            z-index: -1;
        }
        &::after{
            transform: translate(-50%, -50%) rotate(90deg);
        }
    }
`;

export {UploadStyle}