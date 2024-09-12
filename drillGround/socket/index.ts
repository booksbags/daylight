import {createServer} from "node:net";

const server = createServer((socket)=>{
    socket.on("data", (data)=>{
        console.log(data.toString("utf-8"))
        socket.write(JSON.stringify({type:"if", value:"WLAN"}));
    })
    socket.on("connect", ()=>{
        console.log("连接建立");
    });

    socket.on("close", ()=>{
        console.log("连接关闭");
    });
});

server.listen(65530, ()=>{
    console.log("65530");
})