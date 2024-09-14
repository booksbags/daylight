import styled from "styled-components";
import liftImg from "@public/pic/life.jpg"
import jsImg from "@public/pic/js.jpg";
import skillImg from "@public/pic/skill.jpg";
import hdImg from "@public/pic/hd.jpg";

const CommonStyle = styled.div`
    &:hover{
        box-shadow: 4px 4px 20px 0px #3f3f3f;
    }
`;

const HomeStyle = styled.div`
    height: 100vh;
    main{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 92vh;
    }
`;

const LeftStyle = styled(CommonStyle)`
    width: 40vw;
    height: 70vh;
    max-width: 400px;
    background-image: url(${liftImg});
    background-position: center;
    color: #efefef;
    font-size: 50px;
    text-shadow: 1px -1px 1px #000;
    text-align: center;
    line-height: 70vh;
    margin-right: 7vh;
    border-radius: 10px;
    cursor: pointer;
`
const CenterStyle = styled.div`
    width: 50vw;
    height: 70vh;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &>div{
        height: 45%;
        width: 100%;
        background-position: center;
        text-align: center;
        font-size: 50px;
        color: #efefef;
        text-shadow: 1px -1px 1px #000;
        border-radius: 10px;
        line-height: 31.5vh;
        cursor: pointer;
    }
`;

const TopStyle = styled(CommonStyle)`
    background-image:url(${skillImg});
`;

const BottomStyle = styled(CommonStyle)`
    background-image:url(${jsImg});
`;

const RightStyle = styled(LeftStyle)`
    margin: 0px;
    margin-left: 7vh;
    background-image:url(${hdImg});
`;
export {
    HomeStyle,
    LeftStyle,
    CenterStyle,
    TopStyle,
    BottomStyle,
    RightStyle
}