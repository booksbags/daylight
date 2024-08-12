import styled from "styled-components";

const TopStyle = styled.div`
    height: 8vh;
    display: flex;
    align-items: center;
    padding: 0px 2em;
    box-shadow: 0 0 5px 1px #008c8c66;
`;

const Avatar = styled.div`
    margin-left: auto;
    img{
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
    }
`;

export {
    TopStyle,
    Avatar
}