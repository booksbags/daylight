import React from 'react'
import { ExperienceItemStyle, ExperienceStyle, TypeStyle } from './style'
import { formateDate } from '@utils/formatDate';

type ExperienceType = {
  content:string,// 内容
  reason:string,// 总结的原因/场景
  date:string,//添加时的时间戳
  type:string,//那一类型 IT类，生活类，通用类，谋虑类
}

const Experience = () => {
  const data:ExperienceType[] = [
    {
      content: "aaaaaaaaaaaaaaaaa",
      reason: "bbbbbbbbbbbbb",
      date: Date.now().toString(),
      type: "IT"
    },
    {
      content: "aaaaaaaaaaaaaaaaa",
      reason: "bbbbbbbbbbbbb",
      date: Date.now().toString(),
      type: "IT"
    }, {
      content: "aaaaaaaaaaaaaaaaa",
      reason: "bbbbbbbbbbbbb",
      date: Date.now().toString(),
      type: "IT"
    }, {
      content: "aaaaaaaaaaaaaaaaa",
      reason: "bbbbbbbbbbbbb",
      date: Date.now().toString(),
      type: "IT"
    }, {
      content: "aaaaaaaaaaaaaaaaa",
      reason: "bbbbbbbbbbbbb",
      date: Date.now().toString(),
      type: "IT"
    },
  ];
  const type = [
    {
      type:0,
      label: "IT"
    },{
      type:1,
      label: "生活"
    },{
      type: 2,
      label: "通用"
    },{
      type: 3,
      label: "谋虑"
    }
  ]
  return (
    <ExperienceStyle>
      <main>
      {
        data.map((item)=>{
          return (
            <ExperienceItemStyle>
              <p>{item.content}</p>
              <div>
                <span
                  style={{color: "#008c8c"}}
                >{item.type}</span>
                <span>{formateDate(Number(item.date))}</span>
              </div>
            </ExperienceItemStyle>
          )
        })
      }
      </main>
      <aside>
        {
          type.map((item)=>{
            return (
              <TypeStyle>
                {item.label}
              </TypeStyle>
            )
          })
        }
      </aside>
    </ExperienceStyle>
  )
}

export default Experience
