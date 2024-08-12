import React from 'react'
import { HomeStyle } from './style'
import Top from './components/top'
import Center from './components/center'

const Home = () => {
  return (
    <HomeStyle>
      <Top></Top>
      <Center></Center>
    </HomeStyle>
  )
}

export default Home
