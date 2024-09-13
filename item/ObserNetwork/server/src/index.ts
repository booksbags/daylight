import net from "net"
import { socketLogic } from "./socket";
import { returnMsgType } from "./utils";

const server = net.createServer();

const logicMap:Map<string, (socket:net.Socket, data:string)=>void> = new Map();
logicMap.set("socket", socketLogic);

server.on("connection", (socket)=>{
    socket.on("data", (d)=>{
        const data = d.toString("utf-8");
        const type = returnMsgType(data);
        if(logicMap.has(type)){
            logicMap.get(type)!(socket, data);
        }else{
            throw new Error("未处理的消息类型" + type);
        }
    })
});

server.on("close", ()=>{
    console.log("连接断开");
})

server.listen(65530, ()=>{
    console.log("服务器启动");
})