import React from 'react'
import { DailyStyle } from './style'
import Upload from '@components/upload'

const Daily = () => {
  return (
    <DailyStyle>
      <textarea
        rows={10}
      ></textarea>
      <Upload
        multipart
        max={3}
        onChange={(imgs)=>{
            console.log("imsg is ", imgs);
        }}
      ></Upload>
      <button>提交</button>
    </DailyStyle>
  )
}

export default Daily
