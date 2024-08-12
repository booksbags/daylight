import React from 'react'
import { CenterStyle } from './style'
import Left from './components/left'
import Right from './components/right'
import Card from './components/card'

const listData = [
    {
        title: "日志",
        img: "",
        url: "/daily"
    },
    {
        title: "js",
        img:"",
        url: ""
    },{
        title: "css",
        img: "",
        url: ""
    },{
        title: "html",
        img:"",
        url: ""
    },{
        title: "ts",
        img: "",
        url: ""
    },{
        title: "react",
        img: "",
        url: ""
    },{
        title: "浏览器渲染原理",
        img: "",
        url: ""
    },{
        title: "react原理",
        img: "",
        url: ""
    }
]

const Center = () => {
  return (
    <CenterStyle>
      {/* <Left></Left>
      <Right></Right> */}
      {
        listData.map((item)=>{
            return <Card {...item} key={item.url}></Card>
        })
      }
    </CenterStyle>
  )
}

export default Center
