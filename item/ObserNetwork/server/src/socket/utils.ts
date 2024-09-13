import net from "node:net"
export function res(type:string, value:any){
    return JSON.stringify({type, value})
}

export function getSignFromSocket(socket:net.Socket){
    return `${socket.remoteAddress??""}:${socket.remotePort??0}`
}