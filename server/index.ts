import http from "http";
import { virtualData } from "./utils/virtualData";

function cors(res:http.ServerResponse<http.IncomingMessage>){
    res.setHeader("Access-control-allow-origin", "*")
}

let i = 0;

const server = http.createServer((req, res)=>{
    const socket = req.socket;
    socket.on("close", ()=>{
        console.log("socket 连接断开");
    });
    cors(res);
    const data = virtualData();
    
    if(i == 0){
        res.end(data);
    }else{
        res.end();
    }
    i += 1;
});

server.on("connection", (socket)=>{
    console.log("tcp 连接建立");
});

server.close(()=>{
    console.log("连接断开");
})

server.listen(8080, ()=>{
    console.log("服务器启动， 端口8080");
})