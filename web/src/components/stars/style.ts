import styled, { keyframes } from "styled-components";

export const StarsStyle = styled.div`
    position: fixed;
    bottom: 4vh;
    left: 2vw;
    width: 6vw;
    height: 6vw;
    background-color: #222;
    border-radius: 3px;
    cursor: pointer;
    /* animation: rotate1s 32s steps(4) infinite; */
    @keyframes rotate1s {
        0%{
            transform: rotate(0)
        }
        25%{
            transform: rotate(90deg)
        }
        50%{
            transform: rotate(180deg)
        }
        75%{
            transform: rotate(270deg)
        }
        100%{
            transform: rotate(360deg)
        }
    }
`;
const dis = Math.sqrt(3) / 6 * 3;
export const InnerStyle = styled.div`
    position: absolute;
    top: ${1/(Math.sqrt(2) + 1)*100}%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    /* animation: moveSmall 4s steps(4) infinite; */
    div{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        margin-left: -1.5vw;
        margin-top: -1px;
        border: 1px solid #008c8c;
        &:first-of-type{
            transform: translateY(${-dis}vw);
            animation: moveSmallOne 2s infinite reverse;
        }
        &:nth-of-type(2){
            transform: rotate(60deg) translateY(${dis}vw);
            animation: moveSmallTwo 2s infinite reverse;
        }
        &:nth-of-type(3){
            transform: rotate(-60deg) translateY(${dis}vw);
            animation: moveSmallThree 2s infinite reverse;
        }
    }
    --moveDis: 1vw;
    @keyframes moveSmallOne{
        0%{
            transform: translateY(${-dis}vw);
        }
        50%{
            transform: translateY(calc(${-dis}vw - var(--moveDis)));
        }
        100%{
            transform: translateY(${-dis}vw);
        }
    }
    @keyframes moveSmallTwo{
        0%{
            transform: rotate(60deg) translateY(${dis}vw);
        }
        50%{
            transform: rotate(60deg) translateY(calc(${dis}vw + var(--moveDis)));
        }
        100%{
            transform: rotate(60deg) translateY(${dis}vw);
        }
    }
    @keyframes moveSmallThree{
        0%{
            transform: rotate(-60deg) translateY(${dis}vw);
        }
        50%{
            transform: rotate(-60deg) translateY(calc(${dis}vw + var(--moveDis)));
        }
        100%{
            transform: rotate(-60deg) translateY(${dis}vw);
        }
    }
`;
const outDis = Math.sqrt(3) / 6 * 4.8;

export const OuterStyle = styled.div`
    position: absolute;
    top: ${1/(Math.sqrt(2) + 1)*100}%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    animation: moveBig 4s steps(4) infinite;
    div{
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        margin-left: -2.4vw;
        margin-top: -1px;
        border: 1px solid #ef0000;
        &:first-of-type{
            transform: translateY(${-outDis}vw);
        }
        &:nth-of-type(2){
            transform: rotate(60deg) translateY(${outDis}vw);
        }
        &:nth-of-type(3){
            transform: rotate(-60deg) translateY(${outDis}vw);
        }
    }
    @keyframes moveBig{
       25%{
            transform: translate(-50%, -50%);
        }
        50%{
            transform: translate(-50%, -50%);
        }
        75%{
            transform: translate(-50%, -50%);
        }
        100%{
            transform: translate(-50%, -50%);
        }
    }
`;