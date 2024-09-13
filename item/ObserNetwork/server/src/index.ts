import net from "net"
import { socketLogic } from "./socket";
import { returnMsgType } from "./utils";
import { htmlLogic } from "./web";

const server = net.createServer();

const logicMap:Map<string, (socket:net.Socket, data:string)=>void> = new Map();
logicMap.set("json", socketLogic);
logicMap.set("html", htmlLogic)

server.on("connection", (socket)=>{
    let sign:"json"|"html"|null = null;
    socket.on("data", (d)=>{
        const data = d.toString("utf-8");
        if(sign){
            return logicMap.get(sign)!(socket,data);
        }
        const type = returnMsgType(data);
        if(logicMap.has(type)){
            sign = type;
            logicMap.get(type)!(socket, data);
        }else{
            throw new Error("未处理的消息类型" + type);
        }
    })
});

server.on("close", ()=>{
    console.log("连接断开");
})

server.listen(65530, "192.168.1.3", ()=>{
    console.log("服务器启动", 65530);
})