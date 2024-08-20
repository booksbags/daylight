import React, { ReactElement, useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { ListviewStyle } from './style'
import { useRepeatedlyRequest } from '@hooks/useRequest';
import { useUpdate } from '@hooks/useUpdate';

type ListviewType<V, T> = {
  method?: "GET" | "POST" | "DELETE" | "PUT",
  height: string;//该组件的高度
  port: string;//请求的端口
  dom: (data: V) => ReactElement;//接受数据并渲染
  precondition?: (data: T) => V[];// 预处理服务器返回的数据，得到需要渲染的数组
  params?: Record<string, string>;//需要携带的参数
  depend?: any[];//依赖项
}

type RenderRefType = {
  startIndex: number;
  endIndex: number;
  container: HTMLDivElement | null;
  panner: HTMLDivElement | null;
  listview: HTMLDivElement | null;
  totalHeight: number;
  translate:number;//偏移
  itemCount:number;//展示的项数
  hasMore:boolean;//是否还有数据
}

type DataType<V> = {
  ele: HTMLDivElement | null,
  top: number | null,
  bottom: number | null,
  height: number | null,
  data: V,
  index: number
}

function Listview<V, T>({ port, dom, precondition, height, method = "GET", params, depend = [] }: ListviewType<V, T>) {
  const dataRef = useRef<DataType<V>[]>([]);
  const renderDataRef = useRef<DataType<V>[]>([]);
  const renderInfoRef = useRef<RenderRefType>({
    startIndex: 0,
    endIndex: 10,
    container: null,
    panner: null,
    listview: null,
    totalHeight: 0,
    translate:0,
    itemCount:10,
    hasMore:true
  });
  const update = useUpdate();
  const {
    startIndex, endIndex, container, panner, listview, totalHeight
  } = renderInfoRef.current;
  const request = useRepeatedlyRequest<T>({ url: port, method, data: params, pageNumb: 0, pageSize: 10 }, depend);
  const getData = useCallback(() => {
    return request().then((data) => {
      const length = dataRef.current.length;
      if(!data){
        renderInfoRef.current.hasMore = false;
      }
      if (precondition) {
        const empthData = precondition(data);
        dataRef.current.push(...empthData.map((item, index) => {
          return {
            data: item,
            dom: null,
            height: null,
            top: null,
            bottom: null,
            ele: null,
            index: length + index
          };
        }));
      } else if (Array.isArray(data)) {
        dataRef.current.push(...data.map((item, index) => {
          return {
            data: item,
            dom: null,
            height: null,
            top: null,
            bottom: null,
            ele: null,
            index: length + index
          };
        }));
      } else {
        throw new Error("data is not precondition");
      }
    })
  }, depend);
  useEffect(() => {
    getData().then(() => {
      renderDataRef.current = [...dataRef.current];
    });
  }, []);
  const scrollHandle = useCallback((e: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (!listview) return;
    const { top, height } = listview!.getBoundingClientRect();
    const scrollTop = listview?.scrollTop;
    const index = dataRef.current.findIndex((item, index) => {
      const showHeight = top + scrollTop;
      return item.top! <= showHeight && item.bottom! > showHeight;
    });
    function getTranslate(index:number){
      let totalY = 0;
      for(let i = 0; i < index; i ++){
        totalY += (dataRef.current[i].height ?? 0);
      }
      return totalY;
    }
    if (container && renderDataRef.current[0]) {
      renderInfoRef.current.translate = getTranslate(index);
    }
    const endIndex = index + renderInfoRef.current.itemCount;
    if (index != startIndex) {
      renderInfoRef.current = {
        ...renderInfoRef.current,
        startIndex: index,
        endIndex: endIndex
      };
      if (endIndex > dataRef.current.length) {
        getData();
      } else {
        update();
      }
    }
  }, [startIndex, endIndex, container, listview, panner]);
  renderDataRef.current = dataRef.current.slice(startIndex, endIndex);
  return (
    <ListviewStyle
      height={height} onScroll={scrollHandle} ref={(ele) => renderInfoRef.current["listview"] = ele}>
      {/* 占位符，用于展示滚动条 */}
      <div
        className="panner"
        ref={(ele) => renderInfoRef.current["panner"] = ele}
        style={{ height: totalHeight + "px" }}
      ></div>
      <div 
        className="container" 
        ref={(ele) => renderInfoRef.current["container"] = ele}
        style={{
          transform:`translate(0, ${renderInfoRef.current.translate}px)` 
        }}
      >
        {
          renderDataRef.current.map((data, index) => {
            return (
              <div ref={(ele) => {
                if(!ele)return;
                Promise.resolve().then(()=>{
                  data.ele = ele;
                  const { height = null } = ele?.getBoundingClientRect() ?? {};
                  renderInfoRef.current["totalHeight"] = renderInfoRef.current["totalHeight"] - (data.height ?? 0) + (height ?? 0);
                  if (data.index === 0) {
                    const { top = null } = renderInfoRef.current["container"]?.getBoundingClientRect() ?? {};
                    data.top = top;
                    data.bottom = (top ?? 0) + (height ?? 0);
                    data.height = height;
                  } else {
                    data.top = dataRef.current[data.index - 1].bottom;
                    data.bottom = (data.top ?? 0) + (height ?? 0);
                    data.height = height;
                    if (index === renderDataRef.current.length - 1 && renderInfoRef.current["panner"] && height) {
                      renderInfoRef.current["panner"].style.height = `${renderInfoRef.current.totalHeight}px`;
                      if(renderInfoRef.current.hasMore && renderInfoRef.current.totalHeight < renderInfoRef.current.listview!.getBoundingClientRect().height){
                        renderInfoRef.current.endIndex += 10;
                        renderInfoRef.current.itemCount += 10;
                        getData();
                      }
                    }
                  }
                })
              }}
                key={index}
              >
                {dom(data.data)}
              </div>
            )
          })
        }
      </div>
    </ListviewStyle>
  );
}

export default Listview
