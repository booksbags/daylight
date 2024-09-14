import styled from "styled-components";

export const NetworkUseDetailStyle = styled.div`
    height: 100vh;
    overflow: auto;
    padding: 2em;
    main, header{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
`;

export const NetInfoItemStyle = styled.div`
    padding: 1em;
    background-color: #008c8c;
    border-radius: 5px;
    width: 45%;
    color: #333;
    margin-top: 0.5em;
    overflow: hidden;
`;

export const TotalItemStyle = styled(NetInfoItemStyle)`
    background-color: #993333;
    color: white;
`;