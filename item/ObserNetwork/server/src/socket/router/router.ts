import net from "node:net"
export const router:Map<string, (socket:net.Socket, value:any)=>void> = new Map();