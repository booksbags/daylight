import {createServer} from "node:net";
let a = false;
const server = createServer((socket)=>{
    socket.on("data", (data)=>{
        console.log(data.toString("utf-8"))
        socket.write(JSON.stringify({type:"if", value:"WLAN"}));
        if(!a){
            setTimeout(()=>{
                socket.write(JSON.stringify({type:"end"}));
            }, 2000);
            setTimeout(()=>{
                socket.write(JSON.stringify({type:"begin", value:"WLAN"}));
            }, 4000);
        }
        a = true;
    })
    socket.on("close", ()=>{
        console.log("连接关闭");
    });
});

server.listen(65530, ()=>{
    console.log("65530");
})