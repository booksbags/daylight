import {createServer} from "node:net";

const server = createServer((socket)=>{
    socket.on("data", (data)=>{
        console.log(data.toString("utf-8"))
    })
    socket.on("connect", ()=>{
        console.log("连接建立");
    });

    socket.on("close", ()=>{
        console.log("连接关闭");
    });
});

server.listen(8089, ()=>{
    console.log("服务器启动，端口：8089");
})