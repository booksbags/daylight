import React from 'react'
import { ItemStyle, TestStyle } from './style'
import Listview from '@components/listview'

const Test = () => {
  return (
    <TestStyle>
        <header>
            <h5>这是测试页面</h5>
        </header>
      <Listview<string, string>
        height="70vh"
        port='/'
        dom={(data) => {
          return <ItemStyle>{data}</ItemStyle>
        } }
        precondition={(data) => {
          if(!data)return [];
          return data.split("___")
        } }
      ></Listview>
    </TestStyle>
  )
}

export default Test
