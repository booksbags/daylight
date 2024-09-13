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
            headMap.get(key)?.push(value);
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

export function responseMsg(data:string, headMap:Map<string, string> = new Map([["content-type","application/json"]]), status:number=200 ){
    let head = "";
    headMap.set("content-length", Buffer.from(data).length.toString());
    headMap.set("Access-Control-Allow-Origin", "http://localhost:8089")
    for (const ele of headMap) {
        head += `${ele[0]}:${ele[1]}\r\n`;
    }
    const template = `HTTP/1.1 ${status} OK\r\n${head}\r\n${data}`;
    return template;
}