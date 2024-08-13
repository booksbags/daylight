const oneDayTimestemp = 24 * 60 * 60 * 1000;
/**
 * 获取时间戳所在天的起始时间戳
 */
export function getDayBegin(time:number){
    return time - time % oneDayTimestemp;
}

/**
 * 获取当前天的起始时间戳
 */
export function getNowBeginTime(){
    return getDayBegin(Date.now());
}