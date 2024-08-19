import http from "http";
import { virtualData } from "./utils/virtualData";

function cors(res:http.ServerResponse<http.IncomingMessage>){
    res.setHeader("Access-control-allow-origin", "*")
}

const server = http.createServer((req, res)=>{
    cors(res);
    const data = virtualData();
    console.log(data);
    res.end(data);
});

server.listen(8080, ()=>{
    console.log("服务器启动");
})