import styled from "styled-components";
import { leftWidth } from "../common";

const RightStyle = styled.div`
    width: calc(100vw - ${leftWidth});
`;

export {
    RightStyle
}