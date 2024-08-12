import { center } from "@style/center";
import { mainColor } from "src/global/var";
import styled from "styled-components";
const LoginStyle = styled.div`
    height: 100vh;
    background: linear-gradient(135deg, #008c8c, #008c8c55);
`;

const ContainStyle = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    width: 45vw;
    height: 30vh;
    max-width: 500px;
    min-width: 300px;
    transform: translate(-50%, -50%);
    background-color: #ee4400;
    border-radius: 5px;
    form{
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        ${center()}
    }
    label{
        display: block;
        width: 100%;
        text-align: center;
        white-space: nowrap;
        &:first-of-type{
            margin-bottom: 0.5em;
        }
        span{
            color: white;
        }
    }
    button{
        margin-top: 1em;
        margin-left: 3em;
        &:hover{
            color: ${mainColor};
            background-color: white;
        }
    }
`;

export {
    LoginStyle,
    ContainStyle
}