type IpMsgType = {
    targetIp:string,
    originIp:string
}
const protocalMap:Map<number, string> = new Map();
protocalMap.set(1, "ICMP");
protocalMap.set(2, "ICMP");
protocalMap.set(6, "TCP");
protocalMap.set(17, "UDP");
protocalMap.set(4, "IP");
/**
 * 将16进制的ip转化为点分十进制
 */
function switchIp(ip:string){
    let i = 0;
    let byte:string = "";
    let result:number[] = [];
    for (const s of ip) {
        byte += s;
        i += 1;
        if(i == 2){
            result.push(parseInt(byte, 16));
            i = 0;
            byte = ""
        }
    }
    return result.join(".");
}
/**
 * 解析IP数据包，目前只需要得到源IP和目标ip即可
 */
export function analyzeIpMsg(msg:string){
    const originIp = msg.slice(24, 32);
    const targetIp = msg.slice(32, 40);
    const protocal = msg.slice(18, 20)
    return {
        targetIp: switchIp(targetIp),
        originIp: switchIp(originIp),
        protocal:  protocalMap.get(parseInt(protocal, 16))??"other"
    }
}