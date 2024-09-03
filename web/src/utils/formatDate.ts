type FormatType = "yyyy-MM-dd" | "yyyy-MM-dd hh:mm" | "hh:mm"

const formatFn:Map<FormatType, (date:Date)=>string> = new Map();

formatFn.set("hh:mm", (date)=>{
    return `${date.getHours()}:${date.getMinutes()}`
});
formatFn.set("yyyy-MM-dd", (date)=>{
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()+1}`;
})
formatFn.set("yyyy-MM-dd hh:mm",(date)=>{
    return formatFn.get("yyyy-MM-dd")!(date) + " " + formatFn.get("hh:mm")!(date);
})

/**
 * 格式化日期
 * @param timestamp 时间戳
 * @param format 格式 yyyy-MM-dd, yyyy-MM-dd hh:mm, hh:mm
 */
export function formateDate(timestamp:number, format:FormatType="yyyy-MM-dd hh:mm"){
    const date = new Date(timestamp);
    if(formatFn.has(format)){
        return formatFn.get(format)!(date);
    }else{
        throw new Error("请检查格式化参数是否存在");
    }
}