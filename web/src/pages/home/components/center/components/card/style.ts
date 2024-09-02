import { mainColor } from "@src/global/var";
import styled from "styled-components";



const CardStyle = styled.div`
    --lineCount:2;
    --columnCount:5;
    width: calc((100% - (var(--columnCount) - 1) * 2em) / var(--columnCount));
    height: calc((100% - (var(--lineCount) - 1) * 10%) / var(--lineCount));
    margin: auto;
    box-shadow: 0 0 5px 1px ${mainColor};
    cursor: pointer;
    padding: 1em;
    min-width: 200px;
    max-width: 200px;
    h5{
        text-align: center;
        font-size: 16px;
    }
    img{
        margin-top: 1em;
        width: 100%;
        height:80%;
        object-fit: cover;
        object-position: top center;
        overflow: hidden;
        border-radius: 5px;
    }
`;

export {CardStyle};