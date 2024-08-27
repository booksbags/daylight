import React, { useEffect, useRef, useState } from 'react'
import { HandSpeedStyle, SquareStyle } from './style'
import { Control } from './gameClass/control';
import { useUpdate } from '@hooks/useUpdate';
import { config } from './gameClass/config';
import clickAudio from "../../../../public/audio/wordClick.mp3";


const HandSpeed = () => {
    const squareSize = config.squareSize;// 方块的尺寸
    const [containerMove, setContainerMove] = useState(0);
    const audioRef = useRef<HTMLAudioElement>(null);
    const gameRef = useRef(true);
    const controlRef = useRef(new Control(()=>gameRef.current = false, audioRef));
    const containerRef = useRef<HTMLDivElement>(null);
    const moveSpeed = config.moveSpeed;//px/s
    useEffect(()=>{
      const cb = controlRef.current.begin();
      function move(){
        setContainerMove((x)=>{
          const result = x - moveSpeed / 66;
          if(result <= 0){
            controlRef.current.update();
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
    }, []);
    return (
      <>
      <audio src={clickAudio} ref={audioRef}></audio>
        <HandSpeedStyle
        style={{
            height: (config.rowNumber - 1) * squareSize + "px",
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
          controlRef.current.data.map((item, index)=>{
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
        }
        </div>
      </HandSpeedStyle>
      </>
    )
}

export default HandSpeed
