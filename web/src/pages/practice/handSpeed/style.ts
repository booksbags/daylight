import styled from "styled-components";

export const HandSpeedStyle = styled.div`
    overflow:hidden;
    width: 100vw;
    height: 100vh;
    background-color: #333;
    .col{
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
    }
    .container{
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: center;
    }
`;

export const SquareStyle = styled.div`
    background-color: #008c8c;
    text-align: center;
    font-size: 18px;
    border-radius: 5px;
    padding: 3px;
    background-clip: content-box;
`;

export const ControlStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    button{
        margin: 3em 2em;
    }
`;

export const ClickInfoStyle = styled.div`
    position: absolute;
    top: 0px;
    right: 3vw;
    color: white;
    font-size: 18px;
    i{
        margin: 0 3px;
        font-size: 20px;
        color: #008c8c;
    }
`;

export const IntroduceStyle = styled.div`
    background-color: #efefef;
    height: 20vh;
    padding: 2em;
    border-radius: 5px;
`;
