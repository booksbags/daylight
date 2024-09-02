import React from 'react'
import { BottomStyle, HomeStyle, LeftStyle, RightStyle, TopStyle } from './style'
import Top from './components/top'
import Center from './components/center'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigator = useNavigate();
  return (
    <HomeStyle>
      <Top></Top>
      <main>
        <LeftStyle
          onClick={()=>navigator("/bodyInfo")}
        >
          生活
        </LeftStyle>
        <RightStyle>
          <TopStyle
            onClick={()=>navigator("/home/skill")}
          >
            技能
          </TopStyle>
          <BottomStyle>
            精神
          </BottomStyle>
        </RightStyle>
      </main>
    </HomeStyle>
  )
}

export default Home
