import styled from "styled-components";

const ExperienceStyle = styled.div`
    display: flex;
    justify-content: center;
    padding: 2em;
    &>main{
        width: 400px;
        background-color: #008c8c66;
        padding: 1em;
        border-radius: 15px;
    }
    &>aside{
        width: 300px;
        background-color: #00adb522;
        border-radius: 15px;
        margin-left: 20px;
        padding: 1em;
    }
`;

const ExperienceItemStyle = styled.div`
    padding: 0.5em;
    border-bottom: 1px solid #efefef;
    p{
        font-size: 20px;
    }
    div{
        display: flex;
        justify-content: space-between;
    }
`;

const TypeStyle = styled.div`
    font-size: 18px;
    text-align: center;
    padding: 0.5em;
    background-color: #95e1d3;
    border-radius: 5px;
    margin-bottom: 0.5em;
    color: #a3a3a3;
    cursor: pointer;
    &:hover{
        color: #000;
    }
`;

export {
    ExperienceStyle,
    ExperienceItemStyle,
    TypeStyle
}