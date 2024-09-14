import { request, RequestType } from "@utils/request";
import { useEffect, useRef, useState } from "react";
import { useUpdate } from "./useUpdate";

interface UseRequestType extends RequestType{
    expireTime?:number,
    init?:(data:any)=>any
}

type StateType = {
    loading:boolean,
    data:any,
    error:null|string,
}

/**
 * 请求外部数据
 */
export function useRequest({
    url, method="GET", data, expireTime=300, init=(data)=>data
}:UseRequestType, depend:any[]){
    const [state, setState] = useState<StateType>({
        loading:true,
        data:null,
        error:null
    });
    useEffect(()=>{
        request<string>({method, url, data}).then((data)=>{
            console.log(data)
            setState({
                loading: false,
                data:init(JSON.parse(data)),
                error:null
            })
        }).catch((e)=>{
            setState({
                loading:false,
                data:null,
                error:e
            });
        });
    }, depend);
    return state;
}

interface UseRepeatedlyRequestType extends UseRequestType {
    pageSize?:number,
    pageNumb?:number
}

export function useRepeatedlyRequest<T>({
    url, method="GET", data, expireTime=300, pageSize=10, pageNumb=0
}:UseRepeatedlyRequestType, depend:any[]){
    const pageInfoRef = useRef({pageNumb, pageSize});
    const update = useUpdate();
    return ()=>{
        const {pageNumb, pageSize} = pageInfoRef.current;
        const response = request<T>({
            method, url, data:{
                ...data,
                pageNumb,
                pageSize
            }
        });
        return response.then((data)=>{
            update();
            pageInfoRef.current = {
                pageNumb:pageNumb + 1,
                pageSize
            };
            return data;
        });
    }
}