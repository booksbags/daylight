import styled from "styled-components";

export const ConcentrationStyle = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #333;
`;

export const GameMainStyle = styled.div`
    flex: 0 0 auto;
    header{
        span{
            display: block;
            text-align:center;
            i{
                color: white;
                font-size: 24px;
                font-style: normal;
            }
        }
    }
    footer{
        button{
            margin: 2em 1em 0px;
        }
    }
`;

export const RowStyle = styled.div`
    display:flex;
    justify-content: center;
`;

export const ItemStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #008c8c;
    border-radius: 5px;
    margin: 5px;
    color: white;
    cursor: pointer;
    &:hover{
        background-color: white;
        color: #008c8c;
    }
`;

export const DescInfoStyle = styled.div`
    margin-left: 50px;
    font-size: 20px;
    margin-top: 60px;
    color: #efefef;
    i{
        color: #008c8c;
        font-size: 24px;
        font-style: normal;
    }
`