import net from "node:net";
import { analyzeReqMsg } from "./analyzeReqMsg";
import { ExtendNetServer } from "../type/common";

export function createServer():ExtendNetServer{
    const server = net.createServer();
    server.on("connection",(socket)=>{
        socket.on("data", (req)=>{
            const data = analyzeReqMsg(req.toString("utf-8"));
            console.log(data)
        });
    });
    
    return server;
}

