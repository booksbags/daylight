import React, { useCallback, useRef } from 'react'
import { DailyStyle } from './style'
import Upload from '@components/upload'
import { DailySotre } from '@utils/database/dailyStore';
import { getNowBeginTime } from '@utils/getDayBegin';
import Toast from '@utils/toast';

const Daily = () => {
    const textRef = useRef<HTMLTextAreaElement>(null);
    const imgRef = useRef<string[]>([]);
    const dailyStore = useRef<DailySotre>(DailySotre.getInstance());
    const submit = useCallback(()=>{
        const text = textRef.current?.value!;
        dailyStore.current?.update({
            time: getNowBeginTime().toString(),
            img:imgRef.current,
            value: text
        }).then((res)=>{
            if(res.code === 0){
                Toast.show("保存成功");
            }
        }).catch((e)=>{
            Toast.show(e.msg);
        })
    }, []);

  return (
    <DailyStyle>
      <textarea
        rows={10}
        ref={textRef}
      ></textarea>
      <Upload
        multipart
        max={3}
        onChange={(imgs)=>{
            imgRef.current = imgs ?? [];
        }}
      ></Upload>
      <button
        onClick={submit}
      >提交</button>
    </DailyStyle>
  )
}

export default Daily
