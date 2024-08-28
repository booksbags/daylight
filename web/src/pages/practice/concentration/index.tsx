import React, { useEffect, useRef, useState } from 'react'
import { ConcentrationStyle, DescInfoStyle, GameMainStyle, ItemStyle, RowStyle } from './style'
import { Config } from './config';
import Toast from '@utils/toast';
import { useNavigate } from 'react-router-dom';

type StateType = {
    gameState: "0"|"1";// 0未运行 1 运行中
    target: number;//寻找的目标
    remainTime: number;//剩余时间
    data:number[][];//渲染的数据
    clickNum:number[];//每秒有效击键
}

const Concentration = () => {
    const [state, setState] = useState<StateType>();
    const configRef = useRef<Config>();
    const navigator = useNavigate();
    const clickCount = useRef(0);
    function init(){
        configRef.current = new Config(4, 4, 50, 10);
        const {row, col} = configRef.current;
        const renderData:number[][] = [];
        for(let i = 0; i < row; i ++){
            renderData.push([]);
            for(let j = 0; j < col; j ++){
                renderData[i].push(i * row + j);
            }
        }
        renderData.sort(()=>Math.random() - 0.5);
        renderData.forEach((item)=>item.sort(()=>Math.random() - 0.5))
        setState({
            gameState: "0",
            target: 0,
            remainTime: configRef.current?.time??0,
            data: renderData,
            clickNum:[]
        });
    }
    useEffect(()=>{
        init();
    }, []);
    useEffect(()=>{
        if(state?.gameState === "1"){
            return begin();
        }
    },[state?.gameState])

    function begin(){
        const timer = setInterval(()=>{
            setState((state)=>{
                const remainTime = state!.remainTime - 1;
                state!.clickNum.push(clickCount.current);
                clickCount.current = 0;
                if(remainTime === 0){
                    state!.gameState = "0";
                    clearInterval(timer);
                }
                return {
                    ...state!,
                    remainTime: remainTime
                }
            });
        }, 1000);
        return ()=>clearInterval(timer);
    }

    function back(){
        navigator(-1);
    }
    function click(e:React.MouseEvent<HTMLElement, MouseEvent>){
        if(!state || !configRef.current || state.gameState === "0")return;
        const target = e.target as HTMLDivElement;
        if(Number(target.dataset["value"]) === state.target){
            state.target += 1;
            clickCount.current += 1;
        }
        if(state.target === configRef.current.row * configRef.current.col){
            state.gameState = "0";
            Toast.show("游戏结束");
        }
        setState({...state});
    }
  return (
    <ConcentrationStyle>
        <GameMainStyle>
            <header>
                <span>时间 <i>{state?.remainTime}s</i></span>
                <span>目标 <i style={{color: "#008c8c"}}>{state?.target}</i></span>
            </header>
            <main
                onClick={click}
            >
                {
                    state?.data.map((item)=>{
                        return (
                            <RowStyle>
                                {
                                    item.map((ele)=>{
                                        return (
                                            <ItemStyle
                                                style={{
                                                    width: configRef.current?.size,
                                                    height: configRef.current?.size
                                                }}
                                                data-value={ele}
                                            >
                                                {state.gameState === "0" ? "0" :ele}
                                            </ItemStyle>
                                        )
                                    })
                                }
                            </RowStyle>
                        )
                    })
                }
            </main>
            <footer>
                <button
                    onClick={()=>{
                        setState({...state!, 
                            gameState:"1", 
                            remainTime:configRef.current?.time??0, 
                            target:0,
                            clickNum:[]
                        });
                        clickCount.current = 0;
                        Toast.show("游戏开始");
                    }}
                >{state?.gameState === "0" ? "开始":"重新开始"}</button>
                <button
                    onClick={back}
                >退出</button>
            </footer>
        </GameMainStyle>
        <DescInfoStyle>
            <span>速度<i>{clickCount.current}</i>次/秒</span>
        </DescInfoStyle>
    </ConcentrationStyle>
  )
}

export default Concentration
