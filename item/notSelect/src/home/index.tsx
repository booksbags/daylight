import { ReactNode, useState } from 'react';
import { HomeStyle, ItemStyle, SelectItem } from './style'

type ConfigType = {
    title:string;
} & ({
    type: "select",
    selection:{label:string, value:string}[],
    value?:string|undefined,
    realValue:string,
} | {
    type: "input",
})
const config:ConfigType[] = [];

config.push({
    title: "上班让你快乐吗？",
    type: "select",
    value: "0",
    realValue:"0",
    selection:[
        {
            label: "快乐",
            value: "0"
        },{
            label: "兴奋",
            value: "1"
        }
    ]
});

config.push({
    title: "您喜欢上班吗？",
    realValue: "0",
    type: "select",
    selection:[
        {
            label: "喜欢",
            value: "0"
        },{
            label: "热爱",
            value: "1"
        },{
            label: "有瘾",
            value: "2"
        }
    ]
});

config.push({
    title: "您喜欢上班吗？",
    type: "input"
});

const Home = () => {
    const [cfg, setCfg] = useState(config);
  return (
    <HomeStyle>
      <header>国庆加班意愿统计</header>
      <main
        onTouchMove={(e)=>{
            console.log(e)
        }}
      >
        {
            cfg.map((item, index)=>{
                let main:ReactNode;
                if(item.type === "input"){
                    main = <input type="text" />
                }else{
                    main = item.selection.map((ele)=>{
                        return (
                            <SelectItem 
                                selected={ele.value === item.value}
                                onClick={()=>{
                                    item.value = ele.value;
                                    setCfg([...cfg])
                                }}
                            >{ele.label}</SelectItem>
                        )
                    })
                }
                return (
                    <ItemStyle>
                        <header>{index} {item.title}</header>
                        <main>
                            {main}
                        </main>
                    </ItemStyle>
                )
            })
        }
      </main>
    </HomeStyle>
  )
}

export default Home
