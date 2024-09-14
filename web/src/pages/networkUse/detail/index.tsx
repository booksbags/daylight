import React, { useRef } from 'react'
import { NetInfoItemStyle, NetworkUseDetailStyle, TotalItemStyle } from './style'
import { useLocation } from 'react-router-dom'
import { useRequest } from '@hooks/useRequest';
import { analyzeIpMsg } from '@utils/network/analyzeMsg';
import { insertSort } from '@utils/sort/insertSort';

const NetworkUseDetail = () => {
    const {state:{sign}} = useLocation();
    const totalRef = useRef<Map<string, number>>(new Map());
    const {loading, data, error} = useRequest({
        url: "/networkDetail",
        data:{sign},
        init(data) {
            return data.map((ele:any)=>{
                const info = analyzeIpMsg(ele.content);
                if(totalRef.current.has(info.targetIp)){
                    const v = totalRef.current.get(info.targetIp)!;
                    totalRef.current.set(info.targetIp, v+1);
                }else{
                    totalRef.current.set(info.targetIp, 1);
                }
                return info;
            });
        },
    }, []);
    function totalShow(){
        let result:[string, number][] = [];
        for (const element of totalRef.current) {
            insertSort(result, element, (pre, now)=>{
                return pre[1] < now[1];
            })
        }
        return result.map((el)=>{
            return <TotalItemStyle>{el[0]}{"<==>"}{el[1]}</TotalItemStyle>
        })
    }
  return loading || error ? <span>{error?.toString()}</span>:(
    <NetworkUseDetailStyle>
        <header>
            {
                totalShow()
            }
        </header>
      <main>
      {
        (data as any[]).map((item)=>{
            const {targetIp, originIp, protocal} = item;
            return (
                <NetInfoItemStyle>
                    {`${protocal}<==>${targetIp}=>${originIp}`}
                </NetInfoItemStyle>
            )
        })
      }
      </main>
    </NetworkUseDetailStyle>
  )
}

export default NetworkUseDetail
