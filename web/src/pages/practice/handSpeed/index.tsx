import React, { useEffect, useMemo, useRef, useState } from 'react'
import { ClickInfoStyle, ControlStyle, HandSpeedStyle, IntroduceStyle, SquareStyle } from './style'
import { Control } from './gameClass/control';
import { useUpdate } from '@hooks/useUpdate';
import { config } from './gameClass/config';
import clickAudio from "../../../../public/audio/wordClick.mp3";
import { useNavigate } from 'react-router-dom';


const HandSpeed = () => {
    const navagator = useNavigate();
    const squareSize = config.squareSize;// 方块的尺寸
    const [containerMove, setContainerMove] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const gameRef = useRef(false);
    const controlRef = useRef<Control>();
    const containerRef = useRef<HTMLDivElement>(null);
    const moveSpeed = config.moveSpeed;//px/s
    const [handSpeed, setHandSpeed] = useState(0);
    function init(){
      controlRef.current = new Control(()=>gameRef.current = false, audioRef, (clickInfo)=>{
        setHandSpeed(clickInfo[clickInfo.length - 1]);
      });
      setContainerMove(0);
      gameRef.current = true;
      const cb = controlRef.current.begin();
      function move(){
        setContainerMove((x)=>{
          const result = x - moveSpeed / 66;
          if(result <= 0){
            controlRef.current?.update();
            return squareSize;
          }
          return result;
        });
        if(gameRef.current){
          requestAnimationFrame(move);
        }
      }
      move();
      return cb;
    }
    // useEffect(init, []);
    return (
      <HandSpeedStyle>
      <audio src={clickAudio} ref={audioRef}></audio>
      <div
        style={{
            height: controlRef.current ? (config.rowNumber - 1) * squareSize + "px":undefined,
            overflow: "hidden",
            marginTop: "5vh",
            borderRadius: "5px",
            position: "relative"
          }}
      >
        <div 
          className="container" 
          ref={containerRef}
          style={{
            transform: `translateY(-${containerMove}px)`,
            width: config.colNumber * config.squareSize + "px"
          }}
        >
        {
          controlRef.current?.data.map((item, index)=>{
            return (
              <div className='col' key={index}>
                {
                  item.map((item)=>{
                    return (<SquareStyle
                        key={item.type}
                        style={{
                          width: squareSize + "px",
                          height: squareSize + "px",
                          lineHeight: squareSize + "px"
                        }}
                      >{item.type}</SquareStyle>)
                  })
                }
              </div>
            )
          })
        }{
          !controlRef.current && (
            <IntroduceStyle>
              <p style={{color:"#008c8c"}}>勇敢的少年哟！</p>
              <p>准备好面对一秒{config.createSpeed}字的挑战了吗？</p>
              <p>即使失败也不要气馁，你还年轻，你还有机会哟！</p>
            </IntroduceStyle>
          )
        }
        </div>
        <ClickInfoStyle>
          <span>当前有效手速</span>
          <span><i>{handSpeed}</i>个/秒</span>
        </ClickInfoStyle>
      </div>
      <ControlStyle>
        <button
          onClick={()=>{
            controlRef.current?.gameOver();
            setTimeout(()=>{
              init();
            }, 300);
          }}
        >{controlRef.current ? "重新开始":"开始"}</button>
        <button
          onClick={()=>{
            navagator(-1);
          }}
        >退出</button>
      </ControlStyle>
      </HandSpeedStyle>
    )
}

export default HandSpeed;
