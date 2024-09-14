import React, { useState } from 'react'
import {InnerStyle, OuterStyle, StarsStyle } from './style'
import Content from './component/initConent';

function useShowContent():[boolean, (props:boolean)=>void]{
  const [show, setShow] = useState<boolean>(false);
  return [show, setShow];
}

const Stars = () => {
  const [show, setShow] = useShowContent();
  return (
    <StarsStyle
      onClick={()=>{
        setShow(!show);
      }}
    >
      <InnerStyle>
        <div></div>
        <div></div>
        <div></div>
      </InnerStyle>
      <OuterStyle>
        <div></div>
        <div></div>
        <div></div>
      </OuterStyle>
      {show&&<Content/>}
    </StarsStyle>
  )
}

export default Stars
