import styled from "styled-components";
import { leftWidth } from "../common";
import { mainColor } from "src/global/var";

const LeftStyle = styled.div`
    width: ${leftWidth};
    background-color: ${mainColor};
    height: 100%;
`;

export {
    LeftStyle
}