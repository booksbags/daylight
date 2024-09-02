import React from 'react'
import { Avatar, TopStyle } from './style'
import { mainColor } from '@src/global/var'

const Top = () => {
  return (
    <TopStyle>
      <div>欢迎来到<span style={{color:mainColor, marginLeft:"3px"}}>daylight</span></div>
      <Avatar>
        <img src="https://webpack.js.org/icon-square-small.9e8aff7a67a5dd20.svg" alt="" />
      </Avatar>
    </TopStyle>
  )
}

export default Top
