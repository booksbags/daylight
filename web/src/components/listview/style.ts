import styled from "styled-components";

export const ListviewStyle = styled.div<{height:string}>`
    height: ${({height})=>height};
    overflow: auto;
    position: relative;
    .panner, .container{
        position: absolute;
        top: 0;
        left: 0;
    }
    .panner{
        position: relative;
        overflow: auto;
    }
`;