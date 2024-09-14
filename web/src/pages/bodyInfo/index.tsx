import React, { useEffect, useRef } from 'react'
import { AbilityItemStyle, AbilityStyle, BodyInfoStyle, LiveItemStyle, LiveStyle } from './style'
import { useNavigate } from 'react-router-dom';

type Coordinate = {
    x:number;
    y:number;
    text?:string;
    textX?:number;
    textY?:number;
}

/**
 * 从六个维度描述自身，都是相对的，每一次都是上一次的1.2倍
 * 体重（健康）
 * 专注度 findMe
 * 记忆力 
 * 手速 打字
 * 金钱
 * 自律
 */

const info = [0.3, 0.6, 0.4, 0.9, 0.1, 0.4];

const BodyInfo = () => {
    const abilities = [
        {
            text:"手速",
            url: "/practice/handSpeed"
        },{
            text: "专注度",
            url: "practice/concentration"
        }
    ];
    const live = [
        {
            text: "流量使用",
            url: "/networkUse"
        }
    ]
    const navigator = useNavigate();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasSize = window.innerHeight * 0.7;
    useEffect(() => {
        const canvas = canvasRef.current;
        if(!canvas)return;
        const context = canvas.getContext("2d")!;
        const originPos:Coordinate = {
            x:canvasSize/2,
            y:canvasSize/2
        };
        const picSize = canvasSize * 0.4;
        const sqrtSize = Math.sqrt(3)/2 * picSize;
        const halfPicSize = 0.5 * picSize;
        const dis = 20;
        // 从左到右，从上到下
        const A:Coordinate = {
            x:originPos.x - halfPicSize,
            y:originPos.y - sqrtSize,
            text: "健康",
            // textX: originPos.x - halfPicSize - dis,
            // textY: originPos.y - sqrtSize - 5
        };
        A.textX = originPos.x - halfPicSize - A.text!.length * dis;
        const B:Coordinate = {
            x: originPos.x + halfPicSize,
            y: originPos.y - sqrtSize,
            text: "专注度",
            // textX:originPos.x + halfPicSize + dis,
            // textY:originPos.y - sqrtSize - dis
        };
        const C:Coordinate = {
            x: originPos.x + picSize,
            y: originPos.y,
            text: "记忆力",
        }
        const D: Coordinate = {
            x: originPos.x + halfPicSize,
            y: originPos.y + sqrtSize,
            text: "手速",
            // textX: originPos.x + halfPicSize + dis,
            // textY: originPos.y + sqrtSize + dis
        }
        D.textY = D.y + dis;
        const E:Coordinate = {
            x: originPos.x - halfPicSize,
            y: originPos.y + sqrtSize,
            text: "金钱",
            // textX: originPos.x - halfPicSize - dis,
            // textY: originPos.y + sqrtSize + dis
        }
        E.textY = E.y + dis;
        E.textX = E.x - E.text!.length * dis;
        const F:Coordinate = {
            x: originPos.x - picSize,
            y: originPos.y,
            text: "自律",
            textX: originPos.x - picSize - 2*dis,
            textY: originPos.y
        };
        F.textX = F.x - F.text!.length * dis;
        const dotList = [A, B, C, D, E, F];
        context?.beginPath();
        context?.moveTo(A.x, A.y);
        dotList.forEach((item)=>{
            context?.lineTo(item.x, item.y);
        });
        context?.closePath();
        context?.stroke();
        dotList.forEach((item)=>{
            context?.beginPath();
            context?.moveTo(originPos.x, originPos.y);
            context?.lineTo(item.x, item.y);
            context.font = "normal 18px Consolas";
            item.text && context?.fillText(item.text, item.textX??item.x, item.textY??item.y);
            context?.stroke();
        });
        context.beginPath();
        info.forEach((item, index)=>{
            const dot = dotList[index];
            const newDot = {
                x:originPos.x + (dot.x - originPos.x) * item,
                y:originPos.y + (dot.y - originPos.y) * item
            };
            console.log(newDot, item, originPos, dot);
            if(index === 0){
                context.moveTo(newDot.x, newDot.y);
            }else{
                context.lineTo(newDot.x, newDot.y);
            }
        })
        context.closePath();
        context.fillStyle = "#008c8c55"
        context.fill();
    }, []);
    return (
        <BodyInfoStyle>
            <LiveStyle>
                {
                    live.map((item)=>{
                        return (
                            <LiveItemStyle
                                onClick={()=>{
                                    navigator(item.url)
                                }}
                            >{item.text}</LiveItemStyle>
                        )
                    })
                }
            </LiveStyle>
            <canvas
                ref={canvasRef}
                width={canvasSize+"px"}
                height={canvasSize+"px"}
            ></canvas>
            <AbilityStyle>
                {
                    abilities.map((item)=>{
                        return (
                            <AbilityItemStyle
                                onClick={()=>navigator(item.url)}
                            >
                                {item.text}
                            </AbilityItemStyle>
                        )
                    })
                }
            </AbilityStyle>
        </BodyInfoStyle>
    )
}

export default BodyInfo
