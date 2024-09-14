/**
 * 分析请求报文
 */
export function analyzeReqMsg(msg:string){
    const [lineAndHead, body] = msg.split("\r\n\r\n");
    const [line, ...head] = lineAndHead.split("\r\n");
    const [requestMethod, requestPath, protocol] = line.split(" ");
    const headMap:Map<string, string[]> = new Map();
    head.forEach((item)=>{
        const [key, value] = item.split(/\s*:\s*/);
        if(headMap.has(key)){
            headMap.get(key).push(value);
        }else{
            headMap.set(key, [value]);
        }
    });
    return {
        requestMethod,
        requestPath,
        protocol,
        requestHead:headMap,
        requestBody:body
    }
}