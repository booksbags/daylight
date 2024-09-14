import React from 'react'
import { InterfaceItemStyle, InterfaceNameContainerStyle, InterfaceNameItemStyle, NetworkUseStyle } from './style'
import { useRequest } from '@hooks/useRequest'
import { request } from '@utils/request';
import { useNavigate } from 'react-router-dom';

const NetworkUse = () => {
  const navigator = useNavigate();
  const { loading, data, error } = useRequest({
    url: "/networkUse", init: (data) => {
      const keys = Object.keys(data);
      return keys.map((key) => [key, data[key].interface, data[key].status]);
    }
  }, []);
  return loading || error ? <span>{error?.toString()}</span> : (
    <NetworkUseStyle>
      {
        data.map((item: [string, string[], string]) => {
          return (
            <InterfaceItemStyle>
              <span
                onClick={()=>{
                  navigator("/networkUse/detail", {
                    state:{sign:item[0]}
                  })
                }}
              >{item[0]}</span>
              <InterfaceNameContainerStyle>
                {
                  item[1].map((ele => {
                    return <InterfaceNameItemStyle
                      onClick={()=>{
                        request({
                          method:"POST",
                          url: "/beginCatch",
                          data:{
                            interface:ele,
                            target:item[0]
                          }
                        })
                      }}
                    >
                      <span>{ele}</span>
                      {ele === item[2] ? <span style={{color:"red"}}>*</span>:null}
                    </InterfaceNameItemStyle>
                  }))
                }
              </InterfaceNameContainerStyle>
            </InterfaceItemStyle>
          )
        })
      }
    </NetworkUseStyle>
  )
}

export default NetworkUse
