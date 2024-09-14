import styled from "styled-components";

export const BodyInfoStyle = styled.div`
    canvas{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border: 1px solid black;
        background-color: #6fe7dd;
    }
`;

export const AbilityStyle = styled.div`
    position: absolute;
    width: 20vw;
    height: 70vh;
    background-color: #6fe7dd;
    top: 15%;
    right: 10%;
    border-radius: 10px;
`;

export const AbilityItemStyle = styled.div`
    width: 80%;
    border-radius: 5px;
    padding:1em 0;
    font-size: 20px;
    text-align: center;
    margin: 1em auto;
    background-color: #3490de;
    cursor: pointer;
`;

export const LiveStyle = styled(AbilityStyle)`
    right: none;
    left: 10%;
`;

export const LiveItemStyle = styled(AbilityItemStyle)`
    
`;