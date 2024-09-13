import net from "node:net"
// socket通信逻辑,d必然是json格式的字符串
export function socketLogic(socket:net.Socket, d:string){
    const data = JSON.parse(d);
    
}